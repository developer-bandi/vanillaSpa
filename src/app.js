/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import { createStore } from "../lib/redux";
import { Router } from "../lib/router";
import info from "./store";
import TodoList from "./components/TodoList";
import Home from "./components/Home";

const App = () => {
  createStore(info.name, info.reducer, info.initialState);
  return (
    <Router>
      <route path="/" element={Home} />
      <route path="/todolist" element={TodoList} />
    </Router>
  );
};

export default App;
