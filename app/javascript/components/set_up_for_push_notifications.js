// TO DO :
// -> la fonction n'est exécutée que sur la home (cf. if statement) : il faudrait la
//    déclencher lorsque l'utilisateur clique sur un bouton "activer les notifications" (c'est
//    une bonne pratique pour les push notifications)

const setUpForPushNotifications = () => {
  // uniquement sur la home page (path = '/')
  if (window.location.pathname === "/") {
    console.log("Let's set up push notifications...");

    window.Notification.requestPermission()
    .then(permission => {
      if (permission !== 'granted') return;
      navigator.serviceWorker.register('/service-worker.js')
      .catch(registrationError => {
        console.log('Service worker registration failed: ', registrationError);
      })
    });
  };

}

export { setUpForPushNotifications };
