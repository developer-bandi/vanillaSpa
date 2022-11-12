/** @jsx h */
import h from "../../lib/h";
import Input from "./input";
import Item from "./item";
import { useSelector } from "../../lib/redux";
import "./TodoList.css";
import Header from "./header";

const TodoList = () => {
  const contents = useSelector("todoList");
  return (
    <div>
      {Header()}
      <div class="todoListMainBlock">
        {Input()}
        <div class="todoListItems">
          {contents.map((content, index) => {
            return Item(content.content, content.checked, index);
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
