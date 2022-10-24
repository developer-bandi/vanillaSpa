/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import Input from "./input";
import Item from "./item";
import Title from "./Title";
import { useSelector } from "../../lib/redux";
import "./TodoList.css";

const TodoList = () => {
  const contents = useSelector("todoList");
  return (
    <div>
      <a href="/" data-link>
        홈으로 이동
      </a>
      <div class="todoListMainBlock">
        {Title()}
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
