import { useState } from "react";
import "./comment-list.css";
import UpdateCommentModal from "./UpdateCommentModal";
import swal from "sweetalert";
import { formatDistanceToNow } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // const [likedComments, setLikedComments] = useState({});
  // const [comments, setComments] = useState([
  //   {
  //     id: 1,
  //     user: {
  //       name: "Youssef Abbas",
  //       avatar: "/images/user-avatar.png",
  //       role: "Community Member",
  //     },
  //     content:
  //       "This is an amazing post! I really enjoyed reading it and learned a lot about the topic. Looking forward to more content like this.",
  //     time: "4 hours ago",
  //     likes: 12,
  //     isLiked: false,
  //   },
  //   {
  //     id: 2,
  //     user: {
  //       name: "Sarah Johnson",
  //       avatar: "/images/user-avatar-2.png",
  //       role: "Verified Writer",
  //     },
  //     content:
  //       "Great insights! The points about modern web development are spot on. I particularly liked the section about performance optimization.",
  //     time: "1 day ago",
  //     likes: 8,
  //     isLiked: true,
  //   },
  //   {
  //     id: 3,
  //     user: {
  //       name: "Michael Chen",
  //       avatar: "/images/user-avatar-3.png",
  //       role: "Software Engineer",
  //     },
  //     content:
  //       "Could you elaborate more on the implementation details? I'd love to see some code examples for better understanding.",
  //     time: "2 days ago",
  //     likes: 5,
  //     isLiked: false,
  //   },
  // ]);

  // Delete Comment Handler

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
                      src={user?.profilePhoto?.url}
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
                    className={`like-btn ${comment.isLiked ? "liked" : ""}`}
                    // onClick={() => handleLikeComment(comment.id)}
                  >
                    <i
                      className={`bi ${
                        comment.isLiked ? "bi-heart-fill" : "bi-heart"
                      }`}
                    ></i>
                    <span>{comment.likes}</span>
                  </button>

                  <button
                    className="reply-btn"
                    // onClick={() => handleReplyComment(comment.id)}
                  >
                    <i className="bi bi-reply-fill"></i>
                    Reply
                  </button>
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

              {/* Nested Comments (Example) */}
              {/* {comment?._id === 1 && (
                <div className="nested-comments">
                  <div className="nested-comment">
                    <div className="nested-user-avatar">
                      <img src="/images/user-avatar-4.png" alt="Admin" />
                    </div>
                    <div className="nested-comment-content">
                      <div className="nested-comment-header">
                        <span className="nested-user-name">Admin</span>
                        <span className="nested-comment-time">2 hours ago</span>
                      </div>
                      <p>
                        Thanks for your feedback! Glad you enjoyed the post.
                      </p>
                    </div>
                  </div>
                </div>
              )} */}
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
