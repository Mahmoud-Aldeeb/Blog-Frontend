import "./form.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { loadGoogleSDK } from "../../config/googleConfig";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleSDKLoaded, setIsGoogleSDKLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const initGoogle = async () => {
      try {
        await loadGoogleSDK();
        setIsGoogleSDKLoaded(true);
      } catch (error) {
        console.error("Error loading Google SDK:", error);
      }
    };

    initGoogle();
  }, []);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(loginUser({ email, password }));
  };

  const handleGoogleSuccess = (userData) => {
    console.log("Google login successful:", userData);
    // يمكنك إضافة أي منطق إضافي هنا
  };
  const handleGoogleError = (error) => {
    toast.error(error);
  };

  return (
    <div className="form-wrapper main-content">
      <div className="form-container">
        <div className="form-header">
          <div className="form-brand">
            <div className="brand-icon">
              <i className="fas fa-lock"></i>
            </div>
            <div className="brand-text">
              <h1>SecureAuth</h1>
              <p>Enterprise Security Platform</p>
            </div>
          </div>
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">
            Sign in to access your dashboard and manage your account
          </p>
        </div>

        <form onSubmit={formSubmitHandler} className="form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="form-input-wrapper">
              <div className="form-input-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="form-input-wrapper">
              <div className="form-input-icon">
                <i className="fas fa-key"></i>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas fa-eye${showPassword ? "" : "-slash"}`}></i>
              </button>
            </div>
          </div>

          <div className="form-additional-links">
            <div
              className="remember-me"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div
                className={`remember-checkbox ${rememberMe ? "checked" : ""}`}
              ></div>
              <span>Remember me</span>
            </div>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="form-btn">
            <i className="fas fa-sign-in-alt"></i> Sign In
          </button>
        </form>
        <div className="social-login ">
          {isGoogleSDKLoaded ? (
            <GoogleLoginButton
              mode="login"
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          ) : (
            <div className="google-loading-placeholder">
              <i className="fas fa-spinner fa-spin"></i>
              Loading Google authentication...
            </div>
          )}
        </div>

        <div className="form-footer">
          Don't have an account? <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
