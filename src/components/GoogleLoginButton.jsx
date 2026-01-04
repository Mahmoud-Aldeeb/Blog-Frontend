import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { googleLogin } from "../redux/apiCalls/authApiCall";
import {
  loadGoogleSDK,
  initializeGoogleSignIn,
  renderGoogleButton,
} from "../config/googleConfig";
import "./GoogleLoginButton.css";

const GoogleLoginButton = ({ mode = "login", onSuccess, onError }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [sdkStatus, setSdkStatus] = useState({ loaded: false });
  const [error, setError] = useState(null);
  const buttonInitialized = useRef(false);
  const elementId = useRef(`googleSignInBtn-${Date.now()}`);

  // Load Google SDK
  useEffect(() => {
    let isMounted = true;

    const initGoogleSDK = async () => {
      try {
        console.log("Loading Google SDK...");
        await loadGoogleSDK();

        if (isMounted) {
          setSdkStatus({ loaded: true });
          console.log("Google SDK loaded successfully");
        }
      } catch (error) {
        console.error("Failed to load Google SDK:", error);
        if (isMounted) {
          setError("Failed to load Google authentication service");
          if (onError) onError("Failed to load Google authentication service");
        }
      }
    };

    initGoogleSDK();

    return () => {
      isMounted = false;
    };
  }, [onError]);

  // Handle Google response
  const handleGoogleResponse = useRef(async (response) => {
    console.log("Google response received");

    if (!response?.credential) {
      console.error("No credential received from Google");
      setError("No authentication data received from Google");
      if (onError) onError("No authentication data received from Google");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Sending Google token to server...");

      const result = await dispatch(googleLogin(response.credential));

      if (result?.success) {
        console.log("Google login successful");

        if (onSuccess) onSuccess(result.data);

        // Redirect after success
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        console.error("Google login failed:", result?.error);
        setError(result?.error || "Login failed");
        if (onError) onError(result?.error || "Login failed");
      }
    } catch (error) {
      console.error("Error in Google login process:", error);
      setError("An error occurred during login");
      if (onError) onError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  });

  // Initialize button
  useEffect(() => {
    if (buttonInitialized.current || !sdkStatus.loaded) return;

    const initButton = () => {
      if (!window.google?.accounts?.id) {
        setTimeout(initButton, 100);
        return;
      }

      // Initialize Google Sign-In
      if (initializeGoogleSignIn(handleGoogleResponse.current)) {
        buttonInitialized.current = true;

        // Render Google button with custom styling
        setTimeout(() => {
          renderGoogleButton(elementId.current, {
            type: "standard",
            theme: "filled_black",
            size: "large",
            text: mode === "login" ? "continue_with" : "signup_with",
            shape: "rectangular",
            width: "100%", // Make it full width
            logo_alignment: "left",
            locale: "en",
          });
        }, 200);
      }
    };

    initButton();

    return () => {
      if (window.google?.accounts?.id?.cancel) {
        try {
          window.google.accounts.id.cancel();
        } catch (error) {
          console.warn("Error canceling Google auth:", error);
        }
      }
    };
  }, [sdkStatus.loaded, mode]);

  // Manual click handler (fallback)
  const handleManualClick = () => {
    if (window.google?.accounts?.id?.prompt) {
      try {
        window.google.accounts.id.prompt();
      } catch (error) {
        console.error("Error opening Google prompt:", error);
        setError("Failed to open Google authentication");
      }
    }
  };

  return (
    <div className="google-auth-container">
      {/* Google Button Container */}
      <div
        id={elementId.current}
        className="google-signin-btn form-btn google-custom-btn"
        onClick={handleManualClick}
      >
        {isLoading ? (
          <div className="google-loading">
            <i className="fas fa-spinner fa-spin"></i>
            Signing in... Please wait
          </div>
        ) : !sdkStatus.loaded ? (
          // Show custom button while SDK is loading
          <div>
            <div className="google-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24"
                height="24"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            </div>
            <span className="google-btn-text">
              {mode === "login"
                ? "Continue with Google"
                : "Sign up with Google"}
            </span>
          </div>
        ) : null}
        {/* Google SDK will render button here automatically */}
      </div>

      {/* Error message */}
      {error && (
        <div className="google-error-message">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
