importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '2' },
    { url: '/nav.html', revision: '2' },
    { url: '/css/materialize.min.css', revision: '2' },
    { url: '/js/materialize.min.js', revision: '2' },
    { url: '/detailteam.html', revision: '2' },
    { url: '/css/materialize.css', revision: '2' },
    { url: '/css/body.css', revision: '2' },
    { url: '/js/materialize.min.js', revision: '2' },
    { url: '/js/materialize.js', revision: '2' },
    { url: '/js/nav.js', revision: '2' },
    { url: '/js/regis.js', revision: '2' },
    { url: '/manifest.json', revision: '2' },
    { url: '/image/logo.png', revision: '2' },
    { url: '/image/icons/icon-152x152.png', revision: '2' },
    { url: '/image/icons/icon-192x192.png', revision: '2' },
    { url: '/image/icons/icon-384x384.png', revision: '2' },
    { url: '/image/icons/icon-512x512.png', revision: '2' },
    { url: '/image/bola.png', revision: '2' },
    { url: '/js/api.js', revision: '2' },
    { url: '/js/db.js', revision: '2' },
    { url: '/js/idb.js', revision: '2' },
    { url: '/js/notifikasi.js', revision: '2' },
    { url: '/js/sw.js', revision: '2' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '2' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '2' },
],  {
ignoreUrlParametersMatching: [/.*/]
}
);


workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/v2/'),
	workbox.strategies.networkFirst({
		cacheName: 'fetch',
	})
);

    self.addEventListener('push', function(event) {
      let body;
      if (event.data) {
        body = event.data.text();
      } else {
        body = 'Push message no payload';
      }
      let options = {
        body: body,
        icon: '/image/logo.png',
        badge: '/image/logo.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      event.waitUntil(
        self.registration.showNotification('Push Notification', options)
      );
    });