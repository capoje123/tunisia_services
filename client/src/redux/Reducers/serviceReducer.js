import {
  ADD_SERVICE_FAIL,
  ADD_SERVICE_LOADING,
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_LOADING,
  GET_ALL_SERVICES_FAIL,
  GET_ALL_SERVICES_LOADING,
  GET_ALL_SERVICES_SUCCESS,
  GET_CURRENT_SERVICE_FAIL,
  GET_CURRENT_SERVICE_loading,
  GET_CURRENT_SERVICE_SUCCESS,
  GET_ROW_SERVICES_FAIL,
  GET_ROW_SERVICES_LOADING,
  GET_ROW_SERVICES_SUCCESS,
  GET_USER_SERVICE_FAIL,
  GET_USER_SERVICE_LOADING,
  GET_USER_SERVICE_SUCCESS,
  UPDATE_PROFESSION_FAIL,
  UPDATE_PROFESSION_LOADING,
  UPDATE_PROFESSION_SUCCESS,
  UPLOAD_MULTIPLE_IMAGES_FAIL,
  UPLOAD_MULTIPLE_IMAGES_LOADING,
  UPLOAD_MULTIPLE_IMAGES_SUCCESS,
  FOLLOWING_FAIL,
  FOLLOWING_LOADING,
  FOLLOWING_SUCCESS,
  UNFOLLOW_FAIL,
  UNFOLLOW_LOADING,
  UNFOLLOW_SUCCESS,
  RATING_LOADING,
  RATING_SUCCESS,
  RATING_FAIL,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_LOADING,
  GET_FOLLOWERS_FAIL,
  GET_FOLLOWING_LOADING,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOWING_FAIL,
} from "../Consts/serviceConsts";

const initialState = {
  error: [],
  currentService: {},
  allService: [],
  rowServices: [],
  followers: [],
  following: [],
  userService: {},
  loading: false,
};

export const serviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_SERVICE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_SERVICE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_CURRENT_SERVICE_loading:
      return {
        ...state,
        loading: true,
      };
    case GET_CURRENT_SERVICE_SUCCESS:
      return { ...state, loading: false, currentService: payload };
    case GET_CURRENT_SERVICE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPLOAD_MULTIPLE_IMAGES_LOADING:
      return { ...state, loading: true };
    case UPLOAD_MULTIPLE_IMAGES_FAIL:
      return { ...state, errors: payload, loading: false };
    case UPLOAD_MULTIPLE_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_IMAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_IMAGE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_ROW_SERVICES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ROW_SERVICES_SUCCESS: {
      return {
        ...state,
        rowServices: payload.response.data,
        loading: false,
      };
    }
    case GET_ROW_SERVICES_FAIL: {
      return { ...state, error: payload, loading: false };
    }
    case GET_ALL_SERVICES_FAIL:
      return { ...state, error: payload, loading: false };

    case GET_ALL_SERVICES_LOADING:
      return { ...state, loading: true };

    case GET_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        allService: payload,
        loading: false,
      };
    case GET_USER_SERVICE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SERVICE_FAIL:
      return { ...state, error: payload, loading: false };
    case GET_USER_SERVICE_SUCCESS:
      return {
        ...state,
        userService: payload.data,
        loading: false,
      };
    case UPDATE_PROFESSION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFESSION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PROFESSION_FAIL:
      return { ...state, error: payload, loading: false };

    case FOLLOWING_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FOLLOWING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FOLLOWING_FAIL:
      return { ...state, error: payload, loading: false };

    case RATING_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RATING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RATING_FAIL:
      return { ...state, error: payload, loading: false };

    case FOLLOWING_FAIL:
      return { ...state, error: payload, loading: false };

    case RATING_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RATING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case RATING_FAIL:
      return { ...state, error: payload, loading: false };

    case GET_FOLLOWERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: payload.data,
        loading: false,
      };
    case GET_FOLLOWERS_FAIL:
      return { ...state, error: payload, loading: false };

    case GET_FOLLOWING_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: payload.data,
        loading: false,
      };
    case GET_FOLLOWING_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
