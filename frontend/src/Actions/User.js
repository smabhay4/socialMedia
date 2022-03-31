import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:8000/api/v1/login",
      data: { email, password },
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:8000/api/v1/myProfile",
    });

    //  const { data } = await axios.get("http://localhost:8000/api/v1/myProfile");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const { data } = await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:8000/api/v1/posts",
    });

    console.log(data);

    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      const { data } = await axios({
        method: "get",
        withCredentials: true,
        url: `http://localhost:8000/api/v1/users?name=${name}`,
      });

      console.log(data.users);

      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data } = await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:8000/api/v1/my/posts",
    });

    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    const { data } = await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:8000/api/v1/logout",
    });

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "registerRequest",
      });

      const { data } = await axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:8000/api/v1/register",
        data: { name, email, password, avatar },
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "registerSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "registerFailure",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios({
      method: "put",
      withCredentials: true,
      url: "http://localhost:8000/api/v1/update/profile",
      data: { name, email, avatar },
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updatePasswordRequest",
      });

      const { data } = await axios({
        method: "put",
        withCredentials: true,
        url: `http://localhost:8000/api/v1//update/password`,
        data: { oldPassword, newPassword },
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "updatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios({
      method: "delete",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/delete/profile`,
    });

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios({
      method: "post",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/forgotPassword`,
      data: { email },
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios({
      method: "put",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/password/reset/${token}`,
      data: { password },
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostsRequest",
    });

    const { data } = await axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/userposts/${id}`,
    });

    dispatch({
      type: "userPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/user/${id}`,
    });

    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/follow/${id}`,
    });

    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
