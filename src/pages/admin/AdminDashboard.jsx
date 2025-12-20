import "./admin.css";
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-wrapper  main-content">
      <div className="admin-dashboard-container">
        <AdminSidebar />
        <AdminMain />
      </div>
    </div>
  );
};

export default AdminDashboard;
