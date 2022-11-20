import { NEW_USER, DELETE_USER } from "../constant";

export default function UserEnterLogs($parent) {
  const $userEnterLog = document.createElement("div");
  $userEnterLog.id = "userEnterLog";
  $parent.appendChild($userEnterLog);
  this.state = [];

  this.render = () => {
    $userEnterLog.innerHTML = `<ul>${this.state
      .map((message) => `<li>${message}</li>`)
      .join("")}</ul>`;
  };

  this.render();

  window.addEventListener(NEW_USER, (e) => {
    const userInfo = e.detail;
    this.state.push(`${userInfo.name}님이 입장하셨습니다.`);
    this.render();
  });
  window.addEventListener(DELETE_USER, (e) => {
    const userInfo = e.detail;
    this.state.push(`${userInfo.name}님이 퇴장하셨습니다.`);
    this.render();
  });
}
