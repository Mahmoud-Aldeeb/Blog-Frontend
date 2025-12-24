import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getPostsCount,
  deletePost,
} from "../../redux/apiCalls/postApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { postsCount } = useSelector((state) => state.post);
  const { posts } = useSelector((state) => state.post);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(getAllPosts());
    dispatch(getPostsCount());
    setLoading(false);
  }, [dispatch]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletePostHandler = (postId) => {
    swal({
      title: "Delete Post?",
      text: "This action cannot be undone. The post and all its comments will be permanently removed.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId));
      }
    });
  };

  return (
    <div className="admin-table-wrapper main-content">
      <AdminSidebar />
      <div className="admin-table-container">
        {/* Header */}
        <div className="table-header">
          <div className="header-content">
            <h1 className="table-title">
              <i className="bi bi-journal-text"></i>
              Posts Management
            </h1>
            <p className="table-subtitle">Manage and monitor all posts</p>
          </div>
          <div className="header-actions">
            <Link to="/posts/create-post" className="create-btn">
              <i className="bi bi-plus-circle"></i>
              New Post
            </Link>
          </div>
        </div>

        {/* Filters and Stats */}
        <div className="table-controls">
          <div className="search-container">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="stats-container">
            <div className="stat-item">
              <i className="bi bi-journal-text"></i>
              <span>Total: {postsCount}</span>
            </div>
            <div className="stat-item">
              <i className="bi bi-filter-circle"></i>
              <span>Showing: {filteredPosts.length} posts</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-journal-x"></i>
              <h3>No posts found</h3>
              <p>Try adjusting your search or create a new post</p>
            </div>
          ) : (
            <>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Count</th>
                    <th>Post</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post, index) => (
                    <tr key={post._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="post-cell">
                          <div className="post-info">
                            <h4 className="post-title">{post?.title}</h4>
                            <div className="post-meta">
                              <span className="post-date">
                                <i className="bi bi-calendar"></i>
                                {new Date(post?.createdAt).toDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="author-cell">
                          <img
                            src={post?.user?.profilePhoto.url}
                            alt={post?.user.username}
                            className="author-avatar"
                          />
                          <div className="author-info">
                            <span className="author-name">
                              {post?.user.username}
                            </span>
                            <span className="author-role">Author</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-badge">{post.category}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/posts/details/${post._id}`}
                            className="view-btn"
                          >
                            <i className="bi bi-eye"></i>
                            View
                          </Link>
                          <button
                            className="delete-btn"
                            onClick={() => deletePostHandler(post._id)}
                          >
                            <i className="bi bi-trash"></i>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsTable;
