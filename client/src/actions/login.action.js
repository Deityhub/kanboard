import axios from "axios";
import { API_URL } from "../config";
import { LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_START, LOGOUT_USER, LOGOUT_USER_ERROR, LOGOUT_USER_START, GET_USER, GET_USER_ERROR, GET_USER_START } from "./action-types";

const loginStart = () => ({
  type: LOGIN_USER_START,
  payload: "login started..."
});

const logoutStart = () => ({
  type: LOGOUT_USER_START,
  payload: "user logout started..."
});

const getUserStart = () => ({
  type: GET_USER_START,
  payload: "Getting this particular user..."
});

export const loginUser = details => dispatch => {
  dispatch(loginStart());

  axios({
    method: "post",
    url: `${API_URL}/user/login`,
    data: details,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: LOGIN_USER_ERROR,
          payload: res.data.error
        });

      dispatch({
        type: LOGIN_USER,
        payload: res.data.message
      });

      localStorage.setItem("kanboarding", true);
      window.location.reload();
    })
    .catch(err =>
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: err
      })
    );
};

export const getUser = () => dispatch => {
  dispatch(getUserStart());

  axios
    .get(`${API_URL}/user`, { withCredentials: true })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: GET_USER_ERROR,
          payload: res.data.error
        });

      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_USER_ERROR,
        payload: err
      })
    );
};

export const logoutUser = () => dispatch => {
  dispatch(logoutStart);

  axios({
    method: "post",
    url: `${API_URL}/user/logout`,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error)
        return dispatch({
          type: LOGOUT_USER_ERROR,
          payload: res.data.error
        });

      dispatch({
        type: LOGOUT_USER,
        payload: res.data.message
      });

      localStorage.removeItem("kanboarding");
      window.location.reload();
    })
    .catch(err =>
      dispatch({
        type: LOGOUT_USER_ERROR,
        payload: err
      })
    );
};
