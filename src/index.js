import { render } from "../lib/react.js";
import App from "./app";
import { createStore } from "../lib/redux";
import info from "./store";

createStore(info.name, info.reducer, info.initialState);
render(App, document.querySelector("#root"));
