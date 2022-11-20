import NickName from "./components/nickname.js";
import "./style/home.css";
export default function Home($root) {
  this.state = {
    makeRoom: false,
  };
  const $home = document.createElement("div");
  $home.id = "home";
  $root.appendChild($home);

  this.render = () => {
    if (this.state.makeRoom) new NickName($home).render();
    else
      $home.innerHTML =
        "<div><button id='makeRoomButton'>방 만들기</button></div>";
  };

  this.render();

  const $makeRoomButton = document.querySelector("#makeRoomButton");

  $makeRoomButton.addEventListener("click", () => {
    this.state.makeRoom = true;
    this.render();
  });
}
