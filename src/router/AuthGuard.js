import store from "@/store";

export default (to, from, next) => {
  if (store.getters.userDataGetter) {
    next();
  } else {
    next("/login");
  }
};
