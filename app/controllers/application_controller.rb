class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  after_action :broadcast_hello

  def broadcast_hello
    ActionCable.server.broadcast("hello_world", message: "Salutation de broadcast_hello")
  end
end
