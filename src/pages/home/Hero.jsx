import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./hero.css";
import "./buttons.css";

const Hero = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: i * 0.2,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="home-hero" role="banner" aria-label="Main hero section">
      <div className="hero-overlay">
        <div className="hero-particles">
          {particles.map((particle) => (
            <div
              key={`particle-${particle.id}`}
              className="hero-particle"
              style={{
                animationDelay: `${particle.delay}s`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              aria-hidden="true"
            ></div>
          ))}
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text-container">
          <div className="hero-badge" role="status" aria-label="Welcome badge">
            <span>🎉 Welcome to our community!</span>
          </div>

          <h1 className="hero-title">
            <span className="sr-only">Share Your Stories With The World</span>
            <span className="hero-title-line" aria-hidden="true">
              Share Your
            </span>
            <span className="hero-title-line highlight" aria-hidden="true">
              <span className="highlight-text">Stories</span>
              <span className="highlight-glow"></span>
            </span>
            <span className="hero-title-line" aria-hidden="true">
              With The World
            </span>
          </h1>

          <p className="hero-description">
            Join thousands of writers and readers in our vibrant community.
            Create, discover, and engage with amazing content every day.
          </p>

          <div className="hero-buttons">
            <Link
              to="/posts/create-post"
              className="btn btn-primary hero-btn create-btn"
              aria-label="Start writing a new post"
            >
              <span className="btn-icon">
                <i className="bi bi-pencil-fill"></i>
              </span>
              <span className="btn-text">Start Writing</span>
              <span className="btn-glow"></span>
            </Link>

            <Link
              to="/posts"
              className="btn btn-secondary hero-btn explore-btn"
              aria-label="Explore existing posts"
            >
              <span className="btn-icon">
                <i className="bi bi-compass-fill"></i>
              </span>
              <span className="btn-text">Explore Posts</span>
              <span className="btn-glow"></span>
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="floating-elements">
            <div className="floating-element element-1">
              <i
                className="bi bi-chat-square-quote-fill"
                aria-hidden="true"
              ></i>
            </div>
            <div className="floating-element element-2">
              <i className="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
            </div>
            <div className="floating-element element-3">
              <i className="bi bi-lightning-fill" aria-hidden="true"></i>
            </div>
            <div className="floating-element element-4">
              <i className="bi bi-heart-fill" aria-hidden="true"></i>
            </div>
          </div>
          <div className="hero-illustration">
            <div className="illustration-circle circle-1"></div>
            <div className="illustration-circle circle-2"></div>
            <div className="illustration-circle circle-3"></div>
          </div>
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true">
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
