import axios from "axios";
import { API_URL } from "../config";
import { SIGNUP_USER, SIGNUP_USER_ERROR, SIGNUP_USER_START } from "./action-types";

const signupStart = () => ({
  type: SIGNUP_USER_START,
  payload: "signup started for this user"
});

export const signupUser = details => dispatch => {
  dispatch(signupStart());

  axios({
    method: "post",
    url: `${API_URL}/user/signup`,
    data: details,
    withCredentials: true
  })
    .then(res => {
      if (res.data.error) {
        return dispatch({
          type: SIGNUP_USER_ERROR,
          payload: res.data.error
        });
      }

      dispatch({
        type: SIGNUP_USER,
        payload: res.data.message
      });

      localStorage.setItem("kanboarding", true);
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: SIGNUP_USER_ERROR,
        payload: err
      });
    });
};
