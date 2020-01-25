import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Help from "../components/Help.vue";
import Settings from "../components/Settings.vue";
import Rides from "../components/Rides.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/help",
      name: "Help",
      component: Help
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/rides",
      name: "Rides",
      component: Rides
    }
  ]
});
