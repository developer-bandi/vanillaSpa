/** @jsx h */
import h from "../../lib/h";
import "./Home.css";
import "../../banner.jpg";
import { useSelector } from "../../lib/redux";
import Header from "./header";

const Home = () => {
  const contents = useSelector("todoList");
  return (
    <div>
      {Header()}
      <div>
        <img src="banner.jpg" class="homeImg"></img>
      </div>
      <div class="homeTodayDo">
        <p>
          {contents.length === 0
            ? "오늘 할일을 계획해 보세요!"
            : contents.filter((v) => !v.checked).length === 0
            ? "오늘할일을 완료했습니다"
            : `오늘 할일이 ${
                contents.filter((v) => !v.checked).length
              }개 남았습니다`}
        </p>
      </div>
    </div>
  );
};

export default Home;
