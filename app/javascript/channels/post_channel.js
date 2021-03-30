import consumer from "./consumer";

const initPostCable = () => {

  const postIdDiv = document.querySelector("[data-post-id]");
  if (!postIdDiv) return;
  const postId = postIdDiv.dataset.postId;

  const identifier = { channel: "PostChannel", id: postId };

  const subscriptions = consumer.subscriptions.subscriptions;
  const previousSub = subscriptions.find(sub => {
    const id = JSON.parse(sub.identifier);
    return id.channel === identifier.channel && id.id === identifier.id
  })
  if (previousSub) return;

  console.log("Let's subscribe to channel");
  consumer.subscriptions.create(identifier, {
    received(data) {
      console.log(data)
    }
  })
}

export { initPostCable };
