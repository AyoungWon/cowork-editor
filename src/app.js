import Home from "./home.js";
import Editor from "./editor.js";
import { routeInit } from "./router.js";
import "./style/reset.css";

export default function App($root) {
  // window.localStorage.clear();
  //첫 로드시 저장된 userInfo 있으면 그대로 로드
  this.path = "/";

  this.setPath = (path) => {
    this.path = path;
    this.render();
  };

  this.render = () => {
    $root.innerHTML = "";
    // new Editor($root).init();
    if (this.path.indexOf("/editor/") === 0) new Editor($root).init();
    else new Home($root);
  };
  this.render();

  routeInit(this.setPath);
}
