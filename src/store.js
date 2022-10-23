const initialState = [{ id: "test1", name: "testname1" }];

const reducer = (action, payload, state) => {
  switch (action) {
    case "add":
      return [...state, payload];
    case "delete":
      const newState = [...state];
      newState.pop();
      return [...newState];
  }
};
const info = { name: "user", reducer, initialState };
export default info;
