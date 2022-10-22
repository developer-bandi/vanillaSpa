import { render } from "./react";

const router = {};

function navigateTo(path) {
  console.log("navigate");
  console.log(path);
  console.log(router[path]);
  render(router[path], document.querySelector("#root"));
  console.log("navigateEnd");
}

export function Router(node) {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      console.log(router);
      navigateTo(e.target.pathname);
    }
  });
  console.log(node.children);
  node.children.forEach((route) => {
    console.log(route.props);
    router[route.props.path] = route.props.element;
  });

  navigateTo(window.location.pathname);
  console.log("navigateEnd2");
}
