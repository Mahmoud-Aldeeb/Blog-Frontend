import "./update-profile-modal.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";

// const user = {
//   username: "Youssef Abbas",
//   email: "youssef@example.com",
//   bio: "Hello! I'm a passionate web developer with expertise in React, Node.js, and modern web technologies. I love creating beautiful and functional applications.",
//   location: "Cairo, Egypt",
// };

const UpdateProfileModal = ({ setUpdateProfile, profile }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: profile.username,
    bio: profile.bio,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    // التحقق من كلمات المرور
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error("New passwords don't match!");
      return;
    }

    if (formData.newPassword && !formData.currentPassword) {
      toast.error("Please enter current password to change password");
      return;
    }

    const updatedUser = {
      username: formData.username,
      bio: formData.bio,
    };

    if (formData.newPassword.trim() !== "") {
      updatedUser.password = formData.newPassword;
    }

    console.log("Updated User:", updatedUser);
    toast.success("Profile updated successfully!");

    dispatch(updateProfile(profile?._id, updatedUser));

    // إغلاق المودال بعد ثانية
    setUpdateProfile(false);
  };

  return (
    <div
      className="update-profile-modal-overlay"
      onClick={() => setUpdateProfile(false)}
    >
      <div
        className="update-profile-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">
            <i className="bi bi-person-badge-fill"></i>
            Update Profile
          </h2>
          <button
            className="modal-close-btn"
            onClick={() => setUpdateProfile(false)}
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={formSubmitHandler} className="update-profile-form">
          <div className="form-sections">
            {/* Personal Information Section */}
            <div className="form-section">
              <div className="section-header">
                <i className="bi bi-person-circle"></i>
                <h3>Personal Information</h3>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  <i className="bi bi-person-fill"></i>
                  Username
                </label>
                <input
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  type="text"
                  id="username"
                  className="form-input"
                  placeholder="Enter your username"
                />
              </div>

              {/* <div className="form-group">
                <label className="form-label" htmlFor="email">
                  <i className="bi bi-envelope-fill"></i>
                  Email Address
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div> */}

              {/* <div className="form-group">
                <label className="form-label" htmlFor="location">
                  <i className="bi bi-geo-alt-fill"></i>
                  Location
                </label>
                <input
                  name="location"
                  onChange={handleChange}
                  value={formData.location}
                  type="text"
                  id="location"
                  className="form-input"
                  placeholder="Enter your location"
                />
              </div> */}

              <div className="form-group">
                <label className="form-label" htmlFor="bio">
                  <i className="bi bi-card-text"></i>
                  Bio
                </label>
                <textarea
                  name="bio"
                  onChange={handleChange}
                  value={formData.bio}
                  id="bio"
                  className="form-input form-textarea"
                  placeholder="Tell us about yourself..."
                  rows="4"
                />
                <div className="char-count">
                  {formData?.bio?.length}/500 characters
                </div>
              </div>
            </div>

            {/* Change Password Section */}
            <div className="form-section">
              <div className="section-header">
                <i className="bi bi-shield-lock-fill"></i>
                <h3>Change Password</h3>
              </div>

              <div className="password-note">
                <i className="bi bi-info-circle-fill"></i>
                Leave blank if you don't want to change your password
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="currentPassword">
                  <i className="bi bi-key-fill"></i>
                  Current Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    name="currentPassword"
                    onChange={handleChange}
                    value={formData.currentPassword}
                    type="password"
                    id="currentPassword"
                    className="form-input"
                    placeholder="Enter current password"
                  />
                  <i className="bi bi-eye-fill password-toggle"></i>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="newPassword">
                  <i className="bi bi-key"></i>
                  New Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    name="newPassword"
                    onChange={handleChange}
                    value={formData.newPassword}
                    type="password"
                    id="newPassword"
                    className="form-input"
                    placeholder="Enter new password"
                  />
                  <i className="bi bi-eye-fill password-toggle"></i>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  <i className="bi bi-key"></i>
                  Confirm New Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    placeholder="Confirm new password"
                  />
                  <i className="bi bi-eye-fill password-toggle"></i>
                </div>
              </div>

              <div className="password-strength">
                <div className="strength-label">Password Strength:</div>
                <div className="strength-meter">
                  <div className="strength-bar"></div>
                </div>
                <div className="strength-hints">
                  <i className="bi bi-check-circle-fill"></i>
                  Use at least 8 characters
                  <i className="bi bi-check-circle-fill"></i>
                  Include numbers and symbols
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="action-btn cancel-btn"
              onClick={() => setUpdateProfile(false)}
            >
              <i className="bi bi-x-circle"></i>
              Cancel
            </button>
            <button type="submit" className="action-btn submit-btn">
              <i className="bi bi-check-circle"></i>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
