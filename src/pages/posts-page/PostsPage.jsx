import { useState, useEffect } from "react";
import "./posts-page.css";
// import { posts } from "../../dummyData";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;
const PostsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { postsCount, posts } = useSelector((state) => state.post);
  // const [filteredPosts, setFilteredPosts] = useState(posts);
  const [loading, setLoading] = useState(true);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(getPostsCount());
  });

  if (loading) {
    return (
      <div className="posts-loading-container">
        <div className="loading-spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="posts-page-wrapper page-wrapper">
      <div className="posts-page-header">
        <div className="header-content">
          <h1 className="page-title">All Posts</h1>
          <p className="page-subtitle">
            Discover amazing content from our community of writers
          </p>
          <div className="posts-count">
            <i className="bi bi-journal-text"></i>
            <span>{postsCount} Posts Available</span>
          </div>
        </div>

        <div className="header-decoration">
          <div className="decoration-dot dot-1"></div>
          <div className="decoration-dot dot-2"></div>
          <div className="decoration-line"></div>
        </div>
      </div>

      <section className="posts-page-container">
        <div className="main-content">
          <PostList posts={posts} />
        </div>

        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
};

export default PostsPage;
