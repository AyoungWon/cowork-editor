import { USER_LIST, USER_INFO } from "./constant";
import UserList from "./components/userList.js";
import { getUserList } from "./utils";
import Event from "./event.js";
import UserEnterLogs from "./components/userEnterLogs";
import EditorArea from "./components/editorArea";
import "./style/editor.css";

export default function Editor($root) {
  const $editorWrap = document.createElement("div");
  $editorWrap.id = "editorWrap";

  const $editor = document.createElement("div");
  $editor.id = "editor";

  const $side = document.createElement("div");
  $side.id = "side";

  $editorWrap.appendChild($editor);
  $editorWrap.appendChild($side);

  const userList = getUserList();

  this.render = () => {
    $root.appendChild($editorWrap);
    new Event();
    new UserList($side, userList);
    new UserEnterLogs($side);
    new EditorArea($editor);
  };

  this.init = () => {
    this.render();
    //나갈때 유저 지우기
    window.addEventListener(
      "beforeunload",
      (event) => {
        event.preventDefault();
        const userList = getUserList();
        const { name } = window.sessionStorage.getItem(JSON.parse(USER_INFO));
        const filteredUserList = userList.filter((user) => user.name !== name);
        window.localStorage.setItem(
          USER_LIST,
          JSON.stringify(filteredUserList)
        );
      },
      { once: true }
    );
  };

  this.init();
}
