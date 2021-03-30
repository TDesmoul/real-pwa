import consumer from "./consumer";

const initNotificationsCable = () => {

  const userIdDiv = document.querySelector("[data-user-id]");
  if (!userIdDiv) return;
  const userId = userIdDiv.dataset.userId;

  const identifier = { channel: "NotificationsChannel", id: userId };

  const subscriptions = consumer.subscriptions.subscriptions;
  const previousSub = subscriptions.find(sub => {
    const id = JSON.parse(sub.identifier);
    return id.channel === identifier.channel && id.id === identifier.id
  })
  if (previousSub) return;

  console.log("Let's subscribe to notifications channel");
  consumer.subscriptions.create(identifier, {
    received(data) {
      console.log(data)
    }
  })
}

export { initNotificationsCable };
