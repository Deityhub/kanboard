import { SIGNUP_USER, SIGNUP_USER_ERROR, SIGNUP_USER_START } from "../actions/action-types";

const initialState = {
  loading: false,
  error: "",
  message: ""
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: ""
      };
    case SIGNUP_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        message: "",
        loading: false
      };
    case SIGNUP_USER_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: ""
      };
    default:
      return state;
  }
};

export default signup;
