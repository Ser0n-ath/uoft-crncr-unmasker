export let state = (function () {
  "use strict";

  let module = {};

  /**
   * Creates a simple store with a reducer, initial state, and subscriptions.
   * @param {Function} reducer - Function to handle state updates.
   * @param {*} preloadedState - The initial state.
   * @returns {Object} The store with getState, subscribe, and dispatch functions.
   */
  module.createStore = function (reducer, preloadedState) {
    let currentState = preloadedState;
    let listeners = [];

    function getState() {
      return currentState;
    }

    function subscribe(listener) {
      listeners.push(listener);
      // Return an unsubscribe function.
      return function unsubscribe() {
        listeners = listeners.filter(l => l !== listener);
      };
    }

    function dispatch(action) {
      currentState = reducer(currentState, action);
      listeners.forEach(listener => listener());
    }

    // Initialize the store.
    dispatch({ type: '@@INIT' });

    return { getState, subscribe, dispatch };
  };

  return module;
})();
