const CACHE = 'prax-v50';
const ASSETS = [
  '/modo-accion/',
  '/modo-accion/index.html',
  '/modo-accion/manifest.json',
  '/modo-accion/icon-192.png',
  '/modo-accion/icon-512.png',
  '/modo-accion/apple-touch-icon-v2.png',
  '/modo-accion/jsqr.min.js',
  '/modo-accion/qrcode.min.js',
  'https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@300;400;500;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isNav = e.request.mode === 'navigate'
    || url.pathname.endsWith('/index.html')
    || url.pathname.endsWith('/modo-accion/');

  if (isNav) {
    // Network-first para la página: siempre intenta traer la última versión
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/modo-accion/index.html'))
    );
  } else {
    // Cache-first para assets estáticos (imágenes, JS libs, fuentes)
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        if (res && res.status === 200 && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/modo-accion/index.html')))
    );
  }
});
