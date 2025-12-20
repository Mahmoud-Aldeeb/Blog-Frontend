import "./create-post.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { fetchCategory } from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file change with preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (title.trim() === "") {
      return toast.error("Post Title is required");
    }
    if (category.trim() === "") {
      return toast.error("Please select a category");
    }
    if (description.trim() === "") {
      return toast.error("Post Description is required");
    }
    if (!file) {
      return toast.error("Post Image is required");
    }

    // setLoading(true);
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      dispatch(createPost(formData));

      console.log({ title, category, description, file });

      // Success message
      toast.success("Post created successfully!");

      // if (isPostCreated) {
      //   navigate("/");
      // }
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div className="create-post-wrapper main-app-wrapper main-content">
      <div className="create-post-container">
        {/* Left Side - Form */}
        <div className="create-post-form-section">
          <div className="form-header">
            <div className="header-icon">
              <i className="bi bi-plus-circle-fill"></i>
            </div>
            <div className="header-content">
              <h1 className="create-post-title">Create New Post</h1>
              <p className="create-post-subtitle">
                Share your thoughts with the community
              </p>
            </div>
          </div>

          <form onSubmit={formSubmitHandler} className="create-post-form">
            {/* Title Input */}
            <div className="form-group">
              <label className="form-label">
                <i className="bi bi-card-heading"></i>
                Post Title
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter a compelling title"
                  className="create-post-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  className="create-post-select"
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
                  placeholder="Write your post content here..."
                  className="create-post-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="6"
                  required
                />
                <div className="textarea-counter">
                  <span>{description.length}</span>/<span>2000</span>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label className="form-label">
                <i className="bi bi-image"></i>
                Featured Image
              </label>
              <div className="file-upload-wrapper">
                <label htmlFor="file" className="file-upload-label">
                  <div className="upload-icon">
                    <i className="bi bi-cloud-arrow-up"></i>
                  </div>
                  <div className="upload-text">
                    <span className="upload-title">Click to upload</span>
                    <span className="upload-subtitle">
                      PNG, JPG, WEBP up to 5MB
                    </span>
                  </div>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="create-post-file"
                  required
                />

                {previewImage && (
                  <div className="image-preview">
                    <img src={previewImage} alt="Preview" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => {
                        setFile(null);
                        setPreviewImage(null);
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="create-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle"></i>
                    Create Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Preview */}
        <div className="create-post-preview-section">
          <div className="preview-header">
            <h3>
              <i className="bi bi-eye"></i>
              Live Preview
            </h3>
            <p>See how your post will look</p>
          </div>

          <div className="post-preview">
            <div className="preview-image">
              {previewImage ? (
                <img src={previewImage} alt="Preview" />
              ) : (
                <div className="preview-placeholder">
                  <i className="bi bi-image"></i>
                  <span>Image preview will appear here</span>
                </div>
              )}
              {category && (
                <div className="preview-category">
                  <span>{category}</span>
                </div>
              )}
            </div>

            <div className="preview-content">
              {title ? (
                <h3 className="preview-title">{title}</h3>
              ) : (
                <h3 className="preview-title placeholder">Post Title</h3>
              )}

              <div className="preview-author">
                <div className="author-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="author-info">
                  <span className="author-name">You</span>
                  <span className="author-role">Author</span>
                </div>
              </div>

              {description ? (
                <p className="preview-description">
                  {description.length > 150
                    ? `${description.substring(0, 150)}...`
                    : description}
                </p>
              ) : (
                <p className="preview-description placeholder">
                  Your post description will appear here...
                </p>
              )}

              <div className="preview-stats">
                <div className="stat">
                  <i className="bi bi-heart"></i>
                  <span>0 likes</span>
                </div>
                <div className="stat">
                  <i className="bi bi-chat"></i>
                  <span>0 comments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="preview-tips">
            <h4>
              <i className="bi bi-lightbulb"></i>
              Tips for a great post
            </h4>
            <ul>
              <li>Use a clear and descriptive title</li>
              <li>Add relevant images to engage readers</li>
              <li>Use proper formatting and paragraphs</li>
              <li>Choose the right category for your post</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
