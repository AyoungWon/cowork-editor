import { USER_LIST, NEW_USER_LIST, CONTENTS } from "./constant.js";

export const getUserList = () => {
  let userList = JSON.parse(window.localStorage.getItem(USER_LIST));
  if (!userList) userList = [];
  return userList;
};

export const getNewUserList = () => {
  let userList = JSON.parse(window.localStorage.getItem(NEW_USER_LIST));
  window.localStorage.removeItem(NEW_USER_LIST);
  if (!userList) userList = [];

  return userList;
};

export const getContents = () => {
  let contents = window.localStorage.getItem(CONTENTS) ?? "";
  return contents;
};

export const setContents = (contents) => {
  window.localStorage.setItem(CONTENTS, contents);
};

export const getCursorXY = (textarea) => {
  const {
    offsetLeft: inputX,
    offsetTop: inputY,
    selectionEnd: selectionPoint,
  } = textarea;

  const div = document.createElement("div");

  const copyStyle = getComputedStyle(textarea);
  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop];
  }

  const value = textarea.value;

  const textContent = value.substr(0, selectionPoint);

  div.textContent = textContent;
  div.style.height = "auto";

  const span = document.createElement("span");

  span.textContent = value.substr(selectionPoint) || ".";

  div.appendChild(span);

  const virtual = document.querySelector("#virtual");
  virtual.innerHTML = "";
  virtual.appendChild(div);

  const { offsetLeft: spanX, offsetTop: spanY } = span;

  const { x, y } = {
    x: inputX + spanX,
    y: inputY + spanY,
  };
  console.log(x, y, "Xy");
  const {
    offsetLeft,
    offsetTop,
    offsetHeight,
    offsetWidth,
    scrollLeft,
    scrollTop,
  } = textarea;
  // get style property values that we are interested in
  const { lineHeight, paddingRight } = getComputedStyle(textarea);
  console.log(lineHeight, paddingRight, "lineHeight,paddingRight");
  // get the cursor X and Y from our helper function

  // set the marker positioning
  // for the left positioning we ensure that the maximum left position is the width of the input minus the right padding using Math.min
  // we also account for current scroll position of the input
  const left = Math.min(
    x - scrollLeft,
    offsetLeft + offsetWidth - parseInt(paddingRight, 10)
  );
  // for the top positioning we ensure that the maximum top position is the height of the input minus line height
  // we also account for current scroll position of the input
  const top = Math.min(
    y - scrollTop,
    offsetTop +
      offsetHeight -
      parseInt(typeof lineHeight === "number" ? lineHeight : 1.2, 10)
  );

  // document.body.removeChild(div);
  return { left, top };
};
