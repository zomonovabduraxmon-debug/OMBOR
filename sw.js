const CACHE = 'permit-tracker-shell-v13-fixed';
const APP_SHELL = [
  './',
  './index.html',
  './config.js',
  './sync-core.js',
  './offline-sync.js',
  './ui-v13.js',
  './ui-v13.css',
  './client-final-fixed.css',
  './manifest.webmanifest',
  './icon.svg',
  './bg-icon.png',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(async cache => {
      for(const url of APP_SHELL){
        try{ await cache.add(new Request(url, { cache:'reload' })); }catch(_){ }
      }
    }).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if(url.hostname.endsWith('.supabase.co')) return;

  event.respondWith((async()=>{
    // Online: always prefer the newest deployed app. Offline: use the cached shell.
    try{
      const response = await fetch(event.request, { cache:'no-cache' });
      if(response && (response.ok || response.type === 'opaque')){
        const cache = await caches.open(CACHE);
        cache.put(event.request, response.clone()).catch(()=>{});
      }
      return response;
    }catch(err){
      const cached = await caches.match(event.request);
      if(cached) return cached;
      if(event.request.mode === 'navigate'){
        const fallback = await caches.match('./index.html');
        if(fallback) return fallback;
      }
      throw err;
    }
  })());
});
