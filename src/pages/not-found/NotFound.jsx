import { Link } from "react-router-dom";
import "./not-found.css";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Create animated particles
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 20 + 5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  };

  return (
    <section className="not-found page-wrapper" onMouseMove={handleMouseMove}>
      {/* Animated background */}
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.speed * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower effect */}
      <div
        className="mouse-follower"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      />

      {/* Main content */}
      <div className="not-found-content">
        <div className="error-number-container">
          <div className="error-number error-number-1">4</div>
          <div className="error-number error-number-center">
            <div className="rotating-element">
              <div className="orbit">
                <div className="orbiting-dot dot-1"></div>
                <div className="orbiting-dot dot-2"></div>
                <div className="orbiting-dot dot-3"></div>
              </div>
            </div>
          </div>
          <div className="error-number error-number-2">4</div>
        </div>

        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-description">
          Oops! The page you're looking for seems to have wandered off into the
          digital void.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="home-link">
            <span className="link-icon">🏠</span>
            Back to Home
          </Link>

          <button
            className="magic-button"
            onClick={() => window.history.back()}
          >
            <span className="button-icon">🔙</span>
            Go Back
          </button>
        </div>

        {/* Additional floating elements */}
        <div className="floating-elements">
          <div className="floating-element fe-1">🚀</div>
          <div className="floating-element fe-2">🌌</div>
          <div className="floating-element fe-3">✨</div>
        </div>
      </div>

      <div className="footer-note">
        <p>
          If you believe this is an error, please{" "}
          <Link to="/contact">contact us</Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
