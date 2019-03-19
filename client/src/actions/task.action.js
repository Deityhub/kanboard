import axios from "axios";
import { API_URL } from "../config";
import { CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_START, DELETE_TASK, DELETE_TASK_START, DELETE_TASK_ERROR, EDIT_TASK, EDIT_TASK_START, EDIT_TASK_ERROR } from "./action-types";

export const createUserTask = (task, processId) => dispatch => {
  dispatch({
    type: CREATE_TASK_START,
    payload: "Task creation started..."
  });

  axios({
    method: "post",
    url: `${API_URL}/task/create/${processId}`,
    data: task,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: CREATE_TASK_ERROR,
          payload: res.data.error
        });

      // res.data is an object of message, process and task
      dispatch({
        type: CREATE_TASK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: CREATE_TASK_ERROR,
        payload: err
      })
    );
};

export const editUserTask = (processId, taskId) => dispatch => {
  dispatch({
    type: EDIT_TASK_START,
    payload: `Task with id ${taskId} is being edited...`
  });

  axios({
    method: "put",
    url: `${API_URL}/task/${processId}/${taskId}`,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: EDIT_TASK_ERROR,
          payload: res.data.error
        });

      // res.data is an object of message, task, newProcess and oldProcess
      dispatch({
        type: EDIT_TASK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: EDIT_TASK_ERROR,
        payload: err
      })
    );
};

export const deleteUserTask = (processId, taskId) => dispatch => {
  dispatch({
    type: DELETE_TASK_START,
    payload: `Task with the id ${taskId} about to be deleted...`
  });

  axios
    .delete(`${API_URL}/task/${processId}/${taskId}`, { withCredentials: true })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: DELETE_TASK_ERROR,
          payload: res.data.error
        });

      //res.data is an object of message, process and task
      dispatch({
        type: DELETE_TASK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: DELETE_TASK_ERROR,
        payload: err
      })
    );
};
