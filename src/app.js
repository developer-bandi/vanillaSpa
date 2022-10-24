/** @jsx h */
import h from "../lib/h";
import { Route, Routes } from "../lib/router";
import TodoList from "./components/TodoList";
import Home from "./components/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/todolist" element={TodoList} />
    </Routes>
  );
};

export default App;
