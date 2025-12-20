import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

// Get User profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);

      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));

      // modify localStorage userInfo
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

// Update Profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));

      // modify localStorage userInfo
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

// Delete Profile (Account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      // toast.success("xxxxxxxxxxx");
      setTimeout(() => {
        dispatch(profileActions.clearIsProfileDeleted());
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message);
      // toast.error("zzzzzzzzzzz");
      dispatch(profileActions.clearLoading());
    }
  };
}

// Get Users Count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

// Get All Users Profile (for admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}
