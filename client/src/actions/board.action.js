import axios from "axios";
import { API_URL } from "../config";
import { GET_USER_BOARD, GET_USER_BOARD_START, GET_USER_BOARD_ERROR, CREATE_BOARD, CREATE_BOARD_START, CREATE_BOARD_ERROR, EDIT_BOARD, EDIT_BOARD_START, EDIT_BOARD_ERROR, DELETE_BOARD, DELETE_BOARD_START, DELETE_BOARD_ERROR, GET_BOARD, GET_BOARD_START, GET_BOARD_ERROR } from "./action-types";

export const getBoard = boardId => dispatch => {
  dispatch({ type: GET_BOARD_START, payload: `getting board with id ${boardId}` });

  axios
    .get(`${API_URL}/boards/${boardId}`, { withCredentials: true })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: GET_BOARD_ERROR,
          payload: res.data.error
        });

      // res.data contains an object of message and board
      dispatch({
        type: GET_BOARD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_BOARD_ERROR,
        payload: err
      })
    );
};

export const getUserBoard = () => dispatch => {
  dispatch({ type: GET_USER_BOARD_START, payload: "about to get the users board..." });

  axios
    .get(`${API_URL}/user/boards`, { withCredentials: true })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: GET_USER_BOARD_ERROR,
          payload: res.data.error
        });

      // res.data contains an object of count and boards
      dispatch({
        type: GET_USER_BOARD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USER_BOARD_ERROR,
        payload: err
      })
    );
};

export const createUserBoard = details => dispatch => {
  dispatch({ type: CREATE_BOARD_START, payload: "board about to be created..." });

  axios({
    method: "post",
    url: `${API_URL}/user/board`,
    data: details,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: CREATE_BOARD_ERROR,
          payload: res.data.error
        });

      // res.data is an object of message and board
      dispatch({
        type: CREATE_BOARD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: CREATE_BOARD_ERROR,
        payload: err
      })
    );
};

export const modifyUserBoard = (details, boardId) => dispatch => {
  dispatch({
    type: EDIT_BOARD_START,
    payload: {
      message: `board with the id ${boardId} about to be modified`,
      details,
      boardId
    }
  });

  axios({
    method: "put",
    url: `${API_URL}/boards/${boardId}`,
    data: details,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: EDIT_BOARD_ERROR,
          payload: res.data.error
        });

      // res.data is an object of message and board
      dispatch({
        type: EDIT_BOARD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: EDIT_BOARD_ERROR,
        payload: err
      })
    );
};

export const deleteUserBoard = boardId => dispatch => {
  dispatch({
    type: DELETE_BOARD_START,
    payload: {
      message: `board with the id ${boardId} about to be deleted`,
      boardId
    }
  });

  axios({
    method: "delete",
    url: `${API_URL}/boards/${boardId}`,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: DELETE_BOARD_ERROR,
          payload: res.data.error
        });

      // res.data is an object of message and deletedBoard
      dispatch({
        type: DELETE_BOARD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: DELETE_BOARD_ERROR,
        payload: err
      })
    );
};
