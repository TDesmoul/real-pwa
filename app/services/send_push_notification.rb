class SendPushNotification
  attr_accessor :endpoint, :p256dh, :auth

  def initialize(message, user)
    @message = message
    @user = user
    @vapid = {
      subject: "Test subject",
      public_key: ENV['VAPID_PUBLIC'],
      private_key: ENV['VAPID_PRIVATE']
    }
  end

  def call
    Webpush.payload_send(
      message: @message,
      endpoint: endpoint,
      p256dh: p256dh,
      auth: auth,
      vapid: @vapid,
      # ssl_timeout: 5, # value for Net::HTTP#ssl_timeout=, optional
      # open_timeout: 5, # value for Net::HTTP#open_timeout=, optional
      # read_timeout: 5 # value for Net::HTTP#read_timeout=, optional
    )
  end

  def endpoint
    @user.push_subscription["endpoint"]
  end

  def p256dh
    @user.push_subscription["p256dh"]
  end

  def auth
    @user.push_subscription["auth"]
  end
end
