class HelloChannel < ApplicationCable::Channel
  def subscribed
    stream_from "hello_world"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
