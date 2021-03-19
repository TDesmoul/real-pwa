class AddPushSubscriptionToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :push_subscription, :jsonb
  end
end
