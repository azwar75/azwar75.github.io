importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/detailteam.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/ligaspanyol.html', revision: '1' },
    { url: '/pages/ligajerman.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/body.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/regis.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/image/logo.png', revision: '1' },
    { url: '/image/icons/icon-151x151.png', revision: '1' },
    { url: '/image/icons/icon-191x191.png', revision: '1' },
    { url: '/image/icons/icon-384x384.png', revision: '1' },
    { url: '/image/icons/icon-511x511.png', revision: '1' },
    { url: '/image/bola.png', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/notifikasi.js', revision: '1' },
    { url: '/js/sw.js', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff1', revision: '1' },
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