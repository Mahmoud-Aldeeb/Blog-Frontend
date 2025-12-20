import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import AdminSidebar from "./AdminSidebar";
import AddCategoryForm from "./AddCategoryForm";
import "./admin-table.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCategory,
  fetchCategory,
} from "../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCategory());
    setLoading(false);
  }, [dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteCategoryHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category and all its posts!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
      }
    });
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleCategoryAdded = (newCategory) => {
    setShowAddForm(false);
    toast.success("Category added successfully!");
  };

  return (
    <div className="admin-table-wrapper main-content">
      <AdminSidebar />
      <div className="admin-table-container">
        {/* Header */}
        <div className="table-header">
          <div className="header-content">
            <h1 className="table-title">
              <i className="bi bi-tags"></i>
              Categories Management
            </h1>
            <p className="table-subtitle">
              Manage and organize post categories
            </p>
          </div>
          <div className="header-actions">
            <button className="create-btn" onClick={toggleAddForm}>
              <i className="bi bi-plus-circle"></i>
              {showAddForm ? "Cancel" : "New Category"}
            </button>
          </div>
        </div>

        {showAddForm && (
          <AddCategoryForm
            onCategoryAdded={handleCategoryAdded}
            onClose={() => setShowAddForm(false)}
          />
        )}

        {/* Search and Stats */}
        <div className="table-controls">
          <div className="search-container">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="stats-container">
            <div className="stat-item">
              <i className="bi bi-tags"></i>
              <span>Total: {categories.length}</span>
            </div>
            <div className="stat-item">
              <i className="bi bi-filter-circle"></i>
              <span>Showing: {filteredCategories.length} categories</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-tags"></i>
              <h3>No categories found</h3>
              <p>Try adjusting your search or create a new category</p>
              {!showAddForm && (
                <button className="create-first-btn" onClick={toggleAddForm}>
                  <i className="bi bi-plus-circle"></i>
                  Create New Category
                </button>
              )}
            </div>
          ) : (
            <>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, index) => (
                    <tr key={category.id || category._id}>
                      {/* كولوم الكاونت */}
                      <td className="count-cell">
                        <span className="count-number">{index + 1}</span>
                      </td>

                      {/* كولوم الكاتيجوري */}
                      <td>
                        <div className="post-cell">
                          <div className="category-info">
                            <h4 className="post-title">
                              {category?.title?.length > 40
                                ? `${category?.title.substring(0, 40)}...`
                                : category?.title}
                            </h4>
                          </div>
                        </div>
                      </td>

                      {/* كولوم التاريخ */}
                      <td>
                        <div className="activity-cell">
                          <div className="activity-info">
                            <i className="bi bi-calendar"></i>
                            <span>
                              {category?.createdAt
                                ? new Date(
                                    category.createdAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* كولوم الأكشنز */}
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/posts/categories/${category.title}`}
                            className="view-btn"
                            title="View Category"
                          >
                            <i className="bi bi-eye"></i>
                            View
                          </Link>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteCategoryHandler(
                                category?._id || category?.id
                              )
                            }
                            title="Delete Category"
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

              {/* Footer */}
              <div className="table-footer-simple">
                <div className="showing-info">
                  <i className="bi bi-info-circle"></i>
                  Showing all {filteredCategories.length} categories
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesTable;
