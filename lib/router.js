import { render } from "./react";

const router = {};

// 이벤트 발생시 해당하는 주소의 컴포넌트를 렌더링해주는 함수
export function navigateTo(path) {
  render(router[path], document.querySelector("#root"));
  if (window.location.pathname === path) {
    history.replaceState(null, "", path);
  } else {
    history.pushState(null, "", path);
  }
}

// router의 기본적인 세팅을 하는 함수
// 기본세팅 후에 render 함수에 컴포넌트를 전달
export function Routes(type, props, children) {
  // data-link 가 붙은 a태그인 Link태그의 이벤트 등록
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.pathname);
    }
  });

  // 뒤로가기 버튼을 눌렀을때 해당 주소의 컴포넌트를 렌더링하는 이벤트 등록
  window.addEventListener("popstate", function () {
    render(router[window.location.pathname], document.querySelector("#root"));
  });
  // 초기세팅이 완료되었으면, 주소에 맞는 컴포넌트를 리턴
  return router[window.location.pathname]();
}

// path와 해당 컴포넌트를 저장하는 함수
export function Route(type, props) {
  const { path, element } = props;
  router[path] = element;
}

// 페이지를 로드하지 않고 이동하는 태그인 Link태그를 생성하는 함수
export const Link = (type, props, children) => {
  return {
    type: "a",
    props: { ...props, "data-link": true },
    children: children.flat(),
  };
};
