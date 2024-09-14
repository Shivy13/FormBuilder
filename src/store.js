// store.js

import {  legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers"; // Import the combined reducers

// Create the Redux store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // For Redux DevTools
);

export default store;
