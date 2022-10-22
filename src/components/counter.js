/** @jsx h */
function h(type, props, ...children) {
  return { type, props, children };
}
import { useState } from "../../lib/react";

const Counter = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  console.log(count1, count2);
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
    </div>
  );
};

export default Counter;
