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
          _render(
            options.rootNextNode,
            options.rootComponent(),
            options.oldNode
          );
        }, 16);
      }
      options.changeStateCount++;
    }
    options.stateCount++;
    return [state, setState];
  }

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
      console.log("1");
      const childerenNode = createElement(children);
      rootnode.appendChild(childerenNode);
    });
    return rootnode;
  }

  function updateNode(parents, newNode, oldnode, index = 0) {
    if (parents.getAttribute("id") === "app") {
      options.oldNode = newNode;
    }
    if (oldnode === undefined && newNode !== undefined) {
      console.log("2");
      if (typeof newNode.type === "function") {
        newNode.type(newNode);
        return;
      }
      parents.appendChild(createElement(newNode));
    } else if (oldnode !== undefined && newNode === undefined) {
      parents.removeChild(parents.childNodes[index]);
    } else if (typeof oldnode !== "object" && typeof newNode !== "object") {
      console.log(oldnode, newNode);
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

  const render = (rootComponent, dom) => {
    options.rootNode = dom;
    options.rootNextNode = document.createElement("div");
    options.rootNextNode.setAttribute("id", "app");
    options.rootComponent = rootComponent;
    _render(options.rootNextNode, rootComponent());
  };

  const _render = (parents, newNode, oldNode) => {
    updateNode(parents, newNode, oldNode);
    console.log("3");
    console.log(options.rootNode);
    console.log(options.rootNextNode);
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
    console.log("3end");
  };

  return { useState, render };
}

const output = React();
export const useState = output.useState;
export const render = output.render;
