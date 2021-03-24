// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
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

self.addEventListener('install', function(event) {
  console.log('Hello from install eventListener.');
});

self.addEventListener('activate', async function(event) {
  console.log('Hello from active eventListener');
  console.log('33333');
  const applicationServerKey = urlB64ToUint8Array('BHNqtdbMU7Y6d6YceCVHdpa7hNUISJqRjtT30QF9sEiYeqxml87_cN4Qd1gAm3_bO9LqcxtgzDrm0c2QA23KHgg');
  const options = { applicationServerKey, userVisibleOnly: true }

  self.registration.pushManager.subscribe(options)
  .catch(err => console.log("Error", err))
  .then(subscription => {
    console.log(subscription);
    console.log(subscription.toJSON());

    fetch('/save_push_subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(subscription)
    })
    .then(response => response.json())
    .then(data => console.log(data))
  })
});

self.addEventListener('fetch', function(event) {
  // console.log('Service Worker fetching.');
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'PONG!!!';
  const options = {
    body: event.data.text(),
    // here you can add more properties like icon, image, vibrate, etc.
  };

  event.waitUntil(self.registration.showNotification(title, options));
})



