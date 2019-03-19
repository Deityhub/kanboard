import axios from "axios";
import { API_URL } from "../config";
import { GET_USER_PROCESS, GET_USER_PROCESS_ERROR, GET_USER_PROCESS_START, CREATE_PROCESS, CREATE_PROCESS_START, CREATE_PROCESS_ERROR, CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_START, DELETE_PROCESS, DELETE_PROCESS_START, DELETE_PROCESS_ERROR, EDIT_PROCESS, EDIT_PROCESS_START, EDIT_PROCESS_ERROR, DELETE_TASK, DELETE_TASK_START, DELETE_TASK_ERROR, EDIT_TASK, EDIT_TASK_START, EDIT_TASK_ERROR } from "./action-types";

const getUserProcessStart = () => ({
  type: GET_USER_PROCESS_START,
  payload: "Getting user's processes..."
});

export const getUserProcesses = () => dispatch => {
  dispatch(getUserProcessStart());

  axios
    .get(`${API_URL}/user/processes`, { withCredentials: true })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: GET_USER_PROCESS_ERROR,
          payload: res.data.error
        });

      dispatch({
        type: GET_USER_PROCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USER_PROCESS_ERROR,
        payload: err
      })
    );
};

export const createUserProcess = process => dispatch => {
  dispatch({
    type: CREATE_PROCESS_START,
    payload: "Process creation started..."
  });

  axios({
    method: "post",
    url: `${API_URL}/process/create`,
    data: process,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: CREATE_PROCESS_ERROR,
          payload: res.data.error
        });

      dispatch({
        type: CREATE_PROCESS,
        payload: res.data.message
      });

      // refetch the user's processes
      dispatch(getUserProcessStart());

      axios
        .get(`${API_URL}/user/processes`, { withCredentials: true })
        .then(res => {
          if (res.data.error)
            return dispatch({
              type: GET_USER_PROCESS_ERROR,
              payload: res.data.error
            });

          dispatch({
            type: GET_USER_PROCESS,
            payload: res.data
          });
        })
        .catch(err =>
          dispatch({
            type: GET_USER_PROCESS_ERROR,
            payload: err
          })
        );
    })
    .catch(err =>
      dispatch({
        type: CREATE_PROCESS_ERROR,
        payload: err
      })
    );
};

export const editUserProcess = (processId, details) => dispatch => {
  dispatch({
    type: EDIT_PROCESS_START,
    payload: `Process with id ${processId} about to be edited...`
  });

  axios({
    method: "put",
    url: `${API_URL}/process/${processId}`,
    data: details,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: EDIT_PROCESS_ERROR,
          payload: res.data.error
        });

      dispatch({
        type: EDIT_PROCESS,
        payload: res.data.message
      });

      // refetch the user's processes
      dispatch(getUserProcessStart());

      axios
        .get(`${API_URL}/user/processes`, { withCredentials: true })
        .then(res => {
          if (res.data.error)
            return dispatch({
              type: GET_USER_PROCESS_ERROR,
              payload: res.data.error
            });

          dispatch({
            type: GET_USER_PROCESS,
            payload: res.data
          });
        })
        .catch(err =>
          dispatch({
            type: GET_USER_PROCESS_ERROR,
            payload: err
          })
        );
    })
    .catch(err =>
      dispatch({
        type: EDIT_PROCESS_ERROR,
        payload: err
      })
    );
};

export const deleteUserProcess = processId => dispatch => {
  dispatch({
    type: DELETE_PROCESS_START,
    payload: `Process with the id ${processId} about to be deleted...`
  });

  axios
    .delete(`${API_URL}/process/${processId}`, { withCredentials: true })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: DELETE_PROCESS_ERROR,
          payload: res.data.error
        });

      dispatch({
        type: DELETE_PROCESS,
        payload: res.data.message
      });

      // refetch the user's processes
      dispatch(getUserProcessStart());

      axios
        .get(`${API_URL}/user/processes`, { withCredentials: true })
        .then(res => {
          if (res.data.error)
            return dispatch({
              type: GET_USER_PROCESS_ERROR,
              payload: res.data.error
            });

          dispatch({
            type: GET_USER_PROCESS,
            payload: res.data
          });
        })
        .catch(err =>
          dispatch({
            type: GET_USER_PROCESS_ERROR,
            payload: err
          })
        );
    })
    .catch(err => {
      dispatch({
        type: DELETE_PROCESS_ERROR,
        payload: err
      });
    });
};

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

      dispatch({
        type: CREATE_TASK,
        payload: res.data.message
      });

      // refetch the user's processes
      dispatch(getUserProcessStart());

      axios
        .get(`${API_URL}/user/processes`, { withCredentials: true })
        .then(res => {
          if (res.data.error)
            return dispatch({
              type: GET_USER_PROCESS_ERROR,
              payload: res.data.error
            });

          dispatch({
            type: GET_USER_PROCESS,
            payload: res.data
          });
        })
        .catch(err =>
          dispatch({
            type: GET_USER_PROCESS_ERROR,
            payload: err
          })
        );
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

      dispatch({
        type: EDIT_TASK,
        payload: res.data.message
      });

      // refetch the user's processes
      dispatch(getUserProcessStart());

      axios
        .get(`${API_URL}/user/processes`, { withCredentials: true })
        .then(res => {
          if (res.data.error)
            return dispatch({
              type: GET_USER_PROCESS_ERROR,
              payload: res.data.error
            });

          dispatch({
            type: GET_USER_PROCESS,
            payload: res.data
          });
        })
        .catch(err =>
          dispatch({
            type: GET_USER_PROCESS_ERROR,
            payload: err
          })
        );
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

      dispatch({
        type: DELETE_TASK,
        payload: res.data.message
      });

      // refetch the user's processes
      dispatch(getUserProcessStart());

      axios
        .get(`${API_URL}/user/processes`, { withCredentials: true })
        .then(res => {
          if (res.data.error)
            return dispatch({
              type: GET_USER_PROCESS_ERROR,
              payload: res.data.error
            });

          dispatch({
            type: GET_USER_PROCESS,
            payload: res.data
          });
        })
        .catch(err =>
          dispatch({
            type: GET_USER_PROCESS_ERROR,
            payload: err
          })
        );
    })
    .catch(err =>
      dispatch({
        type: DELETE_TASK_ERROR,
        payload: err
      })
    );
};
