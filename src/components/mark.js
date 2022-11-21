export default function Mark($parent, userInfo) {
  const $mark = document.createElement("span");
  $mark.innerHTML = userInfo.name;
  $mark.className = "mark";
  $mark.style.backgroundColor = userInfo.color;
  $mark.style.width = `${userInfo.name * 11 + 4}px`;
  $parent.appendChild($mark);
}
