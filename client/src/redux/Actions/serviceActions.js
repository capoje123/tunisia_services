import axios from "axios";
import {
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_LOADING,
  DELETE_IMAGE_SUCCESS,
  GET_ALL_SERVICES_FAIL,
  GET_ALL_SERVICES_LOADING,
  GET_ALL_SERVICES_SUCCESS,
  GET_ROW_SERVICES_FAIL,
  GET_ROW_SERVICES_LOADING,
  GET_ROW_SERVICES_SUCCESS,
  GET_USER_SERVICE_FAIL,
  GET_USER_SERVICE_LOADING,
  GET_USER_SERVICE_SUCCESS,
  UPDATE_PROFESSION_FAIL,
  UPDATE_PROFESSION_LOADING,
  UPDATE_PROFESSION_SUCCESS,
  FOLLOWING_FAIL,
  FOLLOWING_LOADING,
  FOLLOWING_SUCCESS,
  UNFOLLOW_LOADING,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAIL,
  RATING_LOADING,
  RATING_SUCCESS,
  RATING_FAIL,
  GET_FOLLOWERS_LOADING,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAIL,
  GET_FOLLOWING_FAIL,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOWING_LOADING,
} from "../Consts/serviceConsts";
import { getProfile } from "./profileActions";

//create new service

export const createService = (profession, navigate) => async (dispatch) => {
  dispatch({ type: "ADD_SERVICE_LOADING" });
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:5000/api/service/addservice",
      { profession },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "ADD_SERVICE_SUCCESS", payload: response.data });
    navigate("/profile");
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_SERVICE_FAIL", payload: error });
  }
};

export const getCUrrentService = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "GET_CURRENT_SERVICE_LOADING" });
  try {
    const response = await axios.get(
      "http://localhost:5000/api/service/currentservice",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "GET_CURRENT_SERVICE_SUCCESS", payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_CURRENT_SERVICE_FAIL", payload: error });
  }
};

export const uploadImages = (images) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: "UPLOAD_MULTIPLE_IMAGES_LOADING" });
  try {
    const response = await axios.put(
      "http://localhost:5000/api/service/uploadimages",
      images,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: "UPLOAD_MULTIPLE_IMAGES_SUCCESS",
      payload: response.data,
    });
    dispatch(getCUrrentService(token));
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_MULTIPLE_IMAGES_FAIL", payload: error });
  }
};

//delete image

export const deleteImage = (imageUrl) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: DELETE_IMAGE_LOADING });
  try {
    const response = await axios.put(
      "http://localhost:5000/api/service/deleteimage",
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: DELETE_IMAGE_SUCCESS, payload: response.data });
    dispatch(getCUrrentService(token));
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_IMAGE_FAIL, payload: error });
  }
};

//get row services

export const getRowServices = (category) => async (dispatch) => {
  dispatch({ type: GET_ROW_SERVICES_LOADING });
  try {
    if (typeof category == String) {
      const response = await axios.get(
        `http://localhost:5000/api/service/services?category=${category}`
      );
      dispatch({
        type: GET_ROW_SERVICES_SUCCESS,
        payload: { response },
      });
    } else {
      const response = await axios.get(
        `http://localhost:5000/api/service/services?category=${category[0]},${category[1]},${category[2]},${category[3]}`
      );
      dispatch({
        type: GET_ROW_SERVICES_SUCCESS,
        payload: { response },
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ROW_SERVICES_FAIL, payload: error });
  }
};
/// get all services
export const getAllService = (profession, city, rating) => async (dispatch) => {
  dispatch({ type: GET_ALL_SERVICES_LOADING });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/service/search?profession=${profession}&city=${city}&rating=${rating}`
    );
    dispatch({ type: GET_ALL_SERVICES_SUCCESS, payload: response.data });
    console.log(response);
  } catch (error) {
    dispatch({ type: GET_ALL_SERVICES_FAIL, payload: error });
    console.log("error", error);
  }
};
//get user serivce
export const getUserService = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_SERVICE_LOADING });
  try {
    const response = await axios.get(
      `http://localhost:5000/api/service/userservice/${userId}`
    );
    dispatch({
      type: GET_USER_SERVICE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_USER_SERVICE_FAIL, payload: error });
  }
};

//update profession
export const updateProfession = (profession) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: UPDATE_PROFESSION_LOADING });
  try {
    const response = await axios.put(
      "http://localhost:5000/api/service/updateservice",
      profession,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: UPDATE_PROFESSION_SUCCESS,
      payload: response.data,
    });
    dispatch(getProfile());
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_PROFESSION_FAIL,
      payload: error,
    });
  }
};

{
  /**FOLLOW */
}
export const follow = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: FOLLOWING_LOADING });
  try {
    const response = await axios.put(
      `http://localhost:5000/api/service/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: FOLLOWING_SUCCESS,
      payload: response.data,
    });
    dispatch(getUserService(userId));
  } catch (error) {
    console.log(error);
    dispatch({
      type: FOLLOWING_FAIL,
      payload: error,
    });
  }
};
{
  /**UNFOLLOW */
}
export const unfollow = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: UNFOLLOW_LOADING });
  try {
    const response = await axios.put(
      `http://localhost:5000/api/service/unfollow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: UNFOLLOW_SUCCESS,
      payload: response.data,
    });
    dispatch(getUserService(userId));
  } catch (error) {
    console.log(error);
    dispatch({
      type: UNFOLLOW_FAIL,
      payload: error,
    });
  }
};
{
  /** rating */
}

export const rating = (serviceId, ratingNumber, userId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  dispatch({ type: RATING_LOADING });

  try {
    const response = await axios.put(
      `http://localhost:5000/api/service/rating`,
      { serviceId, ratingNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: RATING_SUCCESS,
      payload: response.data,
    });
    dispatch(getUserService(userId));
  } catch (error) {
    console.log(error);
    dispatch({
      type: RATING_FAIL,
      payload: error,
    });
  }
};
/**get followers */
export const getFollowers = (serviceId) => async (dispatch) => {
  dispatch({ type: GET_FOLLOWERS_LOADING });
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `http://localhost:5000/api/service/followres/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: GET_FOLLOWERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_FOLLOWERS_FAIL, payload: error });
  }
};

{
  /** get following */
}

export const getFollowing = (serviceId) => async (dispatch) => {
  dispatch({ type: GET_FOLLOWING_LOADING });
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `http://localhost:5000/api/service/following/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: GET_FOLLOWING_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_FOLLOWING_FAIL, payload: error });
  }
};
