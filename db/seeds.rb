Post.destroy_all
User.destroy_all

5.times do |i|
  Post.create!(title: "Post #{i}", content: 'A lot of stuff')
end

User.create!(email: "bob@mail.com", password: "123456")
