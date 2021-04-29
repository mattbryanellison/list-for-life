import axios from "axios";
import history from "../history";

const SIGNUP_USER = `SIGNUP_USER`;
const LOGIN_USER = `LOGIN_USER`;
const LOGOUT_USER = `LOGOUT_USER`;

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

export const logoutUser = (user) => {
  return {
    type: LOGOUT_USER,
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
      throw new Error("Login failed!");
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

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return action.user;
    case LOGIN_USER:
      return action.user;
    case LOGOUT_USER:
      return action.user;
    default:
      return state;
  }
};
