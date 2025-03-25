import { state } from "./state.js";

export const MARK_ACTIONS = {
    LOAD_MARKS: Symbol("[MARK] LOAD_MARKS"),
    LOAD_MARKS_SUCCESS: Symbol("[MARK] LOAD_MARKS_SUCCESS"),
    LOAD_MARKS_FAILURE: Symbol("[MARK] LOAD_MARKS_FAILURE"),
};

export function markReducer(currentState, action) {
  console.log(action.type, action);

    switch (action.type) {
      case MARK_ACTIONS.LOAD_MARKS:
        return {
          ...currentState,
          status: { loaded: false, error: false, message: "Loading marks..." }
        };
      case MARK_ACTIONS.LOAD_MARKS_SUCCESS:
        return {
          ...currentState,
          status: { loaded: true, error: false, message: "" },
          marks: action.marks
        };
      case MARK_ACTIONS.LOAD_MARKS_FAILURE:
        return {
          ...currentState,
          status: { loaded: true, error: true, message: action.message }
        };
      default:
        return currentState;
    }
}

export const markStore = state.createStore(markReducer, {
  status: { loaded: false, error: false, message: "" },
  marks: []
});

  