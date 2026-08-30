import React from "react";
import { Link } from "react-router-dom";
import "./cta.css";
import "./buttons.css";

const Cta = () => {
  return (
    <section className="cta-section" aria-label="Call to action">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2 className="cta-title">Ready to Share Your Story?</h2>
            <p className="cta-description">
              Join our community today and start creating amazing content. It's
              free, easy, and fun!
            </p>
          </div>
          <div className="cta-buttons">
            <Link
              to="/register"
              className="btn btn-primary cta-btn"
              aria-label="Join our community"
            >
              <span className="btn-icon">
                <i className="bi bi-person-plus-fill"></i>
              </span>
              <span className="btn-text">Join Now</span>
            </Link>
            <Link
              to="/about"
              className="btn btn-secondary cta-btn"
              aria-label="Learn more about our community"
            >
              <span className="btn-icon">
                <i className="bi bi-info-circle-fill"></i>
              </span>
              <span className="btn-text">Learn More</span>
            </Link>
          </div>
        </div>

        <div className="cta-decoration" aria-hidden="true">
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
  );
};

export default Cta;
