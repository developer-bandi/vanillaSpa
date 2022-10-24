/** @jsx h */
import h from "../../lib/h";
import { Link } from "../../lib/router";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1 class="homeTitle">
        <Link href="/todolist" data-link>
          일정관리로 이동하기
        </Link>
      </h1>
    </div>
  );
};

export default Home;
