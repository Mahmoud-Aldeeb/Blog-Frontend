// import axios from "axios";

// const request = axios.create({
//   baseURL: "http://localhost:8000",
// });

// export default request;

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const request = axios.create({
  baseURL: API_URL,
});

export default request;
