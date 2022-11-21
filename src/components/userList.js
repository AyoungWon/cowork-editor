import { NEW_USER, DELETE_USER } from "../constant.js";
import { getUserList } from "../utils.js";

export default function UserList($parent, userList) {
  const $userList = document.createElement("div");
  $userList.id = "userList";
  $parent.appendChild($userList);
  this.state = {
    userList,
  };

  this.render = () => {
    this.state.userList = getUserList();
    $userList.innerHTML = `
    <h3 style="margin-bottom:24px">참여자 목록</h3>
    <ul>${this.state.userList
      .map(
        (userInfo) =>
          `<li class="userTag" style="background-color:${userInfo.color}">${userInfo.name}</li>`
      )
      .join("")}</ul>`;
  };

  this.render();

  window.addEventListener(NEW_USER, (e) => {
    this.render();
  });

  window.addEventListener(DELETE_USER, (e) => {
    this.render();
  });
}
