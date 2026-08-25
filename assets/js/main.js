const AutoScroll = {
  active: false,
  timeout: null,
  stop() {
    this.active = false;
    clearTimeout(this.timeout);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  /* --- Render dynamic content first --- */
  renderTechMarquee();
  renderEducation();
  renderExperience();
  renderProjects();
  renderCertifications();

  initLazyImages();

  // Lucide icons
  if (window.lucide) lucide.createIcons();

  fixBrandIcons();

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Loader --- */
  runLoader();

  /* --- Lenis smooth scroll --- */
  const lenis = initLenis();

  /* --- GSAP setup --- */
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* --- Interactions --- */
  initNavbar(lenis);
  initMobileMenu(lenis);
  initScrollReveal();
  initHeroParallax();
  initTypedStack();
  initMarqueeHoverPause();
  initCounters();
  initCertModal();
  initContactForm();
  initBackToTop(lenis);
  initMagnetic();
  initParticles();
  initExploreAutoScroll(lenis);
  initMotionInteractions();
  initServiceWorker();
});

function fixBrandIcons() {
  const PATHS = {
    github:
      "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z",
    linkedin:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    instagram:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 9.999a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  };

  document
    .querySelectorAll(
      '[data-lucide="github"], [data-lucide="linkedin"], [data-lucide="instagram"]',
    )
    .forEach((el) => {
      const name = el.getAttribute("data-lucide");
      const path = PATHS[name];
      if (!path) return;
      const cls = el.getAttribute("class") || "";
      const svgNs = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNs, "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "currentColor");
      svg.setAttribute("aria-hidden", "true");
      if (cls) svg.setAttribute("class", cls);
      const pathEl = document.createElementNS(svgNs, "path");
      pathEl.setAttribute("d", path);
      svg.appendChild(pathEl);
      el.replaceWith(svg);
    });
}

/* Loader */
function runLoader() {
  const loader = document.getElementById("loader");
  const fill = document.querySelector(".loader-bar-fill");
  document.body.style.overflow = "hidden";
  const tl = gsap.timeline();

  tl.to(fill, { width: "100%", duration: 1.4, ease: "power2.inOut" })
    .to(
      ".loader-inner",
      { opacity: 0, scale: 0.92, duration: 0.5, ease: "power2.in" },
      "+=0.15",
    )
    .to(
      loader,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          loader.style.display = "none";
          document.body.style.overflow = "";
          revealHero();
        },
      },
      "-=0.1",
    );
}

function revealHero() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(".navbar", { opacity: 1, y: 0, duration: 0.8 }, 0)
    .fromTo(
      ".hero-eyebrow",
      { opacity: 0, y: 20, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
      0.1,
    )
    .fromTo(
      ".hero-title",
      { opacity: 0, y: 34, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
      0.2,
    )
    .fromTo(
      ".hero-role",
      { opacity: 0, y: 24, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
      0.35,
    )
    .fromTo(
      ".hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.45,
    )
    .fromTo(
      ".hero-actions",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.55,
    )
    .fromTo(
      ".hero-socials",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.65,
    )
    .fromTo(
      ".float-card",
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15 },
      0.3,
    );
}

/* Lenis smooth scroll */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });
  return lenis;
}

/* Navbar: floating glass → "Dynamic Island" on scroll + active section indicator */
function initNavbar(lenis) {
  const navbar = document.getElementById("navbar");
  gsap.set(navbar, { opacity: 0, y: -16 });

  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    onUpdate: (self) => {
      navbar.classList.toggle("scrolled", self.scroll() > 80);
    },
  });

  const navLinks = document.querySelectorAll(".nav-link, .mobile-link");
  const sections = [...navLinks]
    .map((l) => document.getElementById(l.dataset.section))
    .filter(Boolean);

  const uniqueSections = [...new Set(sections)];
  uniqueSections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) setActiveNav(section.id);
      },
    });
  });

  function setActiveNav(id) {
    document.querySelectorAll(".nav-link").forEach((l) => {
      l.classList.toggle("active", l.dataset.section === id);
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      if (a.id === "exploreBtn") return;
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        AutoScroll.stop();
        lenis.scrollTo(target, { offset: -20, duration: 1.2 });
      }
    });
  });
}

/* Mobile menu */
function initMobileMenu(lenis) {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;
  const links = menu.querySelectorAll(".mobile-link");

  function animateOpen() {
    if (!window.Motion) return;
    const { animate, stagger } = window.Motion;
    animate(
      links,
      { opacity: [0, 1], x: [-16, 0] },
      { delay: stagger(0.05), type: "spring", stiffness: 320, damping: 24 },
    );
  }

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.innerHTML = isOpen
      ? '<i data-lucide="x" class="w-5 h-5"></i>'
      : '<i data-lucide="menu" class="w-5 h-5"></i>';
    lucide.createIcons();
    if (isOpen) animateOpen();
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
      lucide.createIcons();
    });
  });
}

function initScrollReveal() {
  const M = window.Motion;
  const motionReady =
    M && typeof M.inView === "function" && typeof M.animate === "function";

  if (!motionReady) {
    return;
  }

  const { animate, inView, stagger } = M;
  const EASE_IN = { type: "spring", stiffness: 140, damping: 20, mass: 0.7 };
  const EASE_POP = { type: "spring", stiffness: 260, damping: 18 };

  function revealOnView(el, hiddenStyle, onEnter, options) {
    if (!el) return;
    Object.assign(el.style, hiddenStyle);
    try {
      inView(el, onEnter, options);
    } catch (err) {
      Object.assign(el.style, { opacity: "", transform: "" });
      console.warn("Scroll reveal skipped for an element:", err);
    }
  }

  try {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      revealOnView(
        el,
        { opacity: "0", transform: "translateY(28px)" },
        () => animate(el, { opacity: [0, 1], y: [28, 0] }, EASE_IN),
        { amount: 0.2 },
      );
    });
  } catch (err) {
    console.warn("Scroll reveal ([data-reveal]) failed:", err);
  }

  try {
    document
      .querySelectorAll(
        ".section .eyebrow, .section .section-title, .section .section-desc",
      )
      .forEach((el) => {
        if (el.closest("[data-reveal]")) return;
        revealOnView(
          el,
          { opacity: "0" },
          () => animate(el, { opacity: [0, 1], y: [24, 0] }, EASE_IN),
          { amount: 0.3 },
        );
      });
  } catch (err) {
    console.warn("Scroll reveal (section titles) failed:", err);
  }

  try {
    // Timeline cards
    document.querySelectorAll(".timeline-row").forEach((row, i) => {
      const fromX = i % 2 === 0 ? -40 : 40;
      const card = row.querySelector(".timeline-card");
      const dot = row.querySelector(".timeline-dot");
      revealOnView(
        card,
        { opacity: "0" },
        () =>
          animate(
            card,
            { opacity: [0, 1], x: [fromX, 0], scale: [0.96, 1] },
            EASE_IN,
          ),
        { amount: 0.4 },
      );
      revealOnView(
        dot,
        { transform: "scale(0)" },
        () => animate(dot, { scale: [0, 1] }, EASE_POP),
        { amount: 0.4 },
      );
    });
  } catch (err) {
    console.warn("Scroll reveal (timeline) failed:", err);
  }

  try {
    // Project cards
    const projectsGrid = document.getElementById("projectsGrid");
    const projectCards = document.querySelectorAll(".project-card");
    if (projectsGrid && projectCards.length) {
      projectCards.forEach((el) => {
        el.style.opacity = "0";
      });
      inView(
        projectsGrid,
        () => {
          animate(
            ".project-card",
            { opacity: [0, 1], y: [40, 0] },
            { ...EASE_IN, delay: stagger(0.12) },
          );
        },
        { amount: 0.15 },
      );
    }
  } catch (err) {
    console.warn("Scroll reveal (projects) failed:", err);
    document.querySelectorAll(".project-card").forEach((el) => {
      el.style.opacity = "";
    });
  }

  try {
    // Certificate & Award grids
    ["certGridCertificate", "certGridAwards"].forEach((id) => {
      const grid = document.getElementById(id);
      if (!grid) return;
      const cards = grid.querySelectorAll(".cert-card");
      if (!cards.length) return;
      cards.forEach((el) => {
        el.style.opacity = "0";
      });
      try {
        inView(
          grid,
          () => {
            animate(
              cards,
              { opacity: [0, 1], y: [40, 0], scale: [0.95, 1] },
              { ...EASE_IN, delay: stagger(0.1) },
            );
          },
          { amount: 0.15 },
        );
      } catch (err) {
        cards.forEach((el) => {
          el.style.opacity = "";
        });
        throw err;
      }
    });
  } catch (err) {
    console.warn("Scroll reveal (certificates/awards) failed:", err);
  }

  try {
    // Tech marquee rows fade in
    document.querySelectorAll(".marquee-wrap").forEach((el) => {
      revealOnView(
        el,
        { opacity: "0" },
        () => animate(el, { opacity: [0, 1] }, { duration: 1 }),
        { amount: 0.3 },
      );
    });
  } catch (err) {
    console.warn("Scroll reveal (marquee) failed:", err);
  }
}

/* Hero mouse parallax on floating cards */
function initHeroParallax() {
  const wrap = document.getElementById("heroParallax");
  if (!wrap) return;
  const cards = wrap.querySelectorAll("[data-depth]");
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) return;

  wrap.addEventListener("mousemove", (e) => {
    const rect = wrap.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    cards.forEach((card) => {
      const depth = parseFloat(card.dataset.depth || 0.3);
      gsap.to(card, {
        x: relX * 22 * depth * -1,
        y: relY * 22 * depth * -1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });

  wrap.addEventListener("mouseleave", () => {
    cards.forEach((card) =>
      gsap.to(card, { x: 0, y: 0, duration: 0.8, ease: "power3.out" }),
    );
  });
}

/* Typed.js — tech stack typing inside terminal card */
function initTypedStack() {
  const el = document.getElementById("typedStack");
  if (!el || typeof Typed === "undefined") return;
  new Typed("#typedStack", {
    strings: [
      '"Laravel", "Node.js"',
      '"Nmap", "Burp Suite"',
      '"Metasploit", "OWASP ZAP"',
    ],
    typeSpeed: 38,
    backSpeed: 22,
    backDelay: 1400,
    loop: true,
    smartBackspace: true,
    contentType: "html",
  });
}

/* Tech marquee */
function renderTechMarquee() {
  const rows = [
    {
      trackId: "marqueeTrackDev",
      data: typeof TECH_STACK_DEV !== "undefined" ? TECH_STACK_DEV : [],
    },
    {
      trackId: "marqueeTrackSec",
      data: typeof TECH_STACK_SEC !== "undefined" ? TECH_STACK_SEC : [],
    },
  ];

  rows.forEach(({ trackId, data }) => {
    const track = document.getElementById(trackId);
    if (!track || !data.length) return;
    const itemsHtml = data
      .map(
        (t) =>
          `<div class="marquee-item"><i data-lucide="${t.icon}" class="w-4 h-4"></i><span>${t.name}</span></div>`,
      )
      .join("");
    track.innerHTML = itemsHtml + itemsHtml;
  });
}

function initMarqueeHoverPause() {
  document.querySelectorAll(".marquee-wrap").forEach((wrap) => {
    const track = wrap.querySelector(".marquee-track");
    if (!track) return;
    wrap.addEventListener("mouseenter", () => track.classList.add("paused"));
    wrap.addEventListener("mouseleave", () => track.classList.remove("paused"));
  });
}

/* Education timeline */
function renderEducation() {
  const el = document.getElementById("educationTimeline");
  if (!el || typeof EDUCATION === "undefined") return;

  el.innerHTML = EDUCATION.map(
    (item) => `
    <div class="timeline-row">
      <div class="timeline-card">
        <div class="tl-head">
          <div class="tl-logo">${item.logo}</div>
          <div><div class="tl-org">${item.school}</div></div>
        </div>
        <div class="tl-role">${item.major}</div>
        <div class="tl-meta">${item.year}</div>
        <p class="tl-desc">${item.desc}</p>
      </div>
      <div class="timeline-dot"></div>
      <div></div>
    </div>
  `,
  ).join("");
}

/* Experience timeline */
function renderExperience() {
  const el = document.getElementById("experienceTimeline");
  if (!el || typeof EXPERIENCE === "undefined") return;

  el.innerHTML = EXPERIENCE.map(
    (item) => `
    <div class="timeline-row">
      <div class="timeline-card">
        <div class="tl-head">
          <div class="tl-logo">${item.logo}</div>
          <div><div class="tl-org">${item.company}</div></div>
        </div>
        <div class="tl-role">${item.role}</div>
        <div class="tl-meta">${item.duration} · ${item.location}</div>
        <p class="tl-desc">${item.desc}</p>
      </div>
      <div class="timeline-dot"></div>
      <div></div>
    </div>
  `,
  ).join("");
}

/* Projects grid */
function renderProjects() {
  const el = document.getElementById("projectsGrid");
  if (!el || typeof PROJECTS === "undefined") return;

  el.innerHTML = PROJECTS.map(
    (p) => `
    <div class="project-card">
      <a href="project-detail.html?slug=${encodeURIComponent(p.slug)}" class="project-media" aria-label="Lihat detail ${p.title}">
        <span class="project-cat">${p.category}</span>
        <img data-src="${p.image}" alt="Preview proyek ${p.title}" loading="lazy" decoding="async" class="lazy-img">
      </a>
      <div class="project-body">
        <h3 class="project-title">
          <a href="project-detail.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
        </h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-stack">
          ${p.stack.map((s) => `<span class="pill">${s}</span>`).join("")}
        </div>
        <div class="project-actions">
          <a href="project-detail.html?slug=${encodeURIComponent(p.slug)}" class="project-btn detail">
            <i data-lucide="layout-panel-left" class="w-3.5 h-3.5"></i> Details
          </a>
          <a href="${p.demo}" target="_blank" rel="noopener" class="project-btn demo">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Demo
          </a>
          <a href="${p.github}" target="_blank" rel="noopener" class="project-btn code">
            <i data-lucide="github" class="w-3.5 h-3.5"></i> Github
          </a>
        </div>
      </div>
    </div>
  `,
  ).join("");
}

/* Certificate & Awards masonry — split by type into two stacked grids */
function renderCertifications() {
  const certEl = document.getElementById("certGridCertificate");
  const awardEl = document.getElementById("certGridAwards");
  if ((!certEl && !awardEl) || typeof CERTIFICATIONS === "undefined") return;

  const cardHtml = (c, i) => `
    <div class="cert-card">
      <div class="cert-media">
        <img data-src="${c.image}" alt="Sertifikat ${c.name}" loading="lazy" decoding="async" class="lazy-img">
      </div>
      <div class="cert-body">
        <h3 class="cert-name">${c.name}</h3>
        <p class="cert-meta">${c.issuer} · ${c.date}</p>
        <button class="cert-view-btn" data-cert-index="${i}">
          View Certificate <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `;

  if (certEl) {
    certEl.innerHTML = CERTIFICATIONS.map((c, i) => ({ c, i }))
      .filter(({ c }) => c.type === "certificate")
      .map(({ c, i }) => cardHtml(c, i))
      .join("");
  }
  if (awardEl) {
    awardEl.innerHTML = CERTIFICATIONS.map((c, i) => ({ c, i }))
      .filter(({ c }) => c.type !== "certificate")
      .map(({ c, i }) => cardHtml(c, i))
      .join("");
  }
}

/* Certificate modal */
function initCertModal() {
  const modal = document.getElementById("certModal");
  const img = document.getElementById("certModalImg");
  const title = document.getElementById("certModalTitle");
  const meta = document.getElementById("certModalMeta");
  const closeBtn = document.getElementById("certModalClose");
  if (!modal) return;

  document.querySelector(".cert-groups")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cert-index]");
    if (!btn) return;
    const cert = CERTIFICATIONS[Number(btn.dataset.certIndex)];
    if (!cert) return;
    img.src = cert.image;
    img.alt = `Sertifikat ${cert.name}`;
    title.textContent = cert.name;
    meta.textContent = `${cert.issuer} · ${cert.date}`;
    openModal();
  });

  function openModal() {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    const box = modal.querySelector(".cert-modal-box");
    if (window.Motion && box) {
      window.Motion.animate(
        box,
        { scale: [0.85, 1], opacity: [0, 1] },
        { type: "spring", stiffness: 340, damping: 26 },
      );
    }
  }
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  closeBtn?.addEventListener("click", closeModal);
  modal
    .querySelector(".cert-modal-backdrop")
    ?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* Stat counters — animated with Motion (inView + numeric animate) */
function initCounters() {
  if (!window.Motion) {
    document.querySelectorAll("[data-counter]").forEach((el) => {
      el.textContent = el.dataset.counter;
    });
    return;
  }
  const { animate, inView } = window.Motion;

  document.querySelectorAll("[data-counter]").forEach((el) => {
    const target = parseInt(el.dataset.counter, 10);
    let done = false;
    inView(
      el,
      () => {
        if (done) return;
        done = true;
        animate(0, target, {
          duration: 1.6,
          ease: "easeOut",
          onUpdate: (v) => {
            el.textContent = Math.floor(v);
          },
        });
      },
      { amount: 0.5 },
    );
  });
}

/* Contact form validation */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const success = document.getElementById("formSuccess");
  const submitLabel = document.getElementById("submitLabel");

  const rules = {
    name: (v) => v.trim().length > 1,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    subject: (v) => v.trim().length > 1,
    message: (v) => v.trim().length >= 10,
  };

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  function validateField(field) {
    const group = field.closest(".form-group");
    const isValid = rules[field.name] ? rules[field.name](field.value) : true;
    group.classList.toggle("invalid", !isValid);
    return isValid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    success.classList.remove("show");

    let allValid = true;
    form.querySelectorAll("input, textarea").forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      gsap.fromTo(
        form,
        { x: -6 },
        { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" },
      );
      return;
    }

    // No backend wired up — simulate a send so the UI flow is complete end to end.
    submitLabel.textContent = "Sending...";
    setTimeout(() => {
      submitLabel.textContent = "Send Message";
      success.classList.add("show");
      form.reset();
      form
        .querySelectorAll(".form-group")
        .forEach((g) => g.classList.remove("invalid"));
    }, 900);
  });
}

/* Back to top button */
function initBackToTop(lenis) {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  ScrollTrigger.create({
    start: "top -600",
    end: 99999,
    onUpdate: (self) => btn.classList.toggle("show", self.scroll() > 600),
  });

  btn.addEventListener("click", () => {
    AutoScroll.stop();
    lenis.scrollTo(0, { duration: 1.2 });
  });
}

/* Magnetic buttons */
function initMagnetic() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) return;

  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.25,
        y: y * 0.4,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    });
  });
}

/* Particle Background */
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isSmall = window.innerWidth < 640;
  const LINE_RGB = "129,140,248"; // indigo — node-to-node links
  const NODE_RGB = "165,180,252"; // slightly lighter — the dots themselves
  const GLOW_RGB = "99,102,241"; // soft halo around each node

  const COUNT = prefersReduced ? 0 : isSmall ? 34 : 70;
  const LINK_DIST = isSmall ? 110 : 150;
  const MOUSE_RADIUS = isSmall ? 130 : 180;
  const MOUSE_PUSH = 0.9;

  let width, height, dpr;
  let particles = [];
  let rafId = null;
  let running = true;
  const mouse = { x: 0, y: 0, active: false };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.offsetWidth = window.innerWidth;
    height = canvas.offsetHeight = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: 1.6 + Math.random() * 2.2,
      opacity: 0.5 + Math.random() * 0.4,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, makeParticle);
  }

  function drawNode(p) {
    // soft halo
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
    glow.addColorStop(0, `rgba(${GLOW_RGB}, ${p.opacity * 0.25})`);
    glow.addColorStop(1, `rgba(${GLOW_RGB}, 0)`);
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
    ctx.fill();

    // core dot
    ctx.beginPath();
    ctx.fillStyle = `rgba(${NODE_RGB}, ${p.opacity})`;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLine(x1, y1, x2, y2, alpha) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${LINE_RGB}, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function step() {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0 || p.x >= width) {
        p.vx *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
      }
      if (p.y <= 0 || p.y >= height) {
        p.vy *= -1;
        p.y = Math.max(0, Math.min(height, p.y));
      }

      // gentle push away from the cursor — this is what makes it "playable"
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < MOUSE_RADIUS) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_PUSH;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // node-to-node links
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          drawLine(
            particles[i].x,
            particles[i].y,
            particles[j].x,
            particles[j].y,
            (1 - dist / LINK_DIST) * 0.35,
          );
        }
      }
    }

    // cursor-to-node links
    if (mouse.active) {
      particles.forEach((p) => {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < MOUSE_RADIUS) {
          drawLine(
            p.x,
            p.y,
            mouse.x,
            mouse.y,
            (1 - dist / MOUSE_RADIUS) * 0.55,
          );
        }
      });
    }

    particles.forEach(drawNode);
  }

  function tick() {
    if (!running) return;
    step();
    draw();
    rafId = requestAnimationFrame(tick);
  }

  if (COUNT === 0) return; // reduced motion — skip animation entirely

  init();
  rafId = requestAnimationFrame(tick);

  window.addEventListener("resize", debounce(resize, 200));

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) rafId = requestAnimationFrame(tick);
    else cancelAnimationFrame(rafId);
  });

  // Cursor interaction
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener("pointerdown", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  document.addEventListener("mouseleave", () => {
    mouse.active = false;
  });
  window.addEventListener("blur", () => {
    mouse.active = false;
  });
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ---
   Lazy image loading — real payload deferral for dynamically rendered
   project/certificate images (mostly hotlinked from Unsplash), not just the
   native `loading="lazy"` attribute. Images are rendered with `data-src`
   and no `src`; an IntersectionObserver swaps the real URL in once the
   image is ~300px from entering the viewport, then fades it in.
   Falls back to loading everything immediately if IntersectionObserver
   isn't available.
   --- */
function initLazyImages() {
  const images = document.querySelectorAll("img.lazy-img[data-src]");
  if (!images.length) return;

  const loadImage = (img) => {
    const src = img.getAttribute("data-src");
    if (!src) return;
    img.src = src;
    img.removeAttribute("data-src");
    const reveal = () => img.classList.add("lazy-loaded");
    img.addEventListener("load", reveal, { once: true });
    img.addEventListener("error", reveal, { once: true }); // broken link shouldn't stay invisible
    setTimeout(reveal, 6000); // last-resort safety net if neither event ever fires
  };

  if (!("IntersectionObserver" in window)) {
    images.forEach(loadImage);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadImage(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "300px 0px", threshold: 0.01 },
  );

  images.forEach((img) => observer.observe(img));
}

/* Explore Now */
function initExploreAutoScroll(lenis) {
  const btn = document.getElementById("exploreBtn");
  const label = document.getElementById("exploreBtnLabel");
  if (!btn) return;

  const sectionIds = [
    "home",
    "about",
    "techstack",
    "education",
    "experience",
    "projects",
    "certification",
    "contact",
  ];
  const READ_PAUSE = 2600;

  function setLabel(text) {
    if (label) label.textContent = text;
  }

  function stopTour(resetLabel = true) {
    if (!AutoScroll.active) return;
    AutoScroll.stop();
    if (resetLabel) setLabel("Explore Now");
  }

  function playStep(i) {
    if (!AutoScroll.active || i >= sectionIds.length) {
      stopTour();
      return;
    }
    const target = document.getElementById(sectionIds[i]);
    if (target) lenis.scrollTo(target, { offset: -20, duration: 1.4 });
    AutoScroll.timeout = setTimeout(() => playStep(i + 1), READ_PAUSE);
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (AutoScroll.active) {
      stopTour();
      return;
    }
    AutoScroll.active = true;
    setLabel("Auto-scroll... (Click to stop)");
    playStep(0);
  });

  // Any deliberate manual scroll input cancels the guided tour immediately
  ["wheel", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, () => stopTour(), { passive: true });
  });
}

/* ---  Motion --- */
function initMotionInteractions() {
  if (!window.Motion) return;
  const { animate, hover, press, inView } = window.Motion;
  const SPRING_IN = { type: "spring", stiffness: 380, damping: 18 };
  const SPRING_OUT = { type: "spring", stiffness: 380, damping: 22 };
  const SPRING_PRESS = { type: "spring", stiffness: 500, damping: 22 };

  // Small chips / icons: gentle pop + lift on hover (non-magnetic elements only)
  hover(
    ".social-icon, .pill, .skill-tag, .marquee-item, .cert-view-btn",
    (el) => {
      animate(el, { scale: 1.08, y: -2 }, SPRING_IN);
      return () => animate(el, { scale: 1, y: 0 }, SPRING_OUT);
    },
  );

  // Nav links: subtle lift on hover
  hover(".nav-link", (el) => {
    animate(el, { y: -2 }, SPRING_IN);
    return () => animate(el, { y: 0 }, SPRING_OUT);
  });

  // Tap/click feedback on non-magnetic action buttons
  press(".project-btn, .cert-view-btn, .social-icon", (el) => {
    animate(el, { scale: 0.92 }, SPRING_PRESS);
    return () => animate(el, { scale: 1 }, SPRING_OUT);
  });

  // Project & cert cards: soft spring lift instead of a flat CSS ease
  hover(".project-card, .cert-card", (el) => {
    animate(el, { y: -8 }, { type: "spring", stiffness: 260, damping: 20 });
    return () =>
      animate(el, { y: 0 }, { type: "spring", stiffness: 260, damping: 24 });
  });

  // Timeline cards: gentle spring lift on hover too
  hover(".timeline-card", (el) => {
    animate(el, { y: -4 }, { type: "spring", stiffness: 300, damping: 22 });
    return () =>
      animate(el, { y: 0 }, { type: "spring", stiffness: 300, damping: 24 });
  });

  // Back-to-top button: a satisfying press
  press(".back-to-top", (el) => {
    animate(el, { scale: 0.88 }, SPRING_PRESS);
    return () => animate(el, { scale: 1 }, SPRING_OUT);
  });
}

/* --- Caching — Service Worker registration --- */
function initServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "http:" && location.protocol !== "https:") return; // file:// can't register SWs

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch((err) => console.warn("Service worker registration failed:", err));
  });
}
