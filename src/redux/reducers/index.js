import { combineReducers } from "redux";
import userReducer from "./user_reducers";

export default combineReducers({
  user_ac_activity: userReducer
});