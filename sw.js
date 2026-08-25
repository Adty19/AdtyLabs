/* --- Service Worker — caching layer for the portfolio site --- */

const CACHE_VERSION = "v1";
const STATIC_CACHE = `portfolio-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `portfolio-runtime-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./project-detail.html",
  "./assets/css/style.css",
  "./assets/css/project-detail.css",
  "./assets/js/data.js",
  "./assets/js/main.js",
  "./assets/js/project-detail.js",
  "./assets/images/certificate/htb.jpg",
  "./assets/images/projects/DigestiveSystemPreview.jpg",
  "./assets/images/projects/MiraiPlayPreview.png",
  "./assets/images/projects/ReadBooksPreview.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // Offline and not cached — nothing more we can do for this request.
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const networkFetch = fetch(request, {
    mode: request.mode === "navigate" ? "same-origin" : "cors",
  })
    .then((response) => {
      if (response && (response.status === 200 || response.type === "opaque")) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || networkFetch;
}
