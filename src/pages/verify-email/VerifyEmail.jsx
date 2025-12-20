import "./verify-email.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId, token } = useParams();

  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);
      dispatch(verifyEmail(userId, token));
    } catch (err) {
      setError("Failed to verify email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userId, token]);

  return (
    <div className="verify-email-wrapper">
      <div className="verify-email-container">
        {/* Brand Header */}
        <div className="verify-email-header">
          <div className="brand-logo">
            <i className="bi bi-shield-check"></i>
          </div>
          <div className="brand-text">
            <h1>Email Verification</h1>
            <p>Secure your account with verified email</p>
          </div>
        </div>

        {isLoading ? (
          /* Loading State */
          <div className="verify-email-loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Verifying your email...</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="verify-email-error">
            <i className="bi bi-exclamation-triangle verify-email-error-icon"></i>
            <h2 className="verify-email-error-title">Verification Failed</h2>
            <p className="verify-email-error-message">{error}</p>
            <Link to="/" className="verify-email-link">
              Go to Homepage
            </Link>
          </div>
        ) : isEmailVerified ? (
          /* Success State */
          <div className="verify-email-success">
            <i className="bi bi-patch-check verify-email-icon"></i>
            <h2 className="verify-email-title">Email Verified Successfully!</h2>
            <p className="verify-email-message">
              Your email address has been successfully verified. You can now
              access all features of your account.
            </p>
            <Link to="/login" className="verify-email-link">
              Continue to Login
            </Link>
          </div>
        ) : (
          /* Invalid Verification State */
          <div className="verify-email-error">
            <i className="bi bi-x-circle verify-email-error-icon"></i>
            <h2 className="verify-email-error-title">Invalid Verification</h2>
            <p className="verify-email-error-message">
              This verification link is invalid or has expired. Please request a
              new verification email.
            </p>
            <Link to="/resend-verification" className="verify-email-link">
              Resend Verification
            </Link>
          </div>
        )}

        {/* Footer */}
        {/* <div className="verify-email-footer">
          <p>
            Need help? <Link to="/contact">Contact Support</Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default VerifyEmail;

// import "./verify-email.css";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { verifyEmail } from "../../redux/apiCalls/authApiCall";

// const VerifyEmail = () => {
//   const dispatch = useDispatch();
//   const { isEmailVerified } = useSelector((state) => state.auth);

//   const { userId, token } = useParams();

//   useEffect(() => {
//     dispatch(verifyEmail(userId, token));
//   }, [userId, token]);

//   return (
//     <section className="verfiy-email">
//       {isEmailVerified ? (
//         <>
//           <i className="bi bi-patch-check verify-email-icon"></i>
//           <h1 className="verfiy-email-title">
//             Your email address has been successfully verified
//           </h1>
//           <Link to="/login" className="verify-email-link">
//             Go To Login Page
//           </Link>
//         </>
//       ) : (
//         <>
//           <h1 className="verify-email-not-found">Not Found</h1>
//         </>
//       )}
//     </section>
//   );
// };

// export default VerifyEmail;
