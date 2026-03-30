const CACHE_NAME = "aiadvisor-v1";
const urlsToCache = [
  "/",
  "/tools",
  "/search",
  "/offline",
  "/icon-192.png",
  "/icon-512.png"
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === "error") {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }).catch(() => {
      return caches.match("/offline");
    })
  );
});

// Push notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "AIAdvisor.tools";
  const options = {
    body: data.message,
    icon: "/icon-192.png",
    badge: "/badge-72.png",
    tag: "aiadvisor-notification"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
