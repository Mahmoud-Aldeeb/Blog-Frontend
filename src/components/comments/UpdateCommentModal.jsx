import "./update-comment-modal.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModal = ({ setUpdateComment, commentForUpdate }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(commentForUpdate?.text);
  const [loading, setLoading] = useState(false);

  // Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      return toast.error("Please enter your comment");
    }

    setLoading(true);
    try {
      dispatch(updateComment(commentForUpdate._id, { text }));

      // Close modal after success
      setUpdateComment(false);
    } catch (error) {
      toast.error("Failed to update comment");
    } finally {
      setLoading(false);
    }
  };

  // Handle close modal
  const handleCloseModal = () => {
    setUpdateComment(false);
  };

  return (
    <div className="update-comment-modal-overlay">
      <div className="update-comment-modal-container">
        <div className="modal-backdrop" onClick={handleCloseModal}></div>

        <div className="update-comment-modal">
          <div className="modal-header">
            <div className="modal-header-content">
              <div className="modal-icon">
                <i className="bi bi-chat-left-dots"></i>
              </div>
              <div className="modal-title-section">
                <h2 className="modal-title">Edit Comment</h2>
                <p className="modal-subtitle">Update your comment</p>
              </div>
            </div>

            <button className="modal-close-btn" onClick={handleCloseModal}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <form onSubmit={formSubmitHandler} className="update-comment-form">
            {/* Comment Input */}
            <div className="form-group">
              <label className="form-label">
                <i className="bi bi-pencil"></i>
                Your Comment
              </label>
              <div className="textarea-wrapper">
                <textarea
                  className="form-textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Update your comment..."
                  rows="4"
                  required
                />
                <div className="textarea-counter">
                  <span>{text.length}</span>/<span>500</span>
                </div>
                <div className="textarea-decoration">
                  <div className="decoration-line"></div>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="comment-tips">
              <div className="tips-title">
                <i className="bi bi-lightbulb"></i>
                Quick Tips
              </div>
              <div className="tips-list">
                <div className="tip-item">
                  <i className="bi bi-check-circle"></i>
                  <span>Be constructive and respectful</span>
                </div>
                <div className="tip-item">
                  <i className="bi bi-check-circle"></i>
                  <span>Keep it relevant to the post</span>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCloseModal}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="update-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle"></i>
                    Update Comment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
