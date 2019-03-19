import axios from "axios";
import { API_URL } from "../config";
import { CREATE_PROCESS, CREATE_PROCESS_START, CREATE_PROCESS_ERROR, DELETE_PROCESS, DELETE_PROCESS_START, DELETE_PROCESS_ERROR, EDIT_PROCESS, EDIT_PROCESS_START, EDIT_PROCESS_ERROR, GET_PROCESS, GET_PROCESS_START, GET_PROCESS_ERROR } from "./action-types";

export const getProcessByBoard = boardId => dispatch => {
  dispatch({
    type: GET_PROCESS_START,
    payload: "Getting processes in this board"
  });

  axios
    .get(`${API_URL}/processes/${boardId}`, { withCredentials: true })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: GET_PROCESS_ERROR,
          payload: res.data.error
        });

      // res.data is an object of count and processes
      dispatch({
        type: GET_PROCESS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROCESS_ERROR,
        payload: err
      })
    );
};

export const createUserProcess = (details, boardId) => dispatch => {
  dispatch({
    type: CREATE_PROCESS_START,
    payload: "Process creation started..."
  });

  axios({
    method: "post",
    url: `${API_URL}/process/${boardId}/create`,
    data: details,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: CREATE_PROCESS_ERROR,
          payload: res.data.error
        });

      // res.data is an object of message and process
      dispatch({
        type: CREATE_PROCESS,
        payload: res.data
      });

      // find a way to populate the process or
      // refetch that particular board or process
      // getProcessByBoard(boardId)(dispatch);
    })
    .catch(err =>
      dispatch({
        type: CREATE_PROCESS_ERROR,
        payload: err
      })
    );
};

export const modifyUserProcess = (details, processId) => dispatch => {
  dispatch({
    type: EDIT_PROCESS_START,
    payload: `Editing process with id ${processId}`
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

      // res.data is an object of message and process
      dispatch({
        type: EDIT_PROCESS,
        payload: res.data
      });

      // find a way to populate the process or
      // refetch that particular board or process
      // getProcessByBoard(boardId)(dispatch);
    })
    .catch(err =>
      dispatch({
        type: EDIT_PROCESS_ERROR,
        payload: err
      })
    );
};

export const deleteUserProcess = (processId, boardId) => dispatch => {
  dispatch({ type: DELETE_PROCESS_START, payload: `process with the id ${processId} about to be deleted` });

  axios({
    method: "delete",
    url: `${API_URL}/process/${boardId}/${processId}`,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: DELETE_PROCESS_ERROR,
          payload: res.data.error
        });

      // res.data is an object of message and deletedProcess
      dispatch({
        type: DELETE_PROCESS,
        payload: res.data
      });

      // find a way to populate the process or
      // refetch that particular board or process
      // getProcessByBoard(boardId)(dispatch);
    })
    .catch(err =>
      dispatch({
        type: DELETE_PROCESS_ERROR,
        payload: err
      })
    );
};
