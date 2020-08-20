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
    { url: '/pages/home.html', revision: '2' },
    { url: '/pages/ligaspanyol.html', revision: '2' },
    { url: '/pages/ligajerman.html', revision: '2' },
    { url: '/pages/saved.html', revision: '2' },
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
    { url: 'https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff1', revision: '2' },
],  {
ignoreUrlParametersMatching: [/.*/]
}

);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);


  self.addEventListener("fetch", function(event) {
    var base_url = "https://api.football-data.org/v2";
  
    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(workbox).then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
        })
      )
    }
  });
  
  self.addEventListener("activate", function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheName != workbox) {
                console.log("ServiceWorker: cache " + cacheName + " dihapus");
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });
  
    self.addEventListener('push', function(event) {
      var body;
      if (event.data) {
        body = event.data.text();
      } else {
        body = 'Push message no payload';
      }
      var options = {
        body: body,
        icon: '/image/logo.png',
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