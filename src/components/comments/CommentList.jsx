import { useState } from "react";
import "./comment-list.css";
import UpdateCommentModal from "./UpdateCommentModal";
import swal from "sweetalert";
import { formatDistanceToNow } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteComment,
  toggleLikeComment,
} from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="comments-list-container">
      <div className="comments-header">
        <h3 className="comments-title">
          <i className="bi bi-chat-left-text-fill"></i>
          Community Comments
        </h3>
        <div className="comments-stats">
          <div className="stat-item">
            <i className="bi bi-chat-square-dots"></i>
            <span>{comments?.length} Comments</span>
          </div>
          {/* <div className="stat-item">
            <i className="bi bi-sort-down"></i>
            <span>Sort by: Newest</span>
          </div> */}
        </div>
      </div>

      <div className="comments-list">
        {comments?.length === 0 ? (
          <div className="no-comments">
            <div className="no-comments-icon">
              <i className="bi bi-chat-left"></i>
            </div>
            <h4>No Comments Yet</h4>
            <p>Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments?.map((comment) => (
            <div key={comment?._id} className="comment-item">
              <div className="comment-decoration">
                <div className="comment-line"></div>
              </div>

              <div className="comment-header">
                <div className="comment-user-info">
                  <div className="user-avatar">
                    <img
                      // src={user?.profilePhoto?.url}
                      src={comment?.profilePhoto}
                      alt={comment?.username}
                    />
                    <div className="user-status"></div>
                  </div>
                  <div className="user-details">
                    <h4 className="user-name">{comment?.username}</h4>
                    <div className="user-meta">
                      {/* <span className="user-role">{comment?.text}</span> */}
                      <span className="comment-time">
                        <i className="bi bi-clock"></i>
                        {formatDistanceToNow(new Date(comment?.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="comment-actions">
                  <button
                    // className={`like-btn ${
                    //   comment.likes.length === 0 ? "liked" : ""
                    // }`}
                    className={`like-btn ${
                      comment?.likes.includes(user?._id) ? "liked" : ""
                    }`}
                    onClick={() => dispatch(toggleLikeComment(comment?._id))}
                  >
                    <i
                      className={`bi ${
                        comment?.likes.includes(user?._id)
                          ? "bi-heart-fill"
                          : "bi-heart"
                      }`}
                    ></i>
                    <span>{comment?.likes.length} Likes</span>
                  </button>

                  {/* <button
                    className="reply-btn"
                    // onClick={() => handleReplyComment(comment.id)}
                  >
                    <i className="bi bi-reply-fill"></i>
                    Reply
                  </button> */}
                </div>
              </div>

              <div className="comment-content">
                <p>{comment?.text}</p>
              </div>

              {user?._id === comment?.user && (
                <div className="comment-footer">
                  <div className="comment-controls">
                    <button
                      className="edit-btn"
                      onClick={() => updateCommentHandler(comment)}
                    >
                      <i className="bi bi-pencil-square"></i>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCommentHandler(comment?._id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
