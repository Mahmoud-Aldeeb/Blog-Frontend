// import PostList from "../../components/posts/PostList";
// import Sidebar from "../../components/sidebar/Sidebar";
// import { Link } from "react-router-dom";
// import "./home.css";
// import { posts } from "../../dummyData";

// const Home = () => {
//   return (
//     <section className="home">
//       <div className="home-hero-header">
//         <div className="home-hero-header-layout">
//           <h1 className="home-title">Welcome to Blog</h1>
//         </div>
//       </div>
//       <div className="home-latest-post">Latest Posts</div>
//       <div className="home-container">
//         <PostList posts={posts.slice(0, 3)} />
//         <Sidebar />
//       </div>
//       <div className="home-see-posts-link">
//         <Link className="home-link" to="/posts">
//           See All Posts
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Home;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import { getUsersCount } from "../../redux/apiCalls/profileApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { postsCount } = useSelector((state) => state.post);
  const { usersCount } = useSelector((state) => state.profile);
  const { categories } = useSelector((state) => state.category);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPosts(1));
    dispatch(getPostsCount());
    dispatch(getUsersCount());
    setLoading(false);
  }, [dispatch]);

  const categoriesCount = categories?.length || 0;

  return (
    <div className="home-wrapper page-wrapper">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-overlay">
          <div className="hero-particles">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="hero-particle"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text-container">
            <div className="hero-badge">
              <span>🎉 Welcome to our community!</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line">Share Your</span>
              <span className="hero-title-line highlight">
                <span className="highlight-text">Stories</span>
                <span className="highlight-glow"></span>
              </span>
              <span className="hero-title-line">With The World</span>
            </h1>

            <p className="hero-description">
              Join thousands of writers and readers in our vibrant community.
              Create, discover, and engage with amazing content every day.
            </p>

            <div className="hero-buttons">
              <Link to="/posts/create-post" className="hero-btn create-btn">
                <span className="btn-icon">
                  <i className="bi bi-pencil-fill"></i>
                </span>
                <span className="btn-text">Start Writing</span>
                <span className="btn-glow"></span>
              </Link>

              <Link to="/posts" className="hero-btn explore-btn">
                <span className="btn-icon">
                  <i className="bi bi-compass-fill"></i>
                </span>
                <span className="btn-text">Explore Posts</span>
                <span className="btn-glow"></span>
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-elements">
              <div className="floating-element element-1">
                <i className="bi bi-chat-square-quote-fill"></i>
              </div>
              <div className="floating-element element-2">
                <i className="bi bi-journal-bookmark-fill"></i>
              </div>
              <div className="floating-element element-3">
                <i className="bi bi-lightning-fill"></i>
              </div>
              <div className="floating-element element-4">
                <i className="bi bi-heart-fill"></i>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="illustration-circle circle-1"></div>
              <div className="illustration-circle circle-2"></div>
              <div className="illustration-circle circle-3"></div>
            </div>
          </div>
        </div>

        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-text">Our Growing</span>
              <span className="title-highlight">Community</span>
            </h2>
            <p className="section-subtitle">
              Join our ever-expanding network of writers and readers
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon">
                  <i className="bi bi-journal-text"></i>
                </div>
                <div className="stat-pulse"></div>
              </div>
              <div className="stat-content">
                {loading ? (
                  <div className="stat-loading">
                    <div className="loading-bar"></div>
                  </div>
                ) : (
                  <>
                    <h3 className="stat-number">{postsCount}+</h3>
                    <p className="stat-label">Published Posts</p>
                  </>
                )}
              </div>
              <div className="stat-glow"></div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <div className="stat-pulse"></div>
              </div>
              <div className="stat-content">
                {loading ? (
                  <div className="stat-loading">
                    <div className="loading-bar"></div>
                  </div>
                ) : (
                  <>
                    <h3 className="stat-number">{usersCount}+</h3>
                    <p className="stat-label">Active Users</p>
                  </>
                )}
              </div>
              <div className="stat-glow"></div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon">
                  <i className="bi bi-tags-fill"></i>
                </div>
                <div className="stat-pulse"></div>
              </div>
              <div className="stat-content">
                {loading ? (
                  <div className="stat-loading">
                    <div className="loading-bar"></div>
                  </div>
                ) : (
                  <>
                    <h3 className="stat-number">{categoriesCount}+</h3>
                    <p className="stat-label">Categories</p>
                  </>
                )}
              </div>
              <div className="stat-glow"></div>
            </div>
          </div>
        </div>
      </section>

      <PostList posts={posts} />
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2 className="cta-title">Ready to Share Your Story?</h2>
              <p className="cta-description">
                Join our community today and start creating amazing content.
                It's free, easy, and fun!
              </p>
            </div>
            <div className="cta-buttons">
              <Link to="/register" className="cta-btn primary-btn">
                <span className="btn-icon">
                  <i className="bi bi-person-plus-fill"></i>
                </span>
                <span className="btn-text">Join Now</span>
              </Link>
              <Link to="/about" className="cta-btn secondary-btn">
                <span className="btn-icon">
                  <i className="bi bi-info-circle-fill"></i>
                </span>
                <span className="btn-text">Learn More</span>
              </Link>
            </div>
          </div>

          <div className="cta-decoration">
            <div className="cta-orbits">
              <div className="orbit orbit-1">
                <div className="orbit-dot dot-1"></div>
              </div>
              <div className="orbit orbit-2">
                <div className="orbit-dot dot-2"></div>
              </div>
              <div className="orbit orbit-3">
                <div className="orbit-dot dot-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
