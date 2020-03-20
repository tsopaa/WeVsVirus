import { UPDATE_ACCESSIBLE } from "../actions/app.js";

const INITIAL_STATE = {
  accessible: false
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ACCESSIBLE:
      return {
        ...state,
        accessible: action.accessible
      };
    default:
      return state;
  }
};

export default app;
