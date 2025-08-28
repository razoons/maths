/* v1.2.0 — offline robuste (ignore les query params pour les HTML) */
const CACHE_NAME = "pwa-cache-v4";
const APP_SHELL = [
  "/maths/",
  "/maths/index.html",
  "/maths/game.html",
  "/maths/current.html",
  "/maths/styles.css",
  "/maths/manifest.webmanifest",
  "/maths/icon-192.png",
  "/maths/icon-512.png",
  "/maths/offline.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // On met en cache l'app shell pour qu'elle soit dispo hors-ligne
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)));
    // (facultatif) navigation preload si dispo
    if (self.registration.navigationPreload) {
      try { await self.registration.navigationPreload.enable(); } catch {}
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // --- 1) NAVIGATIONS HTML ---
  // iOS/Safari n'indique pas toujours mode==="navigate", on teste aussi l'en-tête Accept.
  const isHTMLNavigation =
    req.mode === "navigate" ||
    (req.method === "GET" && req.headers.get("accept") && req.headers.get("accept").includes("text/html"));

  if (isHTMLNavigation) {
    event.respondWith((async () => {
      // Essai réseau (network-first)
      try {
        // Si navigation preload est activée, on l'utilise (meilleur TTI)
        const preload = event.preloadResponse ? await event.preloadResponse : null;
        const fresh = preload || await fetch(req);
        // On met en cache la réponse de navigation
        const cache = await caches.open(CACHE_NAME);
        // On stocke sous l’URL *sans* query string pour réutiliser offline
        const url = new URL(req.url);
        const normalizedURL = url.origin + url.pathname; // ignore ?query
        cache.put(normalizedURL, fresh.clone());
        return fresh;
      } catch {
        // OFFLINE : on ignore les query params pour chercher une page équivalente
        const cache = await caches.open(CACHE_NAME);
        const fallback = await cache.match(req, { ignoreSearch: true });
        return fallback || await cache.match("/maths/offline.html") || new Response("Offline", { status: 503 });
      }
    })());
    return;
  }

  // --- 2) ASSETS STATIQUES (CSS/JS/IMG/WEBFONT) : cache-first ---
  const isStatic = ["style", "script", "image", "font"].includes(req.destination);
  if (isStatic) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const fresh = await fetch(req);
        // Ne mets en cache que les réponses OK
        if (fresh && fresh.status === 200 && fresh.type !== "opaque") {
          cache.put(req, fresh.clone());
        }
        return fresh;
      } catch {
        return cached || new Response(null, { status: 504 });
      }
    })());
    return;
  }

  // --- 3) AUTRES REQUÊTES : network-first avec repli cache ---
  event.respondWith((async () => {
    try {
      return await fetch(req);
    } catch {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      return cached || new Response(null, { status: 504 });
    }
  })());
});

// Mise à jour immédiate via postMessage({type:"SKIP_WAITING"})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
