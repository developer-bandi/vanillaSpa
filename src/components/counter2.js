/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}
import { useState } from "../../lib/react";

const Counter2 = () => {
  const [count1, setCount1] = useState(10);
  const [count2, setCount2] = useState(100);
  console.log(count1, count2);
  return (
    <div>
      <a href="/" data-link>
        이동
      </a>
      <div>
        <span>{count1}</span>
        <button onclick={() => setCount1(count1 + 10)}>추가10</button>
      </div>
      <div>
        <span>{count2}</span>
        <button onclick={() => setCount2(count2 + 10)}>추가20</button>
      </div>
    </div>
  );
};

export default Counter2;
