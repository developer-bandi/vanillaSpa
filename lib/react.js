function React() {
  const options = {
    states: [], // 여러개의 상태값을 보관
    stateCount: 0, // 저장된 상태값 개수를 관리
    changeStateCount: 0, // 16ms내에 변경된 값을 동시에 반영하기 위한 값
    rootNode: null, //index.html 이가지고 있는 실제 dom
    rootNextNode: null, // 수정을 위해 사용하는 최상위 부모 dom
    oldNode: null, // 이전에 사용한 가상돔
    handlers: {}, // 이벤트 핸들러 보관
    rootComponent: null, // 최상위 컴포넌트 함수
  };

  // react의 useState와 유사합니다.
  // 값은 외부에서 관리합니다.
  // setState와 데이터를 반환하는데, setState를 실행하면 리렌더링을 합니다 이때 리액트처럼 16ms내에 실행된 리렌더링은 한번에 처리합니다
  function useState(initialState) {
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
        setTimeout(() => {
          _render();
        }, 16);
      }
      options.changeStateCount++;
    }
    options.stateCount++;
    return [state, setState];
  }

  // 가상돔을 실제 돔객체로 바꾸어주는 함수입니다.
  // jsx를 변환한 객체에 대해서 텍스트 노드의 경우 텍스트 노드를 리턴하고 그외의 경우 재귀적으로 노드를 생성합니다
  function createElement(node) {
    if (typeof node !== "object") {
      return document.createTextNode(node);
    }

    const rootnode = document.createElement(node.type);
    if (node.props !== null) {
      Object.keys(node.props).forEach((attribute) => {
        if (attribute.indexOf("on") !== -1) {
          rootnode.addEventListener(
            attribute.substring(2),
            node.props[attribute]
          );
          options.handlers[node.props[attribute].toString()] =
            node.props[attribute];
        }
        rootnode.setAttribute(attribute, node.props[attribute]);
      });
    }
    node.children.forEach((children) => {
      const childerenNode = createElement(children);
      rootnode.appendChild(childerenNode);
    });
    return rootnode;
  }

  // 돔을 비교하여 업데이트 하는 함수입니다.
  // 부모노드와 새노드 옛날노드 그리고 부모노드로부터 몇번째노드인지를 알기위한 인덱스를 인자로 받습니다.
  // 업데이트시 첫번째 실행되는 updateNode이면 oldNode에 저장해 줍니다
  // 다음은 조건에 따라 이전 노드가 없는경우, 새노드가 없는경우, 둘다 객체가 아닌경우, 둘의 타입이 같은경우와 다른경우를 따져 조건부로 적용합니다
  // 이전 노드가 없는경우 새노드를 만들어 부모노드에 추가합니다.
  // 새 노드가 없는경우 이전노드를 삭제합니다
  // 타입이 둘다 객체가 아닌경우 두노드가 다르면 새노드로 교체합니다.(텍스트, 숫자 노드가 여기에 해당합니다)
  // 타입이 다를 경우 새노드로 교체합니다
  // 타입이 같을경우 속성을 비교하여 수정한뒤, 재귀적으로 자식을 탐색합니다
  function updateNode(parents, newNode, oldnode, index = 0) {
    if (parents.getAttribute("id") === "app") {
      options.oldNode = newNode;
    }

    if (oldnode === undefined && newNode !== undefined) {
      parents.appendChild(createElement(newNode));
    } else if (oldnode !== undefined && newNode === undefined) {
      parents.removeChild(parents.childNodes[index]);
    } else if (typeof oldnode !== "object" && typeof newNode !== "object") {
      if (oldnode !== newNode) {
        parents.replaceChild(createElement(newNode), parents.childNodes[index]);
      }
    } else if (oldnode.type !== newNode.type) {
      parents.replaceChild(createElement(newNode), parents.childNodes[index]);
    } else {
      const oldProps = oldnode.props === null ? [] : Object.keys(oldnode.props);
      const newProps = newNode.props === null ? [] : Object.keys(newNode.props);
      const max = Math.max(oldnode.children.length, newNode.children.length);
      //이전 속성값에서 사라진 부분 삭제
      //이전 속성값에서 변경된 부분 변경
      for (let i = 0; i < oldProps.length; i++) {
        // 이전에 사용된 이벤트 모두 제거
        if (oldProps[i].indexOf("on") !== -1) {
          parents.childNodes[index].removeEventListener(
            oldProps[i].substring(2),
            options.handlers[oldnode.props[oldProps[i]].toString()]
          );
          continue;
        }
        if (newNode.props[oldProps[i]] === undefined) {
          parents.childNodes[index].removeAttribute(oldProps[i]);
        } else if (newNode.props[oldProps[i]] !== oldnode.props[oldProps[i]]) {
          parents.childNodes[index].setAttribute(
            oldProps[i],
            newNode.props[oldProps[i]]
          );
        }
      }
      //이전 속성값에서 새롭게 추가된 부분 추가
      for (let i = 0; i < newProps.length; i++) {
        //이벤트 리스너는 전부 새로 등록
        if (newProps[i].indexOf("on") !== -1) {
          options.handlers[newNode.props[newProps[i]].toString()] =
            newNode.props[newProps[i]];
          parents.childNodes[index].addEventListener(
            oldProps[i].substring(2),
            options.handlers[newNode.props[newProps[i]].toString()]
          );
          continue;
        }
        if (oldnode.props[newProps[i]] === undefined) {
          parents.childNodes[index].setAttribute(
            newProps[i],
            newNode.props[newProps[i]]
          );
        }
      }

      //재귀적으로 자식 노드도 점검
      for (let i = 0; i < max; i++) {
        updateNode(
          parents.childNodes[index],
          newNode.children[i],
          oldnode.children[i],
          i
        );
      }
    }
    return 0;
  }

  // 루트 컴포넌트와 돔을 등록하는 함수
  const render = (rootComponent, dom) => {
    options.rootNode = dom;
    options.rootNextNode = document.createElement("div");
    options.rootNextNode.setAttribute("id", "app");
    options.rootComponent = rootComponent;
    options.oldNode = null;
    _render();
  };

  // 실질적인 렌더링을 책임지는 함수
  const _render = () => {
    updateNode(
      options.rootNextNode,
      options.rootComponent(),
      options.oldNode === null ? undefined : options.oldNode
    );
    if (options.rootNode.childNodes.length === 0) {
      options.rootNode.appendChild(options.rootNextNode);
    } else {
      options.rootNode.replaceChild(
        options.rootNextNode,
        options.rootNode.childNodes[0]
      );
    }
    options.stateCount = 0;
    options.changeStateCount = 0;
  };

  return { useState, render, _render };
}

const output = React();
export const useState = output.useState;
export const render = output.render;
export const _render = output._render;
