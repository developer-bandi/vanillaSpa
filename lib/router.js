import { render } from "./react";

const router = {};

function navigateTo(path) {
  render(router[path], document.querySelector("#root"));
  if (window.location.pathname === path) {
    history.replaceState(null, "", path);
  } else {
    history.pushState(null, "", path);
  }
}

export function Router(node) {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.pathname);
    }
  });
  window.addEventListener("popstate", function () {
    render(router[window.location.pathname], document.querySelector("#root"));
  });
  node.children.forEach((route) => {
    router[route.props.path] = route.props.element;
  });

  navigateTo(window.location.pathname);
}
