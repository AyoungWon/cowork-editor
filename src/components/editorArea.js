import { getContents, setContents, getCursorXY, getUserList } from "../utils";
import { USER_LIST, USER_INFO, INTERVAL_TIME } from "../constant";
import UserMark from "./userMark";

export default function EditorArea($parent, userList) {
  this.state = {
    userList,
    contents: "",
  };
  const $editorWrapper = document.createElement("div");
  $editorWrapper.id = "editorWrapper";
  $parent.appendChild($editorWrapper);

  const $textarea = document.createElement("textarea");
  $textarea.id = "textarea";
  $editorWrapper.appendChild($textarea);

  const $caretWrap = document.createElement("dev");
  $caretWrap.id = "caretWrap";
  $editorWrapper.appendChild($caretWrap);

  this.userPositionRender = (userList) => {
    $caretWrap.innerHTML = "";
    const mine = JSON.parse(window.sessionStorage.getItem(USER_INFO));

    userList.forEach((userInfo) => {
      if (!(mine.name === userInfo.name && mine.color === userInfo.color))
        new UserMark($caretWrap, userInfo);
    });
  };

  this.render = () => ($textarea.value = this.state.contents);

  this.syncEditorContents = () =>
    setTimeout(() => {
      const contents = getContents();
      const userList = getUserList();

      this.userPositionRender(userList);

      this.state.contents = contents;
      this.render();

      return this.syncEditorContents();
    }, INTERVAL_TIME);

  this.updateUserPosition = (e) => {
    const { left, top } = getCursorXY(e.target);
    const userInfo = JSON.parse(window.sessionStorage.getItem(USER_INFO));
    const userList = getUserList();

    const updatedUserListStr = JSON.stringify(
      userList.map((user) =>
        user.color === userInfo.color && user.name === userInfo.name
          ? { ...userInfo, left, top }
          : user
      )
    );

    window.localStorage.setItem(USER_LIST, updatedUserListStr);
  };

  this.handleChangeContents = (e) => setContents(e.target.value);

  this.syncEditorContents();
  this.render();

  $textarea.addEventListener("input", this.handleChangeContents);
  $textarea.addEventListener("keyup", this.updateUserPosition);
  $textarea.addEventListener("click", this.updateUserPosition);
}
