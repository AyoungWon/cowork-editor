import Home from "./home.js";
import Editor from "./editor.js";
import { routeInit } from "./router.js";
import "./style/reset.css";

export default function App($root) {
  // window.localStorage.clear();

  this.path = "/";

  this.setPath = (path) => {
    this.path = path;
    this.render();
  };

  this.render = () => {
    $root.innerHTML = "";
    if (this.path.indexOf("/editor/") === 0) new Editor($root);
    else new Home($root);
  };
  this.render();

  routeInit(this.setPath);
}
