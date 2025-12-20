import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);
  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category, dispatch]);

  // Format category name for display
  const formatCategoryName = (cat) => {
    if (!cat) return "Category";
    return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
  };

  return (
    <div className="category">
      <div className="category-container">
        {/* Header Section */}
        <div className="category-header">
          <h1 className="category-title">{formatCategoryName(category)}</h1>
          <p className="category-subtitle">
            Discover all posts related to {formatCategoryName(category)}
          </p>
        </div>

        {/* Posts Content */}
        <div className="category-content">
          <PostList posts={postsCate} />
        </div>
      </div>
    </div>
  );
};

export default Category;
