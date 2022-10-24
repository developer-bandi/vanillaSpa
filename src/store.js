const initialState = [];

const reducer = (action, payload, state) => {
  console.log("들어온값", payload);
  switch (action) {
    case "add":
      return [...state, payload];
    case "check":
      const newChekedState = [...state];
      newChekedState[payload].checked = !newChekedState[payload].checked;
      return newChekedState;
    case "delete":
      const newDeletedState = [...state];
      newDeletedState.splice(payload, 1);
      return newDeletedState;
  }
};
const info = { name: "todoList", reducer, initialState };
export default info;
