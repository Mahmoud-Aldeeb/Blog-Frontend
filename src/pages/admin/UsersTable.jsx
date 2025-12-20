import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getAllUsersProfile,
  getUsersCount,
} from "../../redux/apiCalls/profileApiCall";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  const { usersCount } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(getAllUsersProfile());
    dispatch(getUsersCount());
    setLoading(false);
  }, [isProfileDeleted, dispatch]);

  const filteredUsers = profiles.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUserHandler = (userId) => {
    swal({
      title: "Delete User?",
      text: "This action cannot be undone. The user account and all their content will be permanently removed.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
        //)
      }
    });
  };

  return (
    <div className="admin-table-wrapper main-content">
      <AdminSidebar />
      <div className="admin-table-container">
        {/* Header */}
        <div className="table-header">
          <div className="header-content">
            <h1 className="table-title">
              <i className="bi bi-people"></i>
              Users Management
            </h1>
            <p className="table-subtitle">Manage and monitor all users</p>
          </div>
        </div>

        {/* Filters and Stats */}
        <div className="table-controls">
          <div className="search-container">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="stats-container">
            <div className="stat-item">
              <i className="bi bi-people"></i>
              <span>Total: {usersCount}</span>
            </div>
            {/* <div className="stat-item">
              <i className="bi bi-shield-exclamation"></i>
              <span>
                Admin: {users.filter((u) => u.role === "Admin").length}
              </span>
            </div> */}
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-person-x"></i>
              <h3>No users found</h3>
              <p>Try adjusting your search</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Count</th>
                  <th>User</th>
                  <th>Created</th>
                  <th>Email</th>
                  {/* <th>Status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user?._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="user-cell">
                        <img
                          src={user?.profilePhoto?.url}
                          alt={user?.username}
                          className="user-avatar"
                        />
                        <div className="user-info">
                          <div className="user-main">
                            <span className="user-name">{user?.username}</span>
                            {/* <span className="user-id">ID: #{index + 1}</span> */}
                          </div>
                          <span className="user-email">{user?.email}</span>
                          <div className="user-meta">
                            <span className="user-posts">
                              <i className="bi bi-journal-text"></i>
                              {user?.posts} posts
                            </span>
                            <span className="user-joined">
                              <i className="bi bi-calendar"></i>
                              Joined {user?.createAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="activity-cell">
                        <div className="activity-info">
                          {/* <i className="bi bi-clock"></i> */}
                          <span>
                            Created At:{" "}
                            {new Date(user?.createdAt).toDateString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge`}>{user?.email}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/profile/${user?._id}`} className="view-btn">
                          <i className="bi bi-eye"></i>
                          View
                        </Link>
                        <button
                          className="delete-btn"
                          onClick={() => deleteUserHandler(user?._id)}
                        >
                          <i className="bi bi-trash"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
