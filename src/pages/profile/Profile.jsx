import "./profile.css";
// import { posts } from "../../dummyData";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  // const { postsCount } = useSelector((state) => state.post);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [isProfileDeleted, navigate]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Please select an image first!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-hero">
        <div className="profile-hero-background">
          <div className="profile-hero-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="profile-hero-particle"></div>
            ))}
          </div>
          <div className="profile-hero-overlay"></div>
        </div>

        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-header-section">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-container">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : profile?.profilePhoto.url
                    }
                    alt="Profile Avatar"
                    className="profile-avatar-image"
                  />
                  {user?._id === profile?._id && (
                    <form
                      onSubmit={formSubmitHandler}
                      className="profile-avatar-form"
                    >
                      <label
                        htmlFor="profile-avatar-input"
                        className="profile-avatar-upload-btn"
                      >
                        <i className="bi bi-camera-fill"></i>
                        <span>Change Photo</span>
                      </label>
                      <input
                        type="file"
                        id="profile-avatar-input"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      {file && (
                        <button
                          type="submit"
                          className="profile-avatar-save-btn"
                        >
                          <i className="bi bi-check-lg"></i>
                          Save
                        </button>
                      )}
                    </form>
                  )}
                </div>

                {/* <div className="profile-badge">
                  <i className="bi bi-star-fill"></i>
                  <span>Pro Member</span>
                </div> */}
              </div>

              <div className="profile-info">
                <div className="profile-header-top">
                  <h1 className="profile-username">{profile?.username}</h1>
                  <div className="profile-actions">
                    <button
                      className="profile-action-btn edit-btn"
                      onClick={() => setUpdateProfile(true)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                      Edit Profile
                    </button>
                    <button className="profile-action-btn share-btn">
                      <i className="bi bi-share-fill"></i>
                      Share
                    </button>
                  </div>
                </div>

                <p className="profile-bio">{profile?.bio}</p>

                <div className="profile-meta">
                  <div className="profile-meta-item">
                    <i className="bi bi-envelope-fill"></i>
                    <span>{profile?.email}</span>
                  </div>
                  <div className="profile-meta-item">
                    <i className="bi bi-calendar-check-fill"></i>
                    <span>
                      Joined {new Date(profile?.createdAt).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-file-text-fill"></i>
                </div>
                <div className="stat-content">
                  {/* <span className="stat-number">{userData.stats.posts}</span> */}
                  <span className="stat-label"> Posts</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">
                    {/* {userData.stats.followers} */}
                  </span>
                  <span className="stat-label">Followers</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-person-check-fill"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">
                    {/* {userData.stats.following} */}
                  </span>
                  <span className="stat-label">Following</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <div className="stat-content">
                  {/* <span className="stat-number">{userData.stats.likes}</span> */}
                  <span className="stat-label">Likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-posts-section">
        <div className="profile-container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-text">My</span>
              <span className="title-highlight">Posts</span>
            </h2>
            <p className="section-subtitle">
              Discover all my published posts and articles
            </p>
          </div>

          <div className="profile-posts-container">
            {profile?.posts?.map((post) => (
              <PostItem
                key={post?._id}
                post={post}
                username={profile?.username}
                userId={profile?._id}
              />
            ))}
          </div>
        </div>
      </div>

      {user?._id === profile?._id && (
        <div className="profile-danger-zone">
          <div className="profile-container">
            <div className="danger-zone-header">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <h3>Danger Zone</h3>
            </div>
            <p className="danger-zone-description">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              onClick={deleteAccountHandler}
              className="delete-account-btn"
            >
              <i className="bi bi-trash-fill"></i>
              {loading ? "Deleting..." : "Delete Your Account"}
              {/* Delete Your Account */}
            </button>
          </div>
        </div>
      )}

      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </div>
  );
};

export default Profile;
