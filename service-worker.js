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
    { url: '/pages/ligainggris.html', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/css/body.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/regis.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/image/logo.png', revision: '1' },
    { url: '/image/icons/icon-152x152.png', revision: '1' },
    { url: '/image/icons/icon-192x192.png', revision: '1' },
    { url: '/image/icons/icon-384x384.png', revision: '1' },
    { url: '/image/icons/icon-512x512.png', revision: '1' },
    { url: '/image/bola.png', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/notifikasi.js', revision: '1' },
    { url: '/js/sw.js', revision: '1' },
    { url: 'https://api.football-data.org/v2', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);


  

