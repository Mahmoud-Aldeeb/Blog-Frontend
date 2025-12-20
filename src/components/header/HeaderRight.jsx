import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="header-right">
      {user ? (
        <div className="user-dropdown">
          <div className="user-info-wrapper">
            <div className="username-container">
              <span className="username-text">{user.username}</span>
            </div>
            <div className="user-avatar">
              <img
                src={user?.profilePhoto.url}
                alt={user.username}
                className="avatar-image"
                loading="lazy"
              />
            </div>
          </div>
          <div className="dropdown-menu">
            <Link to={`/profile/${user?._id}`} className="dropdown-item">
              <i className="bi bi-person"></i> Profile
            </Link>
            <div
              onClick={() => dispatch(logoutUser())}
              className="dropdown-item"
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </div>
          </div>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">
            <span className="btn-icon">
              <i className="bi bi-box-arrow-in-right"></i>
            </span>
            <span className="btn-text">Login</span>
            <span className="btn-glow"></span>
          </Link>
          <Link to="/register" className="register-btn">
            <span className="btn-icon">
              <i className="bi bi-person-plus"></i>
            </span>
            <span className="btn-text">Register</span>
            <span className="btn-glow"></span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderRight;
