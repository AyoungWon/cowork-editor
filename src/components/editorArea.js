import { getContents, setContents, getCursorXY, getUserList } from "../utils";
import { USER_LIST, USER_INFO } from "../constant";

export default function EditorArea($parent, userList) {
  this.state = {
    userList,
    isUserEditing: false,
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

  this.render = () => {
    $textarea.value = this.state.contents;
  };

  this.userPositionRender = (userList) => {
    $caretWrap.innerHTML = "";
    const mine = JSON.parse(window.sessionStorage.getItem(USER_INFO));

    userList.forEach((userInfo) => {
      if (!(mine.name === userInfo.name && mine.color === userInfo.color)) {
        const $caret = document.createElement("div");
        const $mark = document.createElement("span");
        $mark.innerHTML = userInfo.name;
        $mark.className = "mark";
        $mark.style.backgroundColor = userInfo.color;
        $mark.style.width = `${userInfo.name * 11 + 4}px`;

        $caret.appendChild($mark);
        $caret.className = "caret";
        $caret.style.background = userInfo.color;
        $caret.style.left = `${userInfo.left}px`;
        $caret.style.top = `${userInfo.top}px`;
        $caretWrap.append($caret);
      }
    });
  };
  this.render();

  this.syncEditorContents = () => {
    setTimeout(() => {
      if (!this.state.isUserEditing) {
        const contents = getContents();

        this.state.contents = contents;
        this.render();
      }
      return this.syncEditorContents();
    }, 500);
  };

  this.syncEditorContents();

  this.userPositionTracking = () => {
    setTimeout(() => {
      const userList = getUserList();

      this.userPositionRender(userList);

      return this.userPositionTracking();
    }, 1000);
  };

  this.userPositionTracking();

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

    console.log(left, top);
  };

  this.handleChangeContents = (e) => {
    const contents = e.target.value;
    console.log(e.target.selectionStart, e.target.row, e.target.col);
    setContents(contents);
  };

  $textarea.addEventListener("input", this.handleChangeContents);
  $textarea.addEventListener("keyup", this.updateUserPosition);
  $textarea.addEventListener("click", this.updateUserPosition);
}
