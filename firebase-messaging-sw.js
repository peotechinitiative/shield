importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: self.__FIREBASE_CONFIG__.apiKey,
  authDomain: self.__FIREBASE_CONFIG__.authDomain,
  projectId: self.__FIREBASE_CONFIG__.projectId,
  messagingSenderId: self.__FIREBASE_CONFIG__.messagingSenderId,
  appId: self.__FIREBASE_CONFIG__.appId,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'Shield Alert', {
    body: body || 'You have a new notification',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: payload.data?.type || 'default',
    requireInteraction: true,
  });
});
