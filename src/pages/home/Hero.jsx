import React from "react";
import { Link } from "react-router-dom";
import "./hero.css";

const Hero = () => {
  return (
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
          {/* Rotating orbit rings */}
          <div className="orbit-container">
            <div className="orbit-ring orbit-ring-outer"></div>
            <div className="orbit-ring orbit-ring-mid"></div>
            <div className="orbit-ring orbit-ring-inner"></div>

            {/* Central icon */}
            <div className="orbit-center">
              <i className="bi bi-pencil-fill"></i>
            </div>

            {/* Orbit icons placed at fixed positions */}
            <div className="orbit-icon orbit-icon-top">
              <div className="orbit-icon-circle gradient-pink">
                <i className="bi bi-chat-square-quote-fill"></i>
              </div>
              <span className="orbit-icon-label">Stories</span>
            </div>

            <div className="orbit-icon orbit-icon-right">
              <div className="orbit-icon-circle gradient-teal">
                <i className="bi bi-journal-bookmark-fill"></i>
              </div>
              <span className="orbit-icon-label">Articles</span>
            </div>

            <div className="orbit-icon orbit-icon-bottom">
              <div className="orbit-icon-circle gradient-purple">
                <i className="bi bi-lightning-fill"></i>
              </div>
              <span className="orbit-icon-label">Ideas</span>
            </div>

            <div className="orbit-icon orbit-icon-left">
              <div className="orbit-icon-circle gradient-green">
                <i className="bi bi-heart-fill"></i>
              </div>
              <span className="orbit-icon-label">Community</span>
            </div>
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
  );
};

export default Hero;
