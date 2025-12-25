// import axios from "axios";

// const request = axios.create({
//   baseURL: "http://localhost:8000",
// });

// export default request;

import axios from "axios";

// In development we fall back to the local backend.
// In production (Vercel) you should set REACT_APP_API_URL in the project Environment Variables.
const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");

if (!API_URL && process.env.NODE_ENV !== "development") {
  // eslint-disable-next-line no-console
  console.warn(
    "REACT_APP_API_URL is not set. API requests will be sent to the same origin."
  );
}

const request = axios.create({
  baseURL: API_URL,
});

export default request;
