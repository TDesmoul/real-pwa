// TO DO :
// -> enrichir la fonction pour gérer les différentes actions du user (refus, fermeture de la fenètre...)

const requestNotificationPermission = () => {
  window.Notification.requestPermission().then(permission => {
    if(permission !== 'granted'){
      throw new Error('Permission not granted for Notification');
    }
  });
}

export { requestNotificationPermission };
