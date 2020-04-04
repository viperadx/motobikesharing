import store from "../store/index";
/* eslint-disable no-console */
export default (to, from, next) => {
  console.log("erverfver -" + store.getters.user);
  //  if (store.getters.userDataGetter) - asta era inainte (in loc de loggedInUserData)
  if (store.getters.user) {
    next();
  } else {
    next("/login");
  }
};
