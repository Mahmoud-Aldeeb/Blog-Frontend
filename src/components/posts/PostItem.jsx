import { Link } from "react-router-dom";
import "./PostItem.css";
import { useSelector } from "react-redux";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="post-item">
      <div className="post-item-inner">
        {/* Post Image with Hover Effect */}
        <div className="post-item-image-container">
          <img
            src={post?.image.url}
            alt={post?.title}
            className="post-item-image"
          />
          <div className="image-overlay">
            <div className="overlay-content">
              <i className="bi bi-eye-fill"></i>
              <span>View Post</span>
            </div>
          </div>
          <div className="post-category-badge">
            <Link to={`/posts/categories/${post?.category}`}>
              {post?.category}
            </Link>
          </div>
        </div>

        {/* Post Content */}
        <div className="post-item-content">
          {/* Post Meta */}
          <div className="post-meta">
            <div className="post-author">
              <div className="author-avatar">
                {/* <i className="bi bi-person-circle"></i> */}
                <img
                  src={post?.user?.profilePhoto?.url || user?.profilePhoto?.url}
                  alt={post?.title}
                  className="post-item-image"
                />
              </div>
              <div className="author-info">
                <span className="author-label">Written by</span>
                <Link
                  // to={`/profile/${post?.user?._id}`}
                  to={profileLink}
                  className="author-name"
                >
                  {username ? username : post?.user?.username}
                </Link>
              </div>
            </div>
            <div className="post-date">
              <i className="bi bi-calendar3"></i>
              <span>{new Date(post?.createdAt).toDateString()}</span>
            </div>
          </div>

          {/* Post Title */}
          <h3 className="post-item-title">
            <Link to={`/posts/details/${post?._id}`}>{post?.title}</Link>
          </h3>

          {/* Post Description */}
          <p className="post-item-description">
            {post?.description.length > 150
              ? `${post?.description.substring(0, 150)}...`
              : post?.description}
          </p>

          {/* Post Stats */}
          <div className="post-stats">
            <div className="stat-item">
              <i className="bi bi-heart-fill"></i>
              <span>{post?.likes?.length || 0}</span>
            </div>
            <div className="stat-item">
              <i className="bi bi-chat-left-fill"></i>
              <span>{post?.comments?.length || 0}</span>
            </div>
          </div>

          {/* Read More Button */}
          <div className="post-actions">
            <Link to={`/posts/details/${post?._id}`} className="read-more-btn">
              <span>Read More</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="post-decoration">
          <div className="decoration-dot dot-1"></div>
          <div className="decoration-dot dot-2"></div>
          <div className="decoration-line"></div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
