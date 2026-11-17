/* Arjuna service worker: offline shell + notification click handling */
const CACHE = 'arjuna-v6';
const ASSETS = ['./', 'index.html', 'app.js', 'bg3d.js', 'home.js', 'intro.js', 'style.css', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

// Network first (updates show immediately), cache when offline. Cross-origin (CDN, Firebase) passes through.
self.addEventListener('fetch', (e) => {
    const r = e.request;
    if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
    e.respondWith(
        fetch(r)
            .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(r, copy)); return res; })
            .catch(() => caches.match(r).then((m) => m || caches.match('index.html')))
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) =>
            list.length ? list[0].focus() : clients.openWindow('./')
        )
    );
});
