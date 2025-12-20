import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  fetchAllComments,
} from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  // const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedComments, setSelectedComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAllComments());
    setLoading(false);
  }, [dispatch]);

  const filteredComments = comments.filter(
    (comment) =>
      comment?.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment?.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const toggleSelectComment = (id) => {
  //   setSelectedComments((prev) =>
  //     prev.includes(id)
  //       ? prev.filter((commentId) => commentId !== id)
  //       : [...prev, id]
  //   );
  // };

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Delete Comment?",
      text: "This action cannot be undone. The comment will be permanently removed.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  // const toggleCommentStatus = (id, currentStatus) => {
  //   // setComments(
  //   //   comments.map((comment) =>
  //   //     comment.id === id
  //   //       ? {
  //   //           ...comment,
  //   //           status: currentStatus === "active" ? "flagged" : "active",
  //   //         }
  //   //       : comment
  //   //   )
  //   // );
  //   toast.info(
  //     `Comment ${currentStatus === "active" ? "flagged" : "activated"}`
  //   );
  // };

  // const deleteSelectedComments = () => {
  //   if (selectedComments.length === 0) {
  //     toast.warning("Please select comments to delete");
  //     return;
  //   }

  //   swal({
  //     title: "Delete Multiple Comments?",
  //     text: `You are about to delete ${selectedComments.length} comments. This action cannot be undone!`,
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       // setComments(
  //       //   comments.filter((comment) => !selectedComments.includes(comment.id))
  //       // );
  //       setSelectedComments([]);
  //       toast.success(`${selectedComments.length} comments deleted!`);
  //     }
  //   });
  // };

  return (
    <div className="admin-table-wrapper main-content">
      <AdminSidebar />
      <div className="admin-table-container">
        {/* Header */}
        <div className="table-header">
          <div className="header-content">
            <h1 className="table-title">
              <i className="bi bi-chat-left-text"></i>
              Comments Management
            </h1>
            <p className="table-subtitle">Manage and moderate user comments</p>
          </div>
          {/* <div className="header-actions">
            {comments.length > 0 && (
              <button
                className="delete-selected-btn"
                onClick={deleteSelectedComments}
              >
                <i className="bi bi-trash"></i>
                Delete Selected ({selectedComments.length})
              </button>
            )}
          </div> */}
        </div>

        {/* Filters and Stats */}
        <div className="table-controls">
          <div className="search-container">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            <button className="filter-btn active">
              All ({comments.length})
            </button>
            <button className="filter-btn">
              Active ({comments.filter((c) => c.status === "active").length})
            </button>
            <button className="filter-btn">
              Flagged ({comments.filter((c) => c.status === "flagged").length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading comments...</p>
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-chat-left"></i>
              <h3>No comments found</h3>
              <p>Try adjusting your search</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>count</th>
                  <th>User</th>
                  <th>Comment</th>
                  {/* <th>Post</th> */}
                  {/* <th>Status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.map((comment, index) => (
                  <tr key={comment.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="user-cell">
                        <img
                          src={comment?.user.profilePhoto.url}
                          alt={comment?.user?.username}
                          className="user-avatar"
                        />
                        <div className="user-info">
                          <span className="user-name">
                            {comment?.user.username}
                          </span>
                          {/* <span className="user-role">
                            {comment?.user?.role}
                          </span> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="comment-cell">
                        <p className="comment-content">{comment?.text}</p>
                        <div className="comment-meta">
                          <span className="comment-likes">
                            <i className="bi bi-heart-fill"></i>
                            {comment?.likes}
                          </span>
                          <span className="comment-time">
                            <i className="bi bi-clock"></i>
                            {comment?.createdAt}
                          </span>
                        </div>
                      </div>
                    </td>
                    {/* <td>
                      <div className="post-cell">
                        <i className="bi bi-journal-text"></i>
                        <span className="post-title">{comment?.post}</span>
                      </div>
                    </td> */}
                    {/* <td>
                      <span className={`status-badge ${comment?.status}`}>
                        <i
                          className={`bi bi-${
                            comment.status === "active"
                              ? "check-circle"
                              : "flag"
                          }`}
                        ></i>
                        {comment?.status === "active" ? "Active" : "Flagged"}
                      </span>
                    </td> */}
                    <td>
                      <div className="action-buttons">
                        {/* <button
                          className={`status-btn ${
                            comment?.status === "active"
                              ? "flag-btn"
                              : "activate-btn"
                          }`}
                          onClick={() =>
                            toggleCommentStatus(comment.id, comment.status)
                          }
                        >
                          <i
                            className={`bi bi-${
                              comment?.status === "active"
                                ? "flag"
                                : "check-circle"
                            }`}
                          ></i>
                          {comment?.status === "active" ? "Flag" : "Activate"}
                        </button> */}
                        <button
                          className="view-btn"
                          onClick={() =>
                            toast.info("View comment feature coming soon!")
                          }
                        >
                          <i className="bi bi-eye"></i>
                          View
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteCommentHandler(comment?._id)}
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
          )}

          {/* Pagination */}
          {/* {filteredComments.length > 0 && (
            <div className="table-footer">
              <div className="pagination-info">
                Showing 1-{filteredComments.length} of {comments.length}{" "}
                comments
              </div>
              <div className="pagination-controls">
                <button className="pagination-btn" disabled>
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CommentsTable;
