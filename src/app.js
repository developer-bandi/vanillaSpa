/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children };
}
import { Router } from "../lib/router";
import Counter from "./components/counter";
import Counter2 from "./components/counter2";

const App = () => {
  return (
    <Router>
      <route path="/" element={Counter} />
      <route path="/counter" element={Counter2} />
    </Router>
  );
};

export default App;
