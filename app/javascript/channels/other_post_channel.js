import consumer from "./consumer";

const initOtherPostCable = () => {
  const postIdDiv = document.querySelector("[data-post-id]");
  if (!postIdDiv) return;
  const postId = postIdDiv.dataset.postId;

  const identifier = {
    channel: "OtherPostChannel",
    post_id: postId
  };

  const subscriptions = consumer.subscriptions.subscriptions;
  const previousSub = subscriptions.find(sub => {
    const id = JSON.parse(sub.identifier);
    return id.channel === identifier.channel && id.post_id === identifier.post_id
  })
  if (previousSub) return;

  console.log("Let's subscribe to channel");
  consumer.subscriptions.create(identifier, {
    received(data) {
      console.log(data)
    }
  })
}

export { initOtherPostCable };
