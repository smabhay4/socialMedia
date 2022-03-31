import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/post/${id}`,
    });

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios({
      method: "put",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/comment/${id}`,
      data: { comment },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(data.message);

    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios({
      method: "delete",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/comment/${id}`,
      data: { commentId },
    });

    // console.log(data.message);

    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const createNewPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios({
      method: "post",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/post/upload`,
      data: { caption, image },
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios({
      method: "put",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/post/${id}`,
      data: { caption },
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios({
      method: "delete",
      withCredentials: true,
      url: `http://localhost:8000/api/v1/post/${id}`,
    });

    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
