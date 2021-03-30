require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// External imports
import "bootstrap";

import { activatePushNotifications, deactivatePushNotifications } from "../components/push_notifications";

import { initHelloCable } from "../channels/hello_channel";
import { initPostCable } from "../channels/post_channel";
import { initOtherPostCable } from "../channels/other_post_channel";
import { initNotificationsCable } from "../channels/notifications_channel";
import { initUserCable } from "../channels/user_channel";

// on register au service-worker dès le chargement de la window
// le fait de register plusieur fois (à chaque window.load) n'est pas génant
// après vérification => lorsque le service-worker est mis à jour,
//                       la subscription au pushManager est conservée.
window.addEventListener('load', () => {
  navigator.serviceWorker.register('/service-worker.js')
  .catch(registrationError => {
    console.log('Service worker registration failed: ', registrationError);
  })
})

document.addEventListener('turbolinks:load', () => {
  activatePushNotifications();
  deactivatePushNotifications();

  initHelloCable();
  initPostCable();
  initOtherPostCable();
  initNotificationsCable();
  initUserCable();
});
