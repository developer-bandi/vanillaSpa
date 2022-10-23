/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import { createStore } from "../lib/redux";
import { Router } from "../lib/router";
import Counter from "./components/counter";
import Counter2 from "./components/counter2";
import info from "./store";

const App = () => {
  createStore(info.name, info.reducer, info.initialState);
  return (
    <Router>
      <route path="/" element={Counter} />
      <route path="/counter" element={Counter2} />
    </Router>
  );
};

export default App;
