import { useState, useEffect } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import HeaderRight from "./HeaderRight";
import Navbar from "./Navbar";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setToggle(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-left">
        <Link to="/" className="header-logo">
          <div className="logo-container">
            <div className="logo-text">
              <span className="logo-letter logo-b">B</span>
              <span className="logo-letter logo-l">L</span>
              <span className="logo-letter logo-o">O</span>
              <span className="logo-letter logo-g">G</span>
            </div>
            <div className="logo-glow"></div>
          </div>
        </Link>

        <div className="header-menu" onClick={() => setToggle(!toggle)}>
          <div className={`menu-icon ${toggle ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <Navbar
        toggle={toggle}
        setToggle={setToggle}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <HeaderRight />
    </header>
  );
};

export default Header;
