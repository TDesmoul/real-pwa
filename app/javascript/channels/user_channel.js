import consumer from "./consumer";

const initUserCable = () => {
  const userIdDiv = document.querySelector("[data-user-id]");
  if (!userIdDiv) return;
  const userId = userIdDiv.dataset.userId;

  const identifier = {
    channel: "UserChannel",
    post_id: userId
  };

  const subscriptions = consumer.subscriptions.subscriptions;
  const previousSub = subscriptions.find(sub => {
    const id = JSON.parse(sub.identifier);
    return id.channel === identifier.channel && id.post_id === identifier.post_id
  })
  if (previousSub) return;

  console.log("Let's subscribe to user channel");
  consumer.subscriptions.create(identifier, {
    received(data) {
      console.log(data)
    }
  })
}

export { initUserCable };
