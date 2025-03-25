import { state } from "./state.js";

export const APP_ACTIONS = {
    LOAD_PAGE: Symbol("[APP] LOAD_PAGE"),
    LOAD_PAGE_SUCCESS: Symbol("[APP] LOAD_PAGE_SUCCESS"),
    LOAD_PAGE_FAILURE: Symbol("[APP] LOAD_PAGE_FAILURE"),
};

export function appReducer(currentState, action) {
  console.log(action.type, action);

    switch (action.type) {
      case APP_ACTIONS.LOAD_PAGE:
        return {
          ...currentState,
          status: { loaded: false, error: false, message: "Loading page..." }
        };
      case APP_ACTIONS.LOAD_PAGE_SUCCESS:
        return {
          ...currentState,
          status: { loaded: true, error: false, message: "" }
        };
      case APP_ACTIONS.LOAD_PAGE_FAILURE:
        return {
          ...currentState,
          status: { loaded: true, error: true, message: action.message }
        };
      default:
        return currentState;
    }
}

export const appStore = state.createStore(appReducer, {
  status: { loaded: false, error: false, message: "" }
});



