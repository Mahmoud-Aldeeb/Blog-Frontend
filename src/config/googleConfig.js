let googleSDKLoaded = false;
let googleSDKLoading = false;

const googleConfig = {
  development: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  },
  production: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID_PROD,
  },
};

const getConfig = () => {
  const env =
    process.env.NODE_ENV === "production" ? "production" : "development";
  return googleConfig[env] || googleConfig.development;
};

export const loadGoogleSDK = () => {
  return new Promise((resolve, reject) => {
    if (googleSDKLoaded) {
      resolve();
      return;
    }

    if (googleSDKLoading) {
      setTimeout(() => resolve(loadGoogleSDK()), 100);
      return;
    }

    googleSDKLoading = true;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleSDKLoaded = true;
      googleSDKLoading = false;
      resolve();
    };

    script.onerror = (error) => {
      googleSDKLoading = false;
      reject(error);
    };

    document.body.appendChild(script);
  });
};

export const initializeGoogleSignIn = (callback) => {
  if (!window.google?.accounts?.id) {
    console.error("Google SDK not loaded");
    return false;
  }

  const config = getConfig();

  if (!config.clientId) {
    console.error("Google Client ID not found");
    return false;
  }

  try {
    window.google.accounts.id.initialize({
      client_id: config.clientId,
      callback: callback,
      auto_select: false,
      cancel_on_tap_outside: true,
      context: "signin",
      ux_mode: "popup",
      locale: "en",
    });

    return true;
  } catch (error) {
    console.error("Error initializing Google:", error);
    return false;
  }
};

export const renderGoogleButton = (elementId, options = {}) => {
  if (!window.google?.accounts?.id) {
    console.error("Google SDK not loaded");
    return false;
  }

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found`);
    return false;
  }

  element.innerHTML = "";

  try {
    const defaultOptions = {
      type: "standard",
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "rectangular",
      width: "100%", // Changed from 300 to 100%
      locale: "en", // Use English
    };

    window.google.accounts.id.renderButton(element, {
      ...defaultOptions,
      ...options,
    });

    // Add custom CSS class to Google's iframe
    setTimeout(() => {
      const iframe = element.querySelector("iframe");
      if (iframe) {
        iframe.style.borderRadius = "15px";
        iframe.style.overflow = "hidden";
      }
    }, 100);

    return true;
  } catch (error) {
    console.error("Error rendering button:", error);
    return false;
  }
};

export const getGoogleClientId = () => getConfig().clientId;

export default getConfig;
