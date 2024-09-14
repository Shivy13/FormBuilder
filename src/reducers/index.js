// reducers/index.js

import { combineReducers } from "redux";
import formReducer from "./formReducers";

export default combineReducers({
    form: formReducer,
  });
