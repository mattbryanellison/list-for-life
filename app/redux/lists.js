import axios from "axios";

const SET_LISTS = "SET_LISTS";
const ADD_LIST = "ADD_LIST";
const UPDATE_LIST = "UPDATE_LIST";
const DELETE_LIST = "DELETE_LIST";

const setLists = (lists) => {
  return {
    type: SET_LISTS,
    lists,
  };
};

const addList = (list) => {
  return {
    type: ADD_LIST,
    list,
  };
};

const updateList = (list) => {
  return {
    type: UPDATE_LIST,
    list,
  };
};

const deleteList = (list) => {
  return {
    type: DELETE_LIST,
    list,
  };
};

export const postList = (list) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/lists", list);
      dispatch(addList(data));
    } catch (err) {
      console.log(err);
      throw new Error("Unable to create list!");
    }
  };
};

export const fetchLists = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/lists");
      dispatch(setLists(data));
    } catch (err) {
      throw new Error("Lists not found!");
    }
  };
};

export const putList = (id, list) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/lists/${id}`, list);
      dispatch(updateList(data));
    } catch (err) {
      console.log(err);
      throw new Error("List not found!");
    }
  };
};

export const deleteListThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/lists/${id}`);
      dispatch(deleteList(id));
    } catch (err) {
      throw new Error("List not found!");
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTS:
      return action.lists;
    case ADD_LIST:
      return [action.list, ...state];
    case UPDATE_LIST:
      return [
        ...state.filter((currentList) => {
          return currentList.id !== action.list.id;
        }),
        action.list,
      ];
    case DELETE_LIST:
      return [
        ...state.filter((currentList) => {
          return currentList.id !== action.id;
        }),
      ];
    default:
      return state;
  }
};
