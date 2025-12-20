import "./form.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    if (password !== confirmPassword)
      return toast.error("Passwords don't match");
    if (!termsAccepted)
      return toast.error("Please accept the terms and conditions");
    dispatch(registerUser({ username, email, password }));
    if (registerMessage) {
      swal({
        title: JSON.stringify(registerMessage),
        icon: "success",
      }).then((isOk) => {
        if (isOk) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="form-wrapper main-content">
      <div className="form-container">
        <div className="form-header">
          <div className="form-brand">
            <div className="brand-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="brand-text">
              <h1>SecureAuth</h1>
              <p>Enterprise Security Platform</p>
            </div>
          </div>
          <h2 className="form-title">Create Account</h2>
          <p className="form-subtitle">
            Join our platform and unlock exclusive features
          </p>
        </div>

        <form onSubmit={formSubmitHandler} className="form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="form-input-wrapper">
              <div className="form-input-icon">
                <i className="fas fa-user"></i>
              </div>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                id="username"
                placeholder="Enter your username"
                className="form-input"
              />
            </div>
          </div>

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
                <i className="fas fa-lock"></i>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a strong password"
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

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="form-input-wrapper">
              <div className="form-input-icon">
                <i className="fas fa-lock"></i>
              </div>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div
              className="remember-me"
              onClick={() => setTermsAccepted(!termsAccepted)}
            >
              <div
                className={`remember-checkbox ${
                  termsAccepted ? "checked" : ""
                }`}
              ></div>
              <span>
                I agree to the{" "}
                <Link to="/terms" style={{ color: "#4ecdc4" }}>
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" style={{ color: "#4ecdc4" }}>
                  Privacy Policy
                </Link>
              </span>
            </div>
          </div>

          <button type="submit" className="form-btn">
            <i className="fas fa-user-plus"></i> Create Account
          </button>

          {/* <div className="form-divider">
            <span>Or sign up with</span>
          </div> */}

          {/* <div className="social-login">
            <button type="button" className="social-btn google">
              <i className="fab fa-google"></i> Google
            </button>
            <button type="button" className="social-btn github">
              <i className="fab fa-github"></i> GitHub
            </button>
          </div> */}
        </form>

        <div className="form-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
