import {
  NEW_USER,
  DELETE_USER,
  USER_LIST,
  USER_INFO,
  NEW_USER_LIST,
} from "./constant.js";
import { getUserList, getNewUserList } from "./utils.js";

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

  this.observeUserList = () => {
    const checkNewUser = () => {
      setTimeout(() => {
        const userList = getUserList();
        const userNameList = this.state.currentUserList.map(
          (userInfo) => userInfo.name
        );

        userList.forEach((userInfo) => {
          if (!userNameList.includes(userInfo.name)) this.newUser(userInfo);
        });
        const newUserNameList = userList.map((userInfo) => userInfo.name);
        this.state.currentUserList.forEach((currentUser) => {
          if (!newUserNameList.includes(currentUser.name))
            this.deleteUser(currentUser);
        });
        return checkNewUser();
      }, 1000);
    };
    checkNewUser();
  };

  this.observeUserList();
}
