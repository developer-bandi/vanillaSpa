/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import "./Home.css";
const Home = () => {
  return (
    <div>
      <h1 class="homeTitle">
        <a href="/todolist" data-link>
          일정관리로 이동하기
        </a>
      </h1>
    </div>
  );
};

export default Home;
