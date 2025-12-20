import "./update-post-modal.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  const [loading, setLoading] = useState(false);

  // From Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !category) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      dispatch(updatePost({ title, description, category }, post?._id));
      setUpdatePost(false);
    } catch (error) {
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  // Handle close modal
  const handleCloseModal = () => {
    setUpdatePost(false);
  };

  return (
    <div className="update-post-modal-overlay">
      <div className="update-post-modal-container">
        <div className="modal-backdrop" onClick={handleCloseModal}></div>

        <div className="update-post-modal">
          <div className="modal-header">
            <div className="modal-header-content">
              <div className="modal-icon">
                <i className="bi bi-pencil-square"></i>
              </div>
              <div className="modal-title-section">
                <h2 className="modal-title">Edit Post</h2>
                <p className="modal-subtitle">Update your post information</p>
              </div>
            </div>

            <button className="modal-close-btn" onClick={handleCloseModal}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <form onSubmit={formSubmitHandler} className="update-post-form">
            {/* Title Input */}
            <div className="form-group">
              <label className="form-label">
                <i className="bi bi-card-heading"></i>
                Post Title
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  required
                />
                <div className="input-decoration"></div>
              </div>
            </div>

            {/* Category Select */}
            <div className="form-group">
              <label className="form-label">
                <i className="bi bi-tag"></i>
                Category
              </label>
              <div className="select-wrapper">
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">
                  <i className="bi bi-chevron-down"></i>
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="form-group">
              <label className="form-label">
                <i className="bi bi-card-text"></i>
                Description
              </label>
              <div className="textarea-wrapper">
                <textarea
                  className="form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your post description..."
                  rows="6"
                  required
                />
                <div className="textarea-counter">
                  <span>{description.length}</span>/<span>2000</span>
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
                    Update Post
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

export default UpdatePostModal;
