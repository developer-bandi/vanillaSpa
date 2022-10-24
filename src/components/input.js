/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import { useState } from "../../lib/react";
import { useDispatch } from "../../lib/redux";
import "./input.css";
const Input = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  let ref = content;
  return (
    <div class="inputMainBlock">
      <input
        value={content}
        onkeyup={(e) => {
          ref = e.target.value;
        }}
        class="input"
      />
      <button
        onclick={() => {
          setContent(ref);
          dispatch("todoList", "add", { checked: false, content: ref });
        }}
        class="addButton"
      >
        추가
      </button>
    </div>
  );
};

export default Input;
