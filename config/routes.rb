Rails.application.routes.draw do
  resources :posts
  devise_for :users
  root to: 'posts#index'

  post :save_push_subscription, to: 'users#save_push_subscription'
end
