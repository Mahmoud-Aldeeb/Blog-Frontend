import { toast } from "react-toastify";
import { useState } from "react";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";
import "./AddCategoryForm.css";
import { useDispatch, useSelector } from "react-redux";

const AddCategoryForm = ({ onCategoryAdded, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // From Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return toast.error("Category Title is required");
    }

    setIsLoading(true);
    try {
      dispatch(createCategory({ title }));

      toast.success("Category created successfully!");
      setTitle("");

      // إذا كانت هناك دالة callback، استدعها
      if (onCategoryAdded) {
        onCategoryAdded({ title: title.trim() });
      }

      // إغلاق الفورم
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error(error.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-category-modal-overlay">
      <div className="add-category-modal">
        <div className="modal-header">
          <div className="modal-title">
            <i className="bi bi-plus-circle"></i>
            Add New Category
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="add-category-form">
          <div className="form-section">
            {/* Section 1: Basic Information فقط */}
            <div className="section-header">
              <i className="bi bi-info-circle"></i>
              <h3>Category Information</h3>
            </div>

            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <i className="bi bi-tag"></i>
                Category Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                placeholder="Enter category title (e.g., Technology, Sports)"
                className="form-input"
                disabled={isLoading}
                required
                autoFocus
              />
              <div className="char-count">{title.length}/50 characters</div>
            </div>

            {/* <div className="form-group">
                <label htmlFor="description" className="form-label">
                  <i className="bi bi-text-paragraph"></i>
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  placeholder="Add a brief description for this category..."
                  className="form-input form-textarea"
                  disabled={isLoading}
                  rows="4"
                />
                <div className="char-count">
                  {description.length}/200 characters
                </div>
              </div> */}

            <div className="form-group">
              <div className="password-note">
                <i className="bi bi-info-circle"></i>
                <span>
                  <strong>Note:</strong> Categories help organize your content.
                  Choose a clear, descriptive name.
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="action-btn cancel-btn"
              onClick={onClose}
              disabled={isLoading}
            >
              <i className="bi bi-x-circle"></i>
              Cancel
            </button>
            <button
              type="submit"
              className="action-btn submit-btn"
              onClick={formSubmitHandler}
              disabled={isLoading || !title.trim()}
            >
              {isLoading ? (
                <>
                  <i className="bi bi-hourglass-split"></i>
                  Creating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle"></i>
                  Create Category
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
