import "./form.css";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token, dispatch]);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    // if (password !== confirmPassword)
    //   return toast.error("Passwords don't match");

    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <section className="form-wrapper main-content">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
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
            <h2 className="form-title">New Password</h2>
            <p className="form-subtitle">
              Create a strong new password for your account
            </p>
          </div>

          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
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
                  placeholder="Enter your new password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas fa-eye${showPassword ? "" : "-slash"}`}
                  ></i>
                </button>
              </div>
            </div>

            {/* <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
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
                  placeholder="Confirm your new password"
                  className="form-input"
                />
              </div>
            </div> */}

            <button type="submit" className="form-btn">
              <i className="fas fa-check-circle"></i> Reset Password
            </button>
          </form>

          <div className="form-footer">
            Back to login? <Link to="/login">Sign In</Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResetPassword;
