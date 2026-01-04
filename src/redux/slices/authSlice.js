import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    registerMessage: null,
    isEmailVerified: false,
    googleAuth: {
      isGoogleUser: false,
      googleData: null,
      isLoading: false,
    },
  },
  reducers: {
    // login(state, action) {
    //   state.user = action.payload;
    //   state.registerMessage = null;
    // },
    login(state, action) {
      state.user = action.payload;
      state.registerMessage = null;
      // تحقق إذا كان مستخدم جيميل
      state.googleAuth.isGoogleUser =
        action.payload.authMethod === "google" ||
        action.payload.authMethod === "both";
      if (action.payload.googlePicture) {
        state.googleAuth.googleData = {
          picture: action.payload.googlePicture,
          name: action.payload.googleName,
        };
      }
    },
    logout(state) {
      state.user = null;
      state.googleAuth.isGoogleUser = false;
      state.googleAuth.googleData = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUsername(state, action) {
      state.user.username = action.payload;
    },
    setIsEmailVerified(state) {
      state.isEmailVerified = true;
      state.registerMessage = null;
    },
    setGoogleAuthLoading(state, action) {
      state.googleAuth.isLoading = action.payload;
    },
    updateGoogleUserData(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("userInfo", JSON.stringify(state.user));
      }
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
