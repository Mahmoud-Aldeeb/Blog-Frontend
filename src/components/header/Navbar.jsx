import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
const Navbar = ({ toggle, setToggle, setIsLoggedIn, isLoggedIn }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className={`navbar ${toggle ? "active" : ""}`}>
      <div className="nav-header">
        <div className="nav-close" onClick={() => setToggle(false)}>
          <i className="bi bi-x-lg"></i>
        </div>
      </div>

      <div className="nav-background">
        <div className="nav-bg-particle"></div>
        <div className="nav-bg-particle"></div>
        <div className="nav-bg-particle"></div>
      </div>

      <ul className="nav-links">
        <Link to="/" className="nav-link" onClick={() => setToggle(false)}>
          <div className="nav-link-content">
            <span className="nav-icon">
              <i className="bi bi-house-door-fill"></i>
            </span>
            <span className="nav-text">Home</span>
            <span className="nav-hover-effect"></span>
          </div>
        </Link>

        <Link to="/posts" className="nav-link" onClick={() => setToggle(false)}>
          <div className="nav-link-content">
            <span className="nav-icon">
              <i className="bi bi-stickies-fill"></i>
            </span>
            <span className="nav-text">Posts</span>
            <span className="nav-hover-effect"></span>
          </div>
        </Link>

        {user && (
          <Link
            to="/posts/create-post"
            className="nav-link"
            onClick={() => setToggle(false)}
          >
            <div className="nav-link-content">
              <span className="nav-icon">
                <i className="bi bi-plus-circle-fill"></i>
              </span>
              <span className="nav-text">Create</span>
              <span className="nav-hover-effect"></span>
            </div>
          </Link>
        )}
        {user?.isAdmin && (
          <Link
            to="/admin-dashboard"
            className="nav-link"
            onClick={() => setToggle(false)}
          >
            <div className="nav-link-content">
              <span className="nav-icon">
                <i className="bi bi-shield-fill-check"></i>
              </span>
              <span className="nav-text">Dashboard</span>
              <span className="nav-hover-effect"></span>
            </div>
          </Link>
        )}

        <li className="mobile-auth-section">
          {user ? (
            <>
              <div className="mobile-user-info">
                <div className="mobile-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="mobile-user-details">
                  <span className="mobile-user-name">{user.username}</span>
                  <span className="mobile-user-email">{user.email}</span>
                </div>
              </div>
              <Link
                to={`/profile/${user?._id}`}
                className="nav-link"
                onClick={() => setToggle(false)}
              >
                <div className="nav-link-content">
                  <span className="nav-icon">
                    <i className="bi bi-person-circle"></i>
                  </span>
                  <span className="nav-text">Profile</span>
                  <span className="nav-hover-effect"></span>
                </div>
              </Link>
              <button
                className="nav-link logout-btn"
                onClick={() => dispatch(logoutUser())}
              >
                <div className="nav-link-content">
                  <span className="nav-icon">
                    <i className="bi bi-box-arrow-right"></i>
                  </span>
                  <span className="nav-text">Logout</span>
                  <span className="nav-hover-effect"></span>
                </div>
              </button>
            </>
          ) : (
            <>
              <div className="auth-message">
                <p>Join our community to create and share posts!</p>
              </div>
              <Link
                to="/login"
                className="nav-link mobile-login-btn"
                onClick={() => setToggle(false)}
              >
                <div className="nav-link-content">
                  <span className="nav-icon">
                    <i className="bi bi-box-arrow-in-right"></i>
                  </span>
                  <span className="nav-text">Login</span>
                  <span className="nav-hover-effect"></span>
                </div>
              </Link>
              <Link
                to="/register"
                className="nav-link mobile-register-btn"
                onClick={() => setToggle(false)}
              >
                <div className="nav-link-content">
                  <span className="nav-icon">
                    <i className="bi bi-person-plus"></i>
                  </span>
                  <span className="nav-text">Register</span>
                  <span className="nav-hover-effect"></span>
                </div>
              </Link>
            </>
          )}
        </li>
      </ul>

      <div className="nav-footer">
        <div className="nav-footer-text">Blog Platform © 2024</div>
        <div className="nav-footer-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
