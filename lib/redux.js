import { navigateTo } from "./router";

const store = {};
const reducers = {};

export const createStore = (name, reducer, initialState) => {
  console.log(reducer, "reducer입니다");
  store[name] = initialState;
  reducers[name] = reducer;
};

export const useDispatch = () => {
  return (name, action, payload) => {
    console.log(store);
    console.log(reducers);
    const newState = reducers[name](action, payload, store[name]);
    store[name] = newState;
    navigateTo(window.location.pathname);
  };
};

export const useSelector = (state) => {
  console.log("123123123123");
  console.log(store);
  console.log(state);
  return store[state];
};
