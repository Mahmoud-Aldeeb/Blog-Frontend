import "./form.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");

    dispatch(forgotPassword(email));
    toast.success("Reset instructions sent to your email!");
  };

  return (
    <div className="form-wrapper main-content">
      <div className="form-container">
        <div className="form-header">
          <div className="form-brand">
            <div className="brand-icon">
              <i className="fas fa-key"></i>
            </div>
            <div className="brand-text">
              <h1>SecureAuth</h1>
              <p>Enterprise Security Platform</p>
            </div>
          </div>
          <h2 className="form-title">Reset Password</h2>
          <p className="form-subtitle">
            Enter your email to receive reset instructions
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
                placeholder="Enter your registered email"
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="form-btn">
            <i className="fas fa-paper-plane"></i> Send Reset Link
          </button>
        </form>

        <div className="form-footer">
          Remember your password? <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
