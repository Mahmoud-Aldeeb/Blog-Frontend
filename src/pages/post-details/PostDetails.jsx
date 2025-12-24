import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import "./post-details.css";
import UpdatePostModal from "./UpdatePostModal";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  // const post = posts.find((p) => p._id === parseInt(id));

  const [updatePost, setUpdatePost] = useState(false);
  const [file, setFile] = useState(null);
  // const [likes, setLikes] = useState(post.likes?.length || 0);
  // const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const navigate = useNavigate();

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      } else {
        swal("Action cancelled!");
      }
    });
  };

  // Handle Like
  // const handleLike = () => {
  //   if (isLiked) {
  //     setLikes((prev) => prev - 1);
  //     setIsLiked(false);
  //   } else {
  //     setLikes((prev) => prev + 1);
  //     setIsLiked(true);
  //   }
  // };

  return (
    <div className="post-details-wrapper page-wrapper">
      <div className="post-details-container">
        {/* Post Hero Section */}
        <div className="post-hero-section">
          <div className="post-image-container">
            <img
              src={file ? URL.createObjectURL(file) : post?.image.url}
              alt={post?.title}
              className="post-hero-image"
            />

            {user?._id === post?.user?._id && (
              <form
                onSubmit={updateImageSubmitHandler}
                className="image-upload-form"
              >
                <label htmlFor="file" className="image-upload-label">
                  <div className="upload-icon-wrapper">
                    <i className="bi bi-cloud-arrow-up-fill"></i>
                  </div>
                  <span>Change Image</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                {file && (
                  <button type="submit" className="upload-submit-btn">
                    <i className="bi bi-check-circle-fill"></i>
                    Upload
                  </button>
                )}
              </form>
            )}
          </div>

          {/* Category Badge */}
          <div className="post-category-badge">
            <Link to={`/posts/categories/${post?.category}`}>
              {post?.category}
            </Link>
          </div>
        </div>

        {/* Post Content */}
        <div className="post-content-container">
          {/* Post Header */}
          <div className="post-header">
            <div className="post-meta">
              <div className="post-date">
                <i className="bi bi-calendar3"></i>
                <span>{new Date(post?.createdAt).toDateString()}</span>
              </div>
              <div className="post-read-time">
                <i className="bi bi-clock"></i>
                <span>5 min read</span>
              </div>
            </div>

            <div className="author-section">
              <div className="author-avatar">
                <img src={user?.profilePhoto?.url} alt={post?.user.username} />
              </div>
              <div className="author-info">
                <Link
                  to={`/profile/${post?.user?._id}`}
                  className="author-name"
                >
                  {post?.user.username}
                </Link>
                <span className="author-bio">Writer & Content Creator</span>
              </div>
            </div>
          </div>

          {/* Post Description */}
          <div className="post-description">
            <h1 className="post-title">Title: {post?.title}</h1>
            <p>{post?.description}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              quis a omnis aut sit earum atque eveniet ratione sint animi illo
              id accusamus obcaecati dolore voluptatibus aperiam qui, provident
              fuga? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <p>
              Quibusdam neque odit soluta? Fugiat, dolores! Laboriosam rem quod,
              explicabo similique aliquam unde sed vel distinctio, fugiat ab
              aperiam odio nesciunt quas?
            </p>
          </div>

          {/* Post Actions */}
          <div className="post-actions">
            <div className="like-section">
              {user && (
                <button
                  className={`like-btn ${
                    post?.likes.includes(user?._id) ? "liked" : ""
                  }`}
                  onClick={() => dispatch(toggleLikePost(post?._id))}
                >
                  <i
                    className={`bi ${
                      post?.likes.includes(user?._id)
                        ? "bi-heart-fill"
                        : "bi-heart"
                    }`}
                  ></i>
                  <span>{post?.likes.length} Likes</span>
                </button>
              )}

              {/* <div className="share-section">
                <span>Share:</span>
                <div className="share-icons">
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-twitter"></i>
                  <i className="bi bi-linkedin"></i>
                  <i className="bi bi-link-45deg"></i>
                </div>
              </div> */}
            </div>

            {user?._id === post?.user?._id && (
              <div className="post-controls">
                <button
                  className="edit-btn"
                  onClick={() => setUpdatePost(true)}
                >
                  <i className="bi bi-pencil-square"></i>
                  Edit
                </button>
                <button className="delete-btn" onClick={deletePostHandler}>
                  <i className="bi bi-trash-fill"></i>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section-wrapper">
        <div className="comments-header">
          <h3>
            <i className="bi bi-chat-left-text"></i>
            Comments
          </h3>
          <div className="comments-count">
            <i className="bi bi-chat-square-dots"></i>
            <span>{post?.comments?.length || 0} Comments</span>
          </div>
        </div>

        {user ? (
          <AddComment postId={post?._id} />
        ) : (
          <p>Please log in to add a comment.</p>
        )}
        <CommentList comments={post?.comments} />
      </div>

      {/* Related Posts Section */}
      <div className="related-posts-section">
        <div className="section-header">
          <h3 className="section-title">
            <i className="bi bi-newspaper"></i>
            You Might Also Like
          </h3>
          <Link to="/posts" className="view-all-link">
            View All
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>

      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </div>
  );
};

export default PostDetails;
