    // REGISTER SERVICE WORKER
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
          navigator.serviceWorker
            .register("../service-worker1.js")
            .then(function() {
              console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function() {
              console.log("Pendaftaran ServiceWorker gagal");
            });
        });
      } else {
        console.log("ServiceWorker belum didukung browser ini.");
      }

      // REQUEST API UNTUK PERTAMA KALI
    document.addEventListener("DOMContentLoaded", function() {
    
  });