class PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy broadcast ]

  # GET /posts or /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1 or /posts/1.json
  def show
    ActionCable.server.broadcast("hello_world", message: "Salutation de post_controller#show")
  end

  def broadcast
    PostChannel.broadcast_to(@post, message: "Salutation de post_controller#broadcast pour PostChannel")
    ActionCable.server.broadcast("post_#{@post.id}", message: "Salutation de post_controller#broadcast pour OtherPostChannel 1")
    # OtherPostChannel.broadcast_to("post_#{@post.id}", message: "Salutation de post_controller#broadcast pour OtherPostChannel 2")
    NotificationsChannel.broadcast_to(current_user, message: "Salutation de post_controller#broadcast pour NorificationsChannel")
    ActionCable.server.broadcast("user_#{current_user.id}", message: "Salutation de post_controller#broadcast pour UserChannel")
    redirect_to post_path(@post)
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: "Post was successfully created." }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: "Post was successfully updated." }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :content)
    end
end
