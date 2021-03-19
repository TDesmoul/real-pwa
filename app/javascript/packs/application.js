require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// External imports
import "bootstrap";

import { setUpForPushNotifications } from "../components/set_up_for_push_notifications";

document.addEventListener('turbolinks:load', () => {
  setUpForPushNotifications();
});
