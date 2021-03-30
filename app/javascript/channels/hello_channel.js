import consumer from "./consumer";

const initHelloCable = () => {
  const identifier = { channel: "HelloChannel" };

  const subscriptions = consumer.subscriptions.subscriptions;
  const previousSub = subscriptions.find(sub => {
    const id = JSON.parse(sub.identifier);
    return id.channel === identifier.channel
  })
  if (previousSub) return;

  consumer.subscriptions.create({ channel: "HelloChannel" }, {
    received(data) {
      console.log(data)
    }
  })
}

export { initHelloCable };
