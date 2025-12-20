import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/apiCalls/profileApiCall";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserProfile(user._id));
    }
  }, [dispatch, user?._id]);

  const navItems = [
    {
      path: "/admin-dashboard",
      icon: "bi bi-columns",
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/admin-dashboard/users-table",
      icon: "bi bi-people",
      label: "Users",
    },
    {
      path: "/admin-dashboard/posts-table",
      icon: "bi bi-journal-text",
      label: "Posts",
    },
    {
      path: "/admin-dashboard/categories-table",
      icon: "bi bi-tags",
      label: "Categories",
    },
    {
      path: "/admin-dashboard/comments-table",
      icon: "bi bi-chat-left-text",
      label: "Comments",
    },
  ];


  return (
    <div className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={`bi bi-chevron-${isCollapsed ? "right" : "left"}`}></i>
        </button>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <i className="bi bi-shield-lock"></i>
          </div>
          {!isCollapsed && (
            <div className="logo-text">
              <h3>Admin Panel</h3>
              <p>Control Center</p>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-divider"></div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <div className="nav-icon">
                  <i className={item.icon}></i>
                </div>
                {!isCollapsed && (
                  <span className="nav-label">{item.label}</span>
                )}
                <div className="nav-indicator"></div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="admin-info">
          <div className="admin-avatar">
            {profile?.profilePhoto?.url ? (
              <img
                src={profile.profilePhoto.url}
                alt={profile?.username || "Admin"}
                className="avatar-image"
                onError={(e) => {
                  e.target.src = "/images/default-avatar.png";
                  e.target.onerror = null;
                }}
              />
            ) : user?.profilePhoto?.url ? (
              <img
                src={user.profilePhoto.url}
                alt={user?.username || "Admin"}
                className="avatar-image"
                onError={(e) => {
                  e.target.src = "/images/default-avatar.png";
                  e.target.onerror = null;
                }}
              />
            ) : (
              <i className="bi bi-person-circle"></i>
            )}
          </div>
          {!isCollapsed && (
            <div className="admin-details">
              <h4>{profile?.username || user?.username || "Admin User"}</h4>
              <p>{profile?.email || user?.email || "Administrator"}</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button className="logout-btn" onClick={() => dispatch(logoutUser())}>
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
