import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Login user
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
}
// Logout user
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

// Register user
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
}

// Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.log(error);
    }
  };
}

export function googleLogin(googleToken) {
  return async (dispatch) => {
    try {
      console.log("🔵 Sending Google token to backend...");

      const { data } = await request.post("/api/auth/google", { googleToken });

      console.log("✅ Google login response:", data);

      // حفظ بيانات المستخدم
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));

      // إعادة توجيه بعد نجاح الدخول
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

      toast.success(data.message || "تم تسجيل الدخول بنجاح!");

      return { success: true, data };
    } catch (error) {
      console.error("❌ Google login error:", {
        message: error.response?.data?.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      const errorMessage =
        error.response?.data?.message || "Google login failed";
      toast.error(errorMessage);

      return { success: false, error: errorMessage };
    }
  };
}
