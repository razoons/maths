/* v1.0.1 */
const CACHE_NAME = "pwa-cache-v2";

/**
 * ⚠️ IMPORTANT : 
 * comme ton site est servi depuis /maths/,
 * toutes les ressources doivent être référencées avec ce chemin.
 */
const APP_SHELL = [
  "/maths/",                  // page d'accueil
  "/maths/index.html",
  "/maths/game.html",
  "/maths/current.html",
  "/maths/styles.css",
  "/maths/manifest.webmanifest",
  "/maths/icon-192.png",
  "/maths/icon-512.png"
];

// (optionnel) page de secours offline
const OFFLINE_FALLBACK_PAGE = "/maths/index.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_SHELL);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Supprimer anciens caches
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null))
      );
      await self.clients.claim();
    })()
  );
});

/**
 * Stratégies de cache :
 * - HTML (navigate) : network-first, fallback offline
 * - Assets statiques : cache-first, mise à jour en arrière-plan
 * - Autres : network-first basique
 */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.url.includes("current.html")) {
    req = new Request("/maths/current.html");
  }

  // 1) Navigations (HTML)
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, fresh.clone());
          return fresh;
        } catch (err) {
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match(req)) || (await cache.match(OFFLINE_FALLBACK_PAGE));
        }
      })()
    );
    return;
  }

  // 2) Assets statiques
  if (["style", "script", "image", "font"].includes(req.destination)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req);

        if (cached) return cached;
        try {
          const fresh = await fetch(req);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          return cached || new Response(null, { status: 504 });
        }
      })()
    );
    return;
  }

  // 3) Par défaut : network-first
  event.respondWith(
    (async () => {
      try {
        return await fetch(req);
      } catch {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(req)) || new Response(null, { status: 504 });
      }
    })()
  );
});
