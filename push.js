
var webPush = require('web-push');
 
const vapidKeys = {
   publicKey: 
            'BHDqxMLwVV_j_FsJlF_fzq7y2iQ2YvO-eD6PqhG-GV1bfIuVUsf1DROoEFH1e_RTlQ-JM8T1azDemlVcx56uGqI',
   privateKey:
            '1l3XIbjTgJ-ZzaMQLTOyfuGdtnywkOuYzA2qz0yP2ds',
};
 
 
webPush.setVapidDetails(
   'https://azwar75.github.io/',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   endpoint : 
             'https://fcm.googleapis.com/fcm/send/e-kfLAvIIZE:APA91bHJBP2aJseFJNJ5e6-pjzjAuNaAGCTm2SDYz4BLkGC1WT4h5BKj8afjEcKUrupal0a_v2EroplA6uDzCPybHpIGh4fmX9FHLUAy_HcIJeHoueLMctLvScYUUT6CCt027Tvy_eOU',
   keys : {
       p256dh : 'BHn9NR+by0osJpios+2xwFZ/rzkg2UKnbjUcKs82NgQyGNRMtUkSnsYJtXHMT+pRF4BY9XJK2JCWK2lKkGcltfI=',
       auth : 
             'UHhW07yuC4daFbOGf2tPXw=='
   }
};
var payload = 'Terimakasih Telah Berlanganan di Seputar Bola';
 
var options = {
   gcmAPIKey: '250048487304',
   TTL: 60,
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);