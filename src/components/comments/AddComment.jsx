import { useState } from "react";
import { toast } from "react-toastify";
import "./add-comment.css";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");

    toast.success("Comment added successfully!");
    dispatch(createComment({ text, postId }));
    setText("");
  };

  return (
    <div className="add-comment-container">
      <div className="comment-header">
        <div className="comment-header-icon">
          <i className="bi bi-chat-left-dots-fill"></i>
        </div>
        <div className="comment-header-text">
          <h4>Add a Comment</h4>
          <p>Share your thoughts with the community</p>
        </div>
      </div>

      <form onSubmit={formSubmitHandler} className="add-comment-form">
        <div className={`comment-input-wrapper ${isFocused ? "focused" : ""}`}>
          <textarea
            placeholder="Write your comment here..."
            className="comment-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows="4"
          />

          <div className="textarea-decoration">
            <div className="decoration-line line-1"></div>
            <div className="decoration-line line-2"></div>
          </div>
        </div>

        <div className="comment-form-footer">
          <div className="comment-hints">
            <div className="hint-item">
              <i className="bi bi-type"></i>
              <span>Markdown supported</span>
            </div>
            <div className="hint-item">
              <i className="bi bi-emoji-smile"></i>
              <span>Be respectful</span>
            </div>
          </div>

          <button
            type="submit"
            className="submit-comment-btn"
            disabled={!text.trim()}
          >
            <span className="btn-text">Post Comment</span>
            <i className="bi bi-send-fill"></i>
            <div className="btn-glow"></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
