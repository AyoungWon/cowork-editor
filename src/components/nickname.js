import Event from "../event.js";
import { getUserList, getNewUserList } from "../utils.js";
import { routeChange } from "../router.js";
import { USER_LIST, USER_INFO, NEW_USER_LIST } from "../constant.js";

export default function NickName($parent) {
  this.state = "";

  this.render = () => {
    $parent.innerHTML = `<div>
    <div id="nicknameWrap">
     <h2 id="nicknameTitle">닉네임 설정</h2>
      <div id="nicknameInputWrap">
        <input id="nicknameInput" placeholder="닉네임을 입력해 주세요."/>
        <button id="enterButton">입장</button>
      </div>
    </div>
  </div>`;

    const handleChangeNickName = (e) => {
      this.state = e.target.value;
    };

    const handleClickEnter = () => {
      const randomColor =
        "#" + Math.round(Math.random() * 0xffffff).toString(16);

      const newUserInfo = { name: this.state, color: randomColor };

      const userList = getUserList();

      window.localStorage.setItem(
        USER_LIST,
        JSON.stringify([...userList, newUserInfo])
      );
      window.sessionStorage.setItem(USER_INFO, JSON.stringify(newUserInfo));
      routeChange("/editor/");
    };

    const $nicknameInput = document.querySelector("#nicknameInput");
    $nicknameInput?.addEventListener("change", handleChangeNickName);
    const $enterButton = document.querySelector("#enterButton");
    $enterButton?.addEventListener("click", handleClickEnter);
  };
}
