import axios from "axios";

const SET_TASKS = "SET_TASKS";
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_LIST_TITLE = "UPDATE_LIST_TITLE";

export const setTasks = (tasks) => {
  return {
    type: SET_TASKS,
    tasks,
  };
};

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    task,
  };
};

export const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    task,
  };
};

export const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    id,
  };
};

export const updateListTitle = (updatedList) => {
  return {
    type: UPDATE_LIST_TITLE,
    updatedList,
  };
};

export const postTask = (task, id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/lists/${id}/tasks/`, task);
      dispatch(addTask(data));
    } catch (err) {
      throw new Error("Task not found!");
    }
  };
};

export const fetchTasks = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/lists/${id}`);
      dispatch(setTasks(data));
    } catch (err) {
      throw new Error("Tasks not found!");
    }
  };
};

export const putTask = (listId, taskId, task) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/lists/${listId}/tasks/${taskId}`,
        task
      );
      dispatch(updateTask(data));
    } catch (err) {
      throw new Error("Task not found!");
    }
  };
};

export const deleteTaskThunk = (listId, taskId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/lists/${listId}/tasks/${taskId}`
      );
      dispatch(deleteTask(taskId));
    } catch (err) {
      throw new Error("Task not found!");
    }
  };
};

export const updateListTitleThunk = (id, list) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/lists/${id}`, list);
      dispatch(updateListTitle(data));
    } catch (err) {
      console.log(err);
      throw new Error("List not found!");
    }
  };
};

const initialState = { tasks: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return action.tasks;
    case ADD_TASK:
      return { ...state, tasks: [action.task, ...state.tasks] };
    case UPDATE_TASK:
      const updatedTasks = state.tasks.filter((currentTask) => {
        return currentTask.id !== action.task.id;
      });
      updatedTasks.push(action.task);
      return { ...state, tasks: updatedTasks };
    case DELETE_TASK:
      const deletedTasks = state.tasks.filter((currentTask) => {
        return currentTask.id !== action.id;
      });
      return { ...state, tasks: deletedTasks };
    case UPDATE_LIST_TITLE:
      return { ...action.updatedList, tasks: [...state.tasks] };
    default:
      return state;
  }
};
