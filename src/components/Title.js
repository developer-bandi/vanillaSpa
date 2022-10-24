/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import "./Title.css";
const Title = () => {
  return (
    <div class="mainBlock">
      <h1 class="content">일정 관리</h1>
    </div>
  );
};

export default Title;
