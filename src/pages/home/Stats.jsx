import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsCount } from "../../redux/apiCalls/postApiCall";
import { getUsersCountAll } from "../../redux/apiCalls/profileApiCall";
import { getCategoriesCount } from "../../redux/apiCalls/categoryApiCall";
import "./stats.css";

const LoadingSkeleton = () => (
  <div className="stat-loading">
    <div className="loading-bar"></div>
  </div>
);

const Stats = () => {
  const dispatch = useDispatch();
  const { postsCount } = useSelector((state) => state.post);
  const { usersCountAll } = useSelector((state) => state.profile);
  const { categoriesCount } = useSelector((state) => state.category);

  const [loadingStates, setLoadingStates] = useState({
    posts: true,
    users: true,
    categories: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStates({
          posts: true,
          users: true,
          categories: true,
        });

        await Promise.allSettled([
          dispatch(getPostsCount()).then(() =>
            setLoadingStates((prev) => ({ ...prev, posts: false })),
          ),
          dispatch(getUsersCountAll()).then(() =>
            setLoadingStates((prev) => ({ ...prev, users: false })),
          ),
          dispatch(getCategoriesCount()).then(() =>
            setLoadingStates((prev) => ({ ...prev, categories: false })),
          ),
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoadingStates({
          posts: false,
          users: false,
          categories: false,
        });
      }
    };

    fetchStats();
  }, [dispatch]);

  return (
    <section
      className="stats-section"
      role="region"
      aria-label="Community statistics"
    >
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
          <div
            className="stat-card"
            role="article"
            aria-label="Published posts statistic"
          >
            <div className="stat-icon-wrapper">
              <div className="stat-icon">
                <i className="bi bi-journal-text" aria-hidden="true"></i>
              </div>
              <div className="stat-pulse"></div>
            </div>
            <div className="stat-content">
              {loadingStates.posts ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <h3 className="stat-number">{postsCount || 0}+</h3>
                  <p className="stat-label">Published Posts</p>
                </>
              )}
            </div>
            <div className="stat-glow"></div>
          </div>

          <div
            className="stat-card"
            role="article"
            aria-label="Active users statistic"
          >
            <div className="stat-icon-wrapper">
              <div className="stat-icon">
                <i className="bi bi-people-fill" aria-hidden="true"></i>
              </div>
              <div className="stat-pulse"></div>
            </div>
            <div className="stat-content">
              {loadingStates.users ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <h3 className="stat-number">{usersCountAll || 0}+</h3>
                  <p className="stat-label">Active Users</p>
                </>
              )}
            </div>
            <div className="stat-glow"></div>
          </div>

          <div
            className="stat-card"
            role="article"
            aria-label="Categories statistic"
          >
            <div className="stat-icon-wrapper">
              <div className="stat-icon">
                <i className="bi bi-tags-fill" aria-hidden="true"></i>
              </div>
              <div className="stat-pulse"></div>
            </div>
            <div className="stat-content">
              {loadingStates.categories ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <h3 className="stat-number">{categoriesCount || 0}+</h3>
                  <p className="stat-label">Categories</p>
                </>
              )}
            </div>
            <div className="stat-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
