Rails.application.routes.draw do
  devise_for :users
  root to: 'posts#index'

  post :save_push_subscription, to: 'users#save_push_subscription'
  resources :posts do
    member do
      get :broadcast
    end
  end

end
