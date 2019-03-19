import { combineReducers } from "redux";
import dashboard from "./dashboard.reducer";
import signup from "./signup.reducer";
import login from "./login.reducer";

const rootReducer = combineReducers({
  dashboard,
  signup,
  login
});

export default rootReducer;
