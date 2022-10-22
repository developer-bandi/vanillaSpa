function React() {
  const options = {
    stateCount: 0,
    changeStateCount: 0,
    states: [],
    rootDom: null,
    rootComponent: null,
    handlers: [],
  };

  function useState(initialState) {
    console.log(options.stateCount);
    console.log(options.states);
    if (options.stateCount === options.states.length) {
      options.states[options.stateCount] = initialState;
    }
    const index = options.stateCount;
    const state = options.states[index];
    function setState(changeState) {
      if (state === changeState) return;
      if (JSON.stringify(changeState) === JSON.stringify(state)) return;
      options.states[index] = changeState;
      if (options.changeStateCount === 0) {
        setTimeout(() => subRender(options.rootComponent, options.rootDom), 16);
      }
      options.changeStateCount++;
    }
    options.stateCount++;
    return [state, setState];
  }

  const render = (rootComponent, dom) => {
    options.rootDom = dom;
    options.rootComponent = rootComponent;
    subRender(rootComponent, dom);
  };

  const subRender = (rootComponent, rootDom) => {
    options.handlers = []; // 렌더링 전에 이전에 담아둔 핸들러 배열을 초기화한다.
    rootDom.innerHTML = rootComponent();
    options.stateCount = 0;
    options.changeStateCount = 0;
    console.log(options.handlers);
    options.handlers.forEach((data) => {
      console.log(data[0]);
      document.querySelector(`.${data[0]}`).addEventListener(data[1], data[2]);
    });
  };

  // 이벤트를 설정하기 위한 함수
  // 핸들러와 타입을 배열에 담아두고, 클래스 이름을 반환한다. 클래스 이름은 임의의 해시값이다.
  const setEvent = (type, handler) => {
    const className = `event${options.handlers.length}`;
    options.handlers.push([className, type, handler]);
    return className;
  };

  return { useState, render, setEvent };
}
const output = React();
export const useState = output.useState;
export const render = output.render;
export const setEvent = output.setEvent;
