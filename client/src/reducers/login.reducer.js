import { LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_START, LOGOUT_USER, LOGOUT_USER_ERROR, LOGOUT_USER_START, GET_USER, GET_USER_START, GET_USER_ERROR } from "../actions/action-types";

const initialState = {
  user: {},
  loggedIn: false,
  loading: false,
  error: "",
  message: ""
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        message: action.payload,
        error: ""
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: "",
        loggedIn: false
      };
    case LOGIN_USER_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case GET_USER_START:
      return {
        ...state,
        loading: true,
        message: action.payload,
        error: ""
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload,
        loggedIn: false
      };
    case LOGOUT_USER_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case LOGOUT_USER_ERROR:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    default:
      return state;
  }
};

export default login;
