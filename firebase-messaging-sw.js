// ============================================================
// Service Worker para notificaciones push de Charla
// Este archivo DEBE estar en la raíz del repositorio de GitHub
// con el nombre exacto: firebase-messaging-sw.js
// ============================================================

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyBJkt_6EI0v9_xP-WjulFnK1SBnDaaUNUM",
  authDomain:        "charla-749e6.firebaseapp.com",
  databaseURL:       "https://charla-749e6-default-rtdb.firebaseio.com",
  projectId:         "charla-749e6",
  storageBucket:     "charla-749e6.firebasestorage.app",
  messagingSenderId: "392031189043",
  appId:             "1:392031189043:web:29d7595af6d149bde18b46"
});

const messaging = firebase.messaging();

// Mostrar notificación cuando la app está en segundo plano o cerrada
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'Charla', {
    body: body || 'Tienes un mensaje nuevo',
    icon: icon || './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'charla-message',
    renotify: true,
    data: { url: self.location.origin + self.location.pathname.replace('firebase-messaging-sw.js', 'charla-firebase.html') }
  });
});

// Al tocar la notificación, abrir la app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(clients.openWindow(url));
});
