import store from "@/store";

export default (to, from, next) => {
  //  if (store.getters.userDataGetter) - asta era inainte (in loc de loggedInUserData)
  if (store.getters.loggedInUserData) {
    next();
  } else {
    next("/login");
  }
};
