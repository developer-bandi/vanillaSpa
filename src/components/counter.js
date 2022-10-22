import { useState, setEvent } from "../../lib/react";

const Counter = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return `<div>
  <div>${count1}</div>
  <button class="${setEvent("click", () => {
    setCount1(count1 + 1);
  })}">추가1</button>
  <div>${count2}</div>
  <button class="${setEvent("click", () =>
    setCount2(count2 + 1)
  )}">추가2</button>
  </div>`;
};

export default Counter;
