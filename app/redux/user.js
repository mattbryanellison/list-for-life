import axios from "axios";
import history from "../history";

const SIGNUP_USER = `SIGNUP_USER`;
const LOGIN_USER = `LOGIN_USER`;
const UPDATE_USER = "UPDATE_USER";
const LOGOUT_USER = `LOGOUT_USER`;
const LOGIN_ERROR = "LOGIN_ERROR";
const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";
const GET_ME = `GET_ME`;

export const signupUser = (user) => {
  return {
    type: SIGNUP_USER,
    user,
  };
};

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    user,
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};
export const logoutUser = (user) => {
  return {
    type: LOGOUT_USER,
    user,
  };
};

export const loginError = (userError) => {
  return {
    type: LOGIN_ERROR,
    userError,
  };
};

export const clearLoginError = () => {
  return {
    type: CLEAR_LOGIN_ERROR,
    userError: {},
  };
};

export const getMe = (user) => {
  return {
    type: GET_ME,
    user,
  };
};

export const postUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users/signup/", user);
      dispatch(signupUser(data));
      history.push("/home");
    } catch (err) {
      throw new Error("User not found!");
    }
  };
};

export const fetchUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users/login/", user);
      dispatch(loginUser(data));
      history.push("/home");
    } catch (err) {
      dispatch(loginError({ id: null, error: "Error logging in" }));
    }
  };
};

//edit user info
export const editUser = (id, user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${id}`, user);
      dispatch(updateUser(data));
    } catch (err) {
      console.log(err);
      throw new Error("User not found!");
    }
  };
};

export const endSessionUser = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users/logout");
      dispatch(logoutUser(data));
    } catch (err) {
      throw new Error("User not logged out!");
    }
  };
};

export const getMeThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/auth/me");
      dispatch(getMe(data));
    } catch (err) {
      dispatch(getMe({ id: false }));
    }
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return action.user;
    case LOGIN_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    case LOGOUT_USER:
      return action.user;
    case LOGIN_ERROR:
      return action.userError;
    case CLEAR_LOGIN_ERROR:
      return action.userError;
    case GET_ME:
      return action.user;
    default:
      return state;
  }
};
