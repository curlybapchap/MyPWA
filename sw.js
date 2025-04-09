import { FILES_TO_CACHE } from "swFilesCache.js";

const FILE_CACHE_NAME = 'static-cache-v1';
const CACHE_VERSION = "0.0.01";

self.addEventListener('install', (evt) => {
  alert("installing");
  self.skipWaiting();
  evt.waitUntil(
    caches.open(FILE_CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== FILE_CACHE_NAME && key !== DATA_CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.open(FILE_CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
        .then((response) => {
          return response || fetch(evt.request);
        });
    })
  );
});