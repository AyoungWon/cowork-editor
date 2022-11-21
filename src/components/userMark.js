import Mark from "./mark";

export default function UserMark($parent, userInfo) {
  const $caret = document.createElement("div");

  $caret.className = "caret";
  $caret.style.background = userInfo.color;
  $caret.style.left = `${userInfo.left}px`;
  $caret.style.top = `${userInfo.top}px`;

  new Mark($caret, userInfo);
  $parent.appendChild($caret);
}
