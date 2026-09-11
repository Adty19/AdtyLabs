const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const ROOT = path.join(__dirname, "..");
const INDEX_HTML = path.join(ROOT, "index.html");

// Containers that main.js fills via innerHTML at runtime.
const TARGET_IDS = [
  "marqueeTrackDev",
  "marqueeTrackSec",
  "educationTimeline",
  "experienceTimeline",
  "projectsGrid",
  "certGridCertificate",
  "certGridAwards",
  "articleGrid",
  "publicationGrid",
];

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceContainerContent(html, id, newInner) {
  const openTagRe = new RegExp(`<div\\b[^>]*\\bid="${id}"[^>]*>`);
  const openMatch = openTagRe.exec(html);
  if (!openMatch) return { html, replaced: false };

  const contentStart = openMatch.index + openMatch[0].length;
  const tagRe = /<div\b[^>]*>|<\/div>/g;
  tagRe.lastIndex = contentStart;
  let depth = 1;
  let match;
  while ((match = tagRe.exec(html))) {
    if (match[0] === "</div>") {
      depth--;
      if (depth === 0) {
        const before = html.slice(0, contentStart);
        const after = html.slice(match.index);
        return {
          html: before + "\n" + newInner + "\n" + after,
          replaced: true,
        };
      }
    } else {
      depth++;
    }
  }
  return { html, replaced: false };
}

// ---------------------------------------------------------------------
// JSON-LD generation: turn CERTIFICATIONS / ARTICLES / PUBLICATIONS / PROJECTS
// ---------------------------------------------------------------------
const JSONLD_MARKER_START =
  "<!-- Auto Generated content JSON-LD prerender.js -->";
const JSONLD_MARKER_END = "<!-- END generated content JSON-LD -->";
const PERSON_ID = "https://adtylabs.vercel.app/#person";
const SITE_URL = "https://adtylabs.vercel.app";

function buildContentJsonLd({
  CERTIFICATIONS,
  ARTICLES,
  PUBLICATIONS,
  PROJECTS,
}) {
  const graph = [];

  const credentials = (CERTIFICATIONS || [])
    .filter((c) => c.type === "certificate")
    .map((c) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: c.name,
      recognizedBy: { "@type": "Organization", name: c.issuer },
      dateCreated: c.date,
      image: c.image,
    }));

  const awards = (CERTIFICATIONS || [])
    .filter((c) => c.type !== "certificate")
    .map((c) => `${c.name} — ${c.issuer} (${c.date})`);

  if (credentials.length || awards.length) {
    graph.push({
      "@type": "Person",
      "@id": PERSON_ID,
      ...(credentials.length ? { hasCredential: credentials } : {}),
      ...(awards.length ? { award: awards } : {}),
    });
  }

  (ARTICLES || []).forEach((a) => {
    graph.push({
      "@type": "Article",
      headline: a.name,
      url: a.url,
      datePublished: a.date,
      author: { "@id": PERSON_ID },
      publisher: { "@type": "Organization", name: a.issuer },
    });
  });
  (PUBLICATIONS || []).forEach((p) => {
    graph.push({
      "@type": "ScholarlyArticle",
      headline: p.name,
      url: p.url,
      datePublished: p.date,
      author: { "@id": PERSON_ID },
      publisher: { "@type": "Organization", name: p.issuer },
    });
  });

  (PROJECTS || []).forEach((p) => {
    graph.push({
      "@type": "CreativeWork",
      name: p.title,
      description: p.desc,
      url: `${SITE_URL}/project-detail.html?slug=${p.slug}`,
      dateCreated: p.year,
      keywords: Array.isArray(p.stack) ? p.stack.join(", ") : undefined,
      creator: { "@id": PERSON_ID },
      image:
        p.image && p.image.startsWith("http")
          ? p.image
          : `${SITE_URL}/${p.image}`,
    });
  });

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };
  return (
    `${JSONLD_MARKER_START}\n` +
    `    <script type="application/ld+json">\n` +
    JSON.stringify(jsonLd, null, 2) +
    `\n    </script>\n    ${JSONLD_MARKER_END}`
  );
}

function upsertContentJsonLd(html, snippet) {
  const blockRe = new RegExp(
    `${escapeRegExp(JSONLD_MARKER_START)}[\\s\\S]*?${escapeRegExp(JSONLD_MARKER_END)}`,
  );
  if (blockRe.test(html)) {
    return html.replace(blockRe, snippet);
  }
  const anchor = /(<script type="application\/ld\+json">[\s\S]*?<\/script>)/;
  if (anchor.test(html)) {
    return html.replace(anchor, `$1\n\n    ${snippet}`);
  }
  console.warn(
    "[prerender] could not find an anchor to insert JSON-LD, skipping",
  );
  return html;
}

async function main() {
  const originalHtml = fs.readFileSync(INDEX_HTML, "utf8");
  const strippedForRender = originalHtml.replace(
    /<script[^>]*\ssrc=["']https?:\/\/[^"']+["'][^>]*><\/script>/g,
    "",
  );

  const dataJs = fs.readFileSync(path.join(ROOT, "assets/js/data.js"), "utf8");
  const mainJs = fs.readFileSync(path.join(ROOT, "assets/js/main.js"), "utf8");

  const htmlWithInlineScripts = strippedForRender.replace(
    /<script src="assets\/js\/data\.js"><\/script>\s*<script src="assets\/js\/main\.min\.js"><\/script>/,
    `<script>${dataJs}</script><script>${mainJs}</script>`,
  );

  const virtualConsole = new VirtualConsole();
  if (typeof virtualConsole.sendTo === "function") {
    virtualConsole.sendTo(console); // jsdom <= 26
  } else if (typeof virtualConsole.forwardTo === "function") {
    virtualConsole.forwardTo(console); // jsdom >= 27
  }

  const dom = new JSDOM(htmlWithInlineScripts, {
    runScripts: "dangerously",
    url: "https://adtylabs.vercel.app/",
    pretendToBeVisual: true,
    virtualConsole,
  });

  await new Promise((resolve) => {
    dom.window.document.addEventListener("DOMContentLoaded", () =>
      setTimeout(resolve, 0),
    );
    setTimeout(resolve, 2000); // safety net
  });

  const doc = dom.window.document;

  const jsonLdData = {};
  for (const key of [
    "CERTIFICATIONS",
    "ARTICLES",
    "PUBLICATIONS",
    "PROJECTS",
  ]) {
    const raw = dom.window.eval(
      `typeof ${key} !== 'undefined' ? JSON.stringify(${key}) : null`,
    );
    jsonLdData[key] = raw ? JSON.parse(raw) : [];
  }

  let html = originalHtml;
  for (const id of TARGET_IDS) {
    const el = doc.getElementById(id);
    if (!el) {
      console.warn(`[prerender] container #${id} not found, skipping`);
      continue;
    }
    const inner = el.innerHTML.trim();
    if (!inner) {
      console.warn(`[prerender] container #${id} rendered empty, skipping`);
      continue;
    }
    const result = replaceContainerContent(html, id, inner);
    if (!result.replaced) {
      console.warn(`[prerender] could not locate/splice #${id} in index.html`);
      continue;
    }
    html = result.html;
    console.log(`[prerender] filled #${id} (${inner.length} chars)`);
  }

  const jsonLdSnippet = buildContentJsonLd(jsonLdData);
  html = upsertContentJsonLd(html, jsonLdSnippet);
  console.log("[prerender] JSON-LD content graph updated.");

  fs.writeFileSync(INDEX_HTML, html);
  console.log("[prerender] index.html updated.");
}

main();
