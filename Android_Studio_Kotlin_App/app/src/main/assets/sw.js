const CACHE_NAME = 'remk-app-v2026-131-v25-9-watch-allinone-home-tile';
const ASSETS = [
  './',
  './index.html',
  './watch.html',
  './manifest.json',
  './logo.jpg',
  './icon-192.png',
  './icon-512.png',
  './lz-string.min.js',
  './remk_builtin_fallbacks.js',
  './remk_lebensmittel_bls_db.js',
  './rezepte.js',
  './uebungen.js',
  './rezepte_buisness_teil1.js',
  './uebungen_buisness_teil1.js',
  './rezepte_buisness_teil2.js',
  './uebungen_buisness_teil2.js',
  './rezepte_teil3.js',
  './uebungen_teil3.js',
  './rezepte_teil4.js',
  './uebungen_teil4.js',
  './athletik_verein.js',
  './stretching_mobility.js',
  './rezepte_filter_rustikal.js',
  './rezepte_filter_athlet.js',
  './rezepte_filter_schicht.js',
  './rezepte_filter_kampfsport.js',
  './rezepte_filter_familie.js',
  './athletik_art_zirkel_core_metabolic.js',
  './athletik_art_zirkel_oberkoerper.js',
  './athletik_art_zirkel_unterkoerper.js',
  './athletik_art_speed_agility.js',
  './uebungen_art_core.js',
  './uebungen_art_pull.js',
  './uebungen_art_push.js',
  './uebungen_art_hintere_kette.js',
  './uebungen_art_beine.js',
  './uebungen_calisthenics_freeletics.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        ASSETS.map(url =>
          fetch(url, { cache: 'no-cache' }).then(res => {
            if (res && res.ok) return cache.put(url, res);
          })
        )
      )
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve()))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// ============================================================================
// RE:MK SMARTWATCH, BACKGROUND REST-TIMER & INSTANT-UPDATE BRIDGE (v22.5)
// ============================================================================
let swRestTimerTimeout = null;

self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (data.type === 'SCHEDULE_WATCH_NOTIFICATION') {
    if (swRestTimerTimeout) {
      clearTimeout(swRestTimerTimeout);
      swRestTimerTimeout = null;
    }
    const delayMs = Math.max(500, parseInt(data.delayMs, 10) || 1000);
    const title = data.title || '⏱️ RE:MK Pause beendet! 💪';
    const body = data.body || 'Nächster Satz steht an – volle Konzentration!';
    swRestTimerTimeout = setTimeout(() => {
      swRestTimerTimeout = null;
      self.registration.showNotification(title, {
        body: body,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        vibrate: [250, 100, 250, 100, 350],
        tag: 'remk-rest-timer',
        renotify: true,
        requireInteraction: false,
        silent: false
      }).catch(() => {});
    }, delayMs);
  } else if (data.type === 'CANCEL_WATCH_NOTIFICATION') {
    if (swRestTimerTimeout) {
      clearTimeout(swRestTimerTimeout);
      swRestTimerTimeout = null;
    }
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});
