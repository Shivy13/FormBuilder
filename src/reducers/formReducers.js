// reducers/formReducer.js
import { ADD_FIELD, REMOVE_FIELD, UPDATE_FIELD } from "../actions";

const initialState = {
  fields: [{ label: "", value: "", type: "text" }], // Each field now has a label, value, and type
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        fields: [...state.fields, { label: "", value: "", type: "text" }],
      };
    case REMOVE_FIELD:
      return {
        ...state,
        fields: state.fields.filter((_, index) => index !== action.payload),
      };
    case UPDATE_FIELD:
      return {
        ...state,
        fields: state.fields.map((field, index) =>
          index === action.payload.index
            ? { ...field, [action.payload.key]: action.payload.value }
            : field
        ),
      };
    default:
      return state;
  }
};

export default formReducer;
