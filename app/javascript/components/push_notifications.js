const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// evoie les informations d'une subscription à /save_push_subscription
const sendSubscriptionToBackend = (subscription) => {
  fetch('/save_push_subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(subscription)
  })
  .then(response => response.json())
  .then(data => console.log(data))
}

// fait le subscribe au pushManager
const subscribeToPushManager = () => {
  console.log("Let's subscribe to pushManager...");
  navigator.serviceWorker.register('/service-worker.js')
  .then(registration => {
    const options = {
      applicationServerKey: urlB64ToUint8Array('BHNqtdbMU7Y6d6YceCVHdpa7hNUISJqRjtT30QF9sEiYeqxml87_cN4Qd1gAm3_bO9LqcxtgzDrm0c2QA23KHgg'),
      userVisibleOnly: true
    }
    registration.pushManager.subscribe(options)
    .catch(err => console.log("Error", err))
    .then(subscription => sendSubscriptionToBackend(subscription))
  })
}

// kill la subscription au pushManager
const unsubscribeFromPushManager = () => {
  console.log("Let's unsubscribe from pushManager...");
  navigator.serviceWorker.register('/service-worker.js')
  .then(registration => {
    registration.pushManager.getSubscription()
    .then(subscription => subscription.unsubscribe())
  });
}

// écoute le click sur le bouton "activer les notifications"
// demande la permission de notifier (navigateur)
// lance le subscribe au pushManager
const activatePushNotifications = () => {
  const notificationsBtn = document.getElementById('notifications-on');
  if (!notificationsBtn) return;

  notificationsBtn.addEventListener('click', (event) => {
    event.preventDefault();

    console.log("Let's ask permission for notifications...");
    window.Notification.requestPermission()
    .then(permission => {
      if (permission !== 'granted') return;
      console.log("Permission granted!");
      subscribeToPushManager();
    });
  })
}

// écoute le click sur le bouton "désactiver les notifications"
// lance le unsubscribe du pushManager
const deactivatePushNotifications = () => {
  const notificationsBtn = document.getElementById('notifications-off');
  if (!notificationsBtn) return;

  notificationsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    unsubscribeFromPushManager();
  });
}

export { activatePushNotifications, deactivatePushNotifications, sendSubscriptionToBackend };
