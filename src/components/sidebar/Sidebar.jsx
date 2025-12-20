import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    // Dispatch an action to fetch categories when the component mounts
    dispatch(fetchCategory());
  }, [dispatch]);
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">
          <i className="bi bi-tags-fill"></i>
          Categories
        </h3>
        <div className="sidebar-subtitle">Browse posts by category</div>
      </div>

      <div className="categories-container">
        <ul className="categories-list">
          {categories.map((category) => (
            <li key={category._id} className="category-item">
              <Link
                to={`/posts/categories/${category?.title}`}
                className="category-link"
              >
                <div className="category-content">
                  <div className="category-icon">
                    <i className="bi bi-hash"></i>
                  </div>
                  <div className="category-details">
                    <span className="category-name">{category?.title}</span>
                    {/* <span className="category-count">
                      {category.count || 0} posts
                    </span> */}
                  </div>
                  <div className="category-arrow">
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
                <div className="category-hover-effect"></div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
