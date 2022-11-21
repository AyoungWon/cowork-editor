import { NEW_USER, DELETE_USER, INTERVAL_TIME } from "./constant.js";
import { getUserList } from "./utils.js";

export default function Event() {
  this.state = { currentUserList: getUserList() };

  this.deleteUser = (userInfo) => {
    this.state.currentUserList = this.state.currentUserList.filter(
      (user) => user.name !== userInfo.name && user.color !== userInfo.color
    );
    window.dispatchEvent(new CustomEvent(DELETE_USER, { detail: userInfo }));
  };

  this.newUser = (userInfo) => {
    this.state.currentUserList.push(userInfo);
    window.dispatchEvent(new CustomEvent(NEW_USER, { detail: userInfo }));
  };

  this.observeUserList = () =>
    setTimeout(() => {
      const userList = getUserList();
      const userNameList = this.state.currentUserList.map(
        (userInfo) => userInfo.name
      );
      const newUserNameList = userList.map((userInfo) => userInfo.name);

      userList.forEach((userInfo) => {
        if (!userNameList.includes(userInfo.name)) this.newUser(userInfo);
      });

      this.state.currentUserList.forEach((currentUser) => {
        if (!newUserNameList.includes(currentUser.name))
          this.deleteUser(currentUser);
      });

      return this.observeUserList();
    }, INTERVAL_TIME);

  this.observeUserList();
}
