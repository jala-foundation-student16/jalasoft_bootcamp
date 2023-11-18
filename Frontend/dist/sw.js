const CACHE_VERSION = "1";

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open(`static-v${CACHE_VERSION}`).then((cache) => {
      console.log("[Service Worker] Precaching app shell");
      cache.addAll([
        "/",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating Service Worker ...", event);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (
            key !== `static-v${CACHE_VERSION}` &&
            key !== `dynamic-v${CACHE_VERSION}`
          ) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Cache then Network
self.addEventListener("fetch", (event) => {
  const url = "http://localhost:5500";
  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      caches.open(`dynamic-v${CACHE_VERSION}`).then((cache) =>
        fetch(event.request).then((res) => {
          cache.put(event.request, res.clone);
          return res;
        })
      )
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((res) => {
            return caches.open(`dynamic-v${CACHE_VERSION}`).then((cache) => {
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch((err) => {
            return caches.open(`static-v${CACHE_VERSION}`).then((cache) => {
              if (event.request.url.indexOf("/help")) {
                return cache.match("/offline.html");
              }
            });
          });
      })
    );
  }
});

// Cache first, Network fallback
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       }

//       return fetch(event.request)
//         .then((res) => {
//           return caches.open(`dynamic-v${CACHE_VERSION}`).then((cache) => {
//             cache.put(event.request.url, res.clone());
//             return res;
//           });
//         })
//         .catch((err) => {
//           return caches.open(`static-v${CACHE_VERSION}`).then((cache) => {
//             return cache.match("/offline.html");
//           });
//         });
//     })
//   );
// });

// Cache only method
// self.addEventListener("fetch", (event) => {
//   event.respondWith(caches.match(event.request));
// });

// Network only method
// self.addEventListener("fetch", (event) => {
//   event.respondWith(fetch(event.request));
// });

// Network first, Cache fallback
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     fetch(event.request)
//       .then((res) => {
//         return caches.open(`dynamic-v${CACHE_VERSION}`).then((cache) => {
//           cache.put(event.request.url, res.clone());
//           return res;
//         });
//       })
//       .catch((err) => {
//         return caches.match(event.request);
//       })
//   );
// });
