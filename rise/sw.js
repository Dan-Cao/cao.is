// Retired. Phones that installed the old offline worker fetch this on their
// next update check; it removes itself and reloads open pages from the network.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    await Promise.all((await caches.keys()).map((k) => caches.delete(k)));
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
  })());
});
