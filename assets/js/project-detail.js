document.addEventListener("DOMContentLoaded", () => {
  safeInit("particles", initParticles);

  const project = resolveProject();
  if (!project) {
    window.location.replace("index.html#projects");
    return;
  }

  safeInit("renderProject", () => renderProject(project));
  safeInit("fixBrandIcons", fixBrandIcons);
  if (window.lucide) safeInit("lucide.createIcons", () => lucide.createIcons());

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  safeInit("loader", runLoader);
  const lenis = initLenis();

  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  safeInit("stickyNav", () => initStickyNav(lenis));
  safeInit("techTilt", initTechTilt);
  safeInit("screenshotParallax", initScreenshotParallax);
  safeInit("scrollReveal", initScrollReveal);
  safeInit("lazyImages", initLazyImages);
  safeInit("backToTop", () => initBackToTop(lenis));
  safeInit("magnetic", initMagnetic);
  safeInit("motionInteractions", initMotionInteractions);
  safeInit("serviceWorker", initServiceWorker);
});

function safeInit(label, fn) {
  try {
    fn();
  } catch (err) {
    console.warn(`[project-detail] "${label}" failed to initialize:`, err);
  }
}

/* --- Resolve which project to show --- */
function resolveProject() {
  if (typeof PROJECTS === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  if (!slug) return PROJECTS[0] || null;
  return PROJECTS.find((p) => p.slug === slug) || PROJECTS[0] || null;
}

/* --- Render project data into the page --- */
function renderProject(project) {
  document.title = `${project.title.split("|")[0].trim()} — Aditya Pranoto`;

  setText("heroCategory", project.category);
  setText("heroYear", project.year);
  setText("heroTitle", project.title);
  setText("heroDesc", project.desc);
  setText("overviewDesc", project.desc);
  setText("overviewChallenge", project.challenge || "—");
  setText("overviewSolution", project.solution || "—");
  setText("overviewResult", project.result || "—");

  // Demo / Github links (hero buttons + sticky nav CTA)
  ["heroDemoBtn", "navDemoBtn"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = project.demo || "#";
  });
  const githubBtn = document.getElementById("heroGithubBtn");
  if (githubBtn) githubBtn.href = project.github || "#";

  // Hero thumbnail
  const heroThumb = document.getElementById("heroThumb");
  if (heroThumb) {
    heroThumb.src = project.image;
    heroThumb.alt = `Preview ${project.title}`;
    heroThumb.loading = "eager";
    heroThumb.setAttribute("fetchpriority", "high");
    heroThumb.classList.add("lazy-loaded");
  }

  // Tech badges under the hero title
  const badgesEl = document.getElementById("heroTechBadges");
  if (badgesEl) {
    badgesEl.innerHTML = (project.stack || [])
      .map((s) => `<span class="pill">${s}</span>`)
      .join("");
  }

  // Key features list
  const featuresEl = document.getElementById("overviewFeatures");
  if (featuresEl) {
    featuresEl.innerHTML = (project.features || [])
      .map((f) => `<li>${f}</li>`)
      .join("");
  }

  // Tech Stack grid — icon + short blurb looked up from the shared map
  const techGridEl = document.getElementById("techStackGrid");
  if (techGridEl) {
    techGridEl.innerHTML = (project.stack || [])
      .map((name) => {
        const meta = (typeof TECH_ICON_MAP !== "undefined" &&
          TECH_ICON_MAP[name]) || {
          icon: "code-2",
          desc: "Technology used to build this project.",
        };
        return `
          <div class="tech-card">
            <div class="tech-card-icon"><i data-lucide="${meta.icon}" class="w-5 h-5"></i></div>
            <h3 class="tech-card-name">${name}</h3>
            <p class="tech-card-desc">${meta.desc}</p>
          </div>
        `;
      })
      .join("");
  }

  // Screenshot gallery
  const galleryEl = document.getElementById("screenshotGallery");
  if (galleryEl) {
    const shots =
      project.screenshots && project.screenshots.length
        ? project.screenshots
        : [project.image];
    galleryEl.innerHTML = shots
      .slice(0, 8)
      .map(
        (src, i) => `
        <div class="screenshot-card">
          <img data-src="${src}" alt="Screenshot ${i + 1} — ${project.title}" loading="lazy" decoding="async" class="lazy-img">
        </div>
      `,
      )
      .join("");
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || "";
}

/* --- Loader animation: fill → fade → scale → hide, then reveal page content — GSAP timeline --- */
function runLoader() {
  const loader = document.getElementById("loader");
  const fill = document.querySelector(".loader-bar-fill");
  document.body.style.overflow = "hidden";
  const tl = gsap.timeline();

  tl.to(fill, { width: "100%", duration: 1.2, ease: "power2.inOut" })
    .to(
      ".loader-inner",
      { opacity: 0, scale: 0.92, duration: 0.45, ease: "power2.in" },
      "+=0.1",
    )
    .to(
      loader,
      {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
          loader.style.display = "none";
          document.body.style.overflow = "";
          revealPage();
        },
      },
      "-=0.1",
    );
}

/* Hero + nav entrance: blur → clear, fade, scale, stagger — GSAP timeline */
function revealPage() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(".detail-nav", { opacity: 1, y: 0, duration: 0.7 }, 0).fromTo(
    "[data-hero]",
    { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      duration: 0.9,
      stagger: 0.12,
    },
    0.15,
  );
}

/* --- Lenis smooth scroll --- */
function initLenis() {
  return new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  });
}

/* --- Sticky tab nav --- */
function initStickyNav(lenis) {
  const nav = document.getElementById("detailNav");
  const tabs = [...document.querySelectorAll(".detail-tab")];
  const indicator = document.getElementById("tabIndicator");
  if (!nav || !tabs.length) return;

  gsap.set(nav, { opacity: 0, y: -16 });

  function moveIndicator(tab) {
    if (!indicator || !tab) return;
    const tabsBox = tab.parentElement.getBoundingClientRect();
    const box = tab.getBoundingClientRect();
    indicator.style.width = `${box.width}px`;
    indicator.style.transform = `translateX(${box.left - tabsBox.left - 4}px)`;
  }

  function setActive(id) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === id));
    const activeTab = tabs.find((t) => t.dataset.tab === id);
    if (activeTab) moveIndicator(activeTab);
  }

  // Initial indicator position once fonts/layout have settled
  requestAnimationFrame(() => setActive("overview"));
  window.addEventListener(
    "resize",
    debounce(() => {
      const current = tabs.find((t) => t.classList.contains("active"));
      if (current) moveIndicator(current);
    }, 200),
  );

  // Scroll spy via GSAP ScrollTrigger
  ["overview", "tech-stack", "screenshots"].forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) setActive(id);
      },
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(tab.dataset.tab);
      if (target) lenis.scrollTo(target, { offset: -100, duration: 1.2 });
    });
  });

  document
    .querySelector(".detail-nav-back")
    ?.addEventListener("click", () => {});
}

/* --- Tech Stack cards --- */
function initTechTilt() {
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  document.querySelectorAll(".tech-card").forEach((card) => {
    if (isTouch) return;
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -10;
      const rotateY = (x / rect.width - 0.5) * 10;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* --- Screenshot gallery --- */
function initScreenshotParallax() {
  const cards = document.querySelectorAll(".screenshot-card");
  if (!cards.length) return;
  const rotations = [-1.4, 1.1, -0.8, 1.3, -1.1, 0.9];

  cards.forEach((card, i) => {
    const depth = 0.6 + (i % 3) * 0.35;
    gsap.to(card, {
      yPercent: -14 * depth,
      rotate: rotations[i % rotations.length],
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });
}

/* --- Scroll reveal --- */
function initScrollReveal() {
  const M = window.Motion;
  const motionReady =
    M && typeof M.inView === "function" && typeof M.animate === "function";
  if (!motionReady) return;

  const { animate, inView } = M;
  const EASE_IN = { type: "spring", stiffness: 140, damping: 20, mass: 0.7 };

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
        { opacity: "0", transform: "translateY(24px)" },
        () => animate(el, { opacity: [0, 1], y: [24, 0] }, EASE_IN),
        { amount: 0.2 },
      );
    });
  } catch (err) {
    console.warn("Scroll reveal failed:", err);
  }
}

/* --- Lazy image loading --- */
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
    img.addEventListener("error", reveal, { once: true });
    setTimeout(reveal, 6000);
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

function initBackToTop(lenis) {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  ScrollTrigger.create({
    start: "top -600",
    end: 99999,
    onUpdate: (self) => btn.classList.toggle("show", self.scroll() > 600),
  });
  btn.addEventListener("click", () => lenis.scrollTo(0, { duration: 1.2 }));
}

/* --- Magnetic buttons --- */
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

/* --- Motion micro-interactions --- */
function initMotionInteractions() {
  if (!window.Motion) return;
  const { animate, hover } = window.Motion;
  const SPRING_IN = { type: "spring", stiffness: 380, damping: 18 };
  const SPRING_OUT = { type: "spring", stiffness: 380, damping: 22 };

  hover(".pill, .detail-nav-back, .detail-footer-link", (el) => {
    animate(el, { scale: 1.06, y: -1 }, SPRING_IN);
    return () => animate(el, { scale: 1, y: 0 }, SPRING_OUT);
  });
}

/* --- Brand icon fallback --- */
function fixBrandIcons() {
  const PATHS = {
    github:
      "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z",
  };
  document.querySelectorAll('[data-lucide="github"]').forEach((el) => {
    const path = PATHS[el.getAttribute("data-lucide")];
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

/* --- Particle background --- */
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isSmall = window.innerWidth < 640;
  const LINE_RGB = "129,140,248";
  const NODE_RGB = "165,180,252";
  const GLOW_RGB = "99,102,241";

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
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
    glow.addColorStop(0, `rgba(${GLOW_RGB}, ${p.opacity * 0.25})`);
    glow.addColorStop(1, `rgba(${GLOW_RGB}, 0)`);
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
    ctx.fill();

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

  if (COUNT === 0) return;

  init();
  rafId = requestAnimationFrame(tick);

  window.addEventListener("resize", debounce(resize, 200));

  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) rafId = requestAnimationFrame(tick);
    else cancelAnimationFrame(rafId);
  });

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

/* --- Caching via Service Worker --- */
function initServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "http:" && location.protocol !== "https:") return;
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .catch((err) => console.warn("Service worker registration failed:", err));
  });
}
