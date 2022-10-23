/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import { useState } from "../../lib/react";
import { useDispatch, useSelector } from "../../lib/redux";

const Counter = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const user = useSelector("user");
  const dispatch = useDispatch();
  return (
    <div>
      <a href="/counter" data-link>
        이동
      </a>
      <div>
        <span>{count1}</span>
        <button onclick={() => setCount1(count1 + 1)}>추가1</button>
      </div>
      <div>
        <span>{count2}</span>
        <button onclick={() => setCount2(count2 + 1)}>추가2</button>
      </div>
      <div>
        {user.map((userinfo) => {
          return (
            <div>
              <div>{userinfo.id}</div>
              <div>{userinfo.name}</div>
            </div>
          );
        })}
        <button
          onclick={() =>
            dispatch("user", "add", { id: "test2", name: "testname2" })
          }
        >
          추가2
        </button>
      </div>
    </div>
  );
};

export default Counter;
