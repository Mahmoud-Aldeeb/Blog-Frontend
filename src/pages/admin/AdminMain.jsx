import { useEffect } from "react";
import { Link } from "react-router-dom";
// import AddCategoryForm from "./AddCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../../redux/apiCalls/profileApiCall";
import { getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";

const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { postsCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
  }, [dispatch]);

  const categoriesCount = categories?.length || 0;

  // بيانات ثابتة لكل كارت
  const usersStats = { count: 120, trend: "+12%" };
  const postsStats = { count: 210, trend: "+8%" };
  const commentsStats = { count: 44, trend: "+23%" };

  return (
    <div className="admin-main">
      <div className="main-header">
        <div className="header-content">
          <h1 className="main-title">Dashboard Overview</h1>
          <p className="main-subtitle">
            Welcome back, Admin! Here's what's happening.
          </p>
        </div>
        <div className="header-actions">
          <div className="date-info">
            <i className="bi bi-calendar3"></i>
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <button className="refresh-btn">
            <i className="bi bi-arrow-clockwise"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* كارت المستخدمين */}
        <div className="stat-card card-blue">
          <div className="card-header">
            <div className="card-icon">
              <i className="bi bi-people-fill"></i>
            </div>
            <span className="trend-badge">
              <i className="bi bi-arrow-up-right"></i>
              {usersStats.trend}
            </span>
          </div>
          <div className="card-content">
            <h3 className="card-count">{usersCount}</h3>
            <p className="card-title">Total Users</p>
          </div>
          <div className="card-footer">
            <Link to="/admin-dashboard/users-table" className="card-link">
              View Details
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
          </div>
        </div>

        {/* كارت المقالات */}
        <div className="stat-card card-green">
          <div className="card-header">
            <div className="card-icon">
              <i className="bi bi-journal-text"></i>
            </div>
            <span className="trend-badge">
              <i className="bi bi-arrow-up-right"></i>
              {postsStats.trend}
            </span>
          </div>
          <div className="card-content">
            <h3 className="card-count">{postsCount}</h3>
            <p className="card-title">Total Posts</p>
          </div>
          <div className="card-footer">
            <Link to="/admin-dashboard/posts-table" className="card-link">
              View Details
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
          </div>
        </div>

        {/* كارت الفئات */}
        <div className="stat-card card-purple">
          <div className="card-header">
            <div className="card-icon">
              <i className="bi bi-tags-fill"></i>
            </div>
            <span className="trend-badge">
              <i className="bi bi-arrow-up-right"></i>+{categoriesCount}
            </span>
          </div>
          <div className="card-content">
            <h3 className="card-count">{categoriesCount.toLocaleString()}</h3>
            <p className="card-title">Categories</p>
          </div>
          <div className="card-footer">
            <Link to="/admin-dashboard/categories-table" className="card-link">
              View Details
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
          </div>
        </div>

        {/* كارت التعليقات */}
        <div className="stat-card card-orange">
          <div className="card-header">
            <div className="card-icon">
              <i className="bi bi-chat-left-text-fill"></i>
            </div>
            <span className="trend-badge">
              <i className="bi bi-arrow-up-right"></i>
              {commentsStats.trend}
            </span>
          </div>
          <div className="card-content">
            <h3 className="card-count">{comments.length}</h3>
            <p className="card-title">Comments</p>
          </div>
          <div className="card-footer">
            <Link to="/admin-dashboard/comments-table" className="card-link">
              View Details
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
          </div>
        </div>

        {/* كارت المشاهدات */}
        {/* <div className="stat-card card-red">
          <div className="card-header">
            <div className="card-icon">
              <i className="bi bi-eye-fill"></i>
            </div>
            <span className="trend-badge">
              <i className="bi bi-arrow-up-right"></i>
              {viewsStats.trend}
            </span>
          </div>
          <div className="card-content">
            <h3 className="card-count">{viewsStats.count.toLocaleString()}</h3>
            <p className="card-title">Total Views</p>
          </div>
          <div className="card-footer">
            <Link to="/admin-dashboard/analytics" className="card-link">
              View Details
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-decoration">
            <div className="decoration-circle circle-1"></div>
            <div className="decoration-circle circle-2"></div>
          </div>
        </div> */}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="dashboard-sections">
        {/* Recent Activity */}
        <div className="section-card">
          <div className="section-header">
            <h3>
              <i className="bi bi-clock-history"></i>
              Recent Activity
            </h3>
            <Link to="/admin-dashboard/activity" className="view-all">
              View All
            </Link>
          </div>
          <div className="activity-list">
            {[
              {
                user: "John Doe",
                action: "created a new post",
                time: "5 min ago",
                type: "post",
              },
              {
                user: "Sarah Smith",
                action: "commented on a post",
                time: "15 min ago",
                type: "comment",
              },
              {
                user: "Mike Johnson",
                action: "registered new account",
                time: "30 min ago",
                type: "user",
              },
              {
                user: "Admin",
                action: "updated category settings",
                time: "2 hours ago",
                type: "category",
              },
              {
                user: "Emily Wilson",
                action: "liked 5 posts",
                time: "3 hours ago",
                type: "like",
              },
            ].map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <i
                    className={`bi bi-${
                      activity.type === "post"
                        ? "journal-text"
                        : activity.type === "comment"
                        ? "chat-left"
                        : activity.type === "user"
                        ? "person-plus"
                        : activity.type === "category"
                        ? "tag"
                        : "heart"
                    }`}
                  ></i>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <span className="activity-time">
                    <i className="bi bi-clock"></i>
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section-card">
          <div className="section-header">
            <h3>
              <i className="bi bi-lightning-fill"></i>
              Quick Actions
            </h3>
          </div>
          <div className="quick-actions">
            <button className="action-btn">
              <i className="bi bi-plus-circle"></i>
              <span>Create Post</span>
            </button>
            <button className="action-btn">
              <i className="bi bi-person-plus"></i>
              <span>Add User</span>
            </button>
            <button className="action-btn">
              <i className="bi bi-tag"></i>
              <span>Add Category</span>
            </button>
            <button className="action-btn">
              <i className="bi bi-bar-chart"></i>
              <span>View Analytics</span>
            </button>
            <button className="action-btn">
              <i className="bi bi-gear"></i>
              <span>Settings</span>
            </button>
            <button className="action-btn">
              <i className="bi bi-bell"></i>
              <span>Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
