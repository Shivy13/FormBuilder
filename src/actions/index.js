// actions/index.js

export const ADD_FIELD = "ADD_FIELD";
export const REMOVE_FIELD = "REMOVE_FIELD";
export const UPDATE_FIELD = "UPDATE_FIELD";

export const addField = () => ({
  type: ADD_FIELD,
});

export const removeField = (index) => ({
  type: REMOVE_FIELD,
  payload: index,
});

export const updateField = (index, key, value) => ({
  type: UPDATE_FIELD,
  payload: { index, key, value },
});
