import { _render } from "./react";

const store = {};
const reducers = {};

// 스토어에 특정 이름에 해당하는 초기값과 리듀서를 저장합니다.
export const createStore = (name, reducer, initialState) => {
  store[name] = initialState;
  reducers[name] = reducer;
};

// 스토어의 데이터를 바꾸기위한 dispatch함수를 리턴하는 함수입니다.
// dispatch함수는 이름에 해당하는 리듀서에 액션을 적용하여서 바뀐 결과를 스토어에 반영합니다
export const useDispatch = () => {
  return (name, action, payload) => {
    const newState = reducers[name](action, payload, store[name]);
    store[name] = newState;
    _render();
  };
};

// 값을 읽어오는 함수입니다.
// 이값은 변경할수 없습니다.
export const useSelector = (state) => {
  return store[state];
};
