import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Help from "../components/Help.vue";
import Settings from "../components/Settings.vue";
import Rides from "../components/Rides.vue";
import Listallnews from "../components/List all news.vue";
import Campaigns from "../components/Campaigns.vue";
import Helpwithrides from "../components/Help with rides.vue";
import Winnings from "../components/Winnings.vue";
import Technicalproblems from "../components/Technical problems.vue";
import Usingmbs from "../components/Using MBS.vue";
import Account from "../components/Account.vue";
import Seeallconversations from "../components/See all conversations.vue";
import Changevehicle from "../components/Change vehicle.vue";

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
    },
    {
      path: "/listallnews",
      name: "List all news",
      component: Listallnews
    },
    {
      path: "/campaigns",
      name: "Campaigns",
      component: Campaigns
    },
    {
      path: "/helpwithrides",
      name: "Help with rides",
      component: Helpwithrides
    },
    {
      path: "/winnings",
      name: "Winnings",
      component: Winnings
    },
    {
      path: "/technicalproblems",
      name: "Technical problems",
      component: Technicalproblems
    },
    {
      path: "/usingmbs",
      name: "Using MBS",
      component: Usingmbs
    },
    {
      path: "/account",
      name: "Account",
      component: Account
    },
    {
      path: "/seeallconversations",
      name: "See all conversations",
      component: Seeallconversations
    },
    {
      path: "/changevehicle",
      name: "Change vehicle",
      component: Changevehicle
    }
  ]
});
