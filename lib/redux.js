import { navigateTo } from "./router";

const store = {};
const reducers = {};

export const createStore = (name, reducer, initialState) => {
  store[name] = initialState;
  reducers[name] = reducer;
};

export const useDispatch = () => {
  return (name, action, payload) => {
    const newState = reducers[name](action, payload, store[name]);
    store[name] = newState;
    navigateTo(window.location.pathname);
  };
};

export const useSelector = (state) => {
  return store[state];
};
