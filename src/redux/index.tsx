import { combineReducers } from "redux";
import authreducer from "./authreducer";

const rootReducer = combineReducers({
  auth: authreducer,
});

export default rootReducer;
