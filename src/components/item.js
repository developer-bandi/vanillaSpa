/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import { useDispatch } from "../../lib/redux";
import "./item.css";

const Item = (content, checked, index) => {
  const dispatch = useDispatch();
  console.log(checked);
  return (
    <div class="itemMainBlock">
      {checked ? (
        <input
          type="checkbox"
          checked
          class="itemCheckbox"
          onclick={() => {
            dispatch("todoList", "check", index);
          }}
        />
      ) : (
        <input
          type="checkbox"
          class="itemCheckbox"
          onclick={() => {
            dispatch("todoList", "check", index);
          }}
        />
      )}
      {checked ? (
        <div class="itemCheckedContent">{content}</div>
      ) : (
        <div class="itemContent">{content}</div>
      )}

      <button
        class="itemDeleteButton"
        onclick={() => {
          dispatch("todoList", "delete", index);
        }}
      >
        삭제
      </button>
    </div>
  );
};

export default Item;
