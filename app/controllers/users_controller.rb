class UsersController < ApplicationController
  # ce skip_before_action est pas terrible...
  # il faudrait trouver le moyen de faire le fetch depuis le service_worker avec un csrf_token
  # mais je n'ai pas trouver comment faire (pas réussi à utiliser "@rails/ujs", et on n'a pas
  # non plus accès au DOM dans le serive_worker)
  skip_before_action :verify_authenticity_token, only: [ :save_push_subscription ]

  def save_push_subscription
    # subscription = {}
    # subscription[:endpoint] = subscription_endpoint
    # subscription[:keys] = subscription_keys
    # current_user.push_subscription = subscription
    current_user.push_subscription = subscription_params
    current_user.save
    render json: "endpoint & keys save!".to_json
  end

  private

  def subscription_params
    params.permit(:endpoint).merge(params.require(:keys).permit(:p256dh, :auth))
  end

  # def subscription_endpoint
  #   params.permit(:endpoint)
  # end

  # def subscription_keys
  #   params.require(:keys).permit(:p256dh, :auth)
  # end
end
