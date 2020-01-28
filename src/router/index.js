import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Help from "../components/Help.vue";
import Settings from "../components/Settings.vue";
import Rides from "../components/Rides.vue";
import Listallnews from "../components/List all news.vue";
import Campaigns from "../components/Campaigns.vue";
import Helpwithrides from "../components/Help with rides.vue";
import Earnings from "../components/Earnings.vue";
import Technicalproblems from "../components/Technical problems.vue";
import Usingmbs from "../components/Using MBS.vue";
import Account from "../components/Account.vue";
import Seeallconversations from "../components/See all conversations.vue";
import Changevehicle from "../components/Change vehicle.vue";
import Passengerdidntpay from "../components/Passenger didn't pay.vue";
import Paymentsandbonuses from "../components/Payments and bonuses.vue";
import Passengercampaigns from "../components/Passenger campaigns.vue";
import Driverpaidwaittimefees from "../components/Driver paid wait time fees.vue";
import Cancellationfee from "../components/Cancellation fee.vue";
import Requestingapricereview from "../components/Requesting a price review.vue";
import Weeklypayoutsandbonuses from "../components/Weekly payouts and bonuses.vue";
import Understandingupfrontpricing from "../components/Understanding upfront pricing.vue";
import Commissionfee from "../components/Commission fee.vue";
import Parkingfeesandtolls from "../components/Parking fees and tolls.vue";

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
      path: "/earnings",
      name: "Earnings",
      component: Earnings
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
    },
    {
      path: "/passengerdidntpay",
      name: "Passenger didn't pay",
      component: Passengerdidntpay
    },
    {
      path: "/paymentsandbonuses",
      name: "Payments and bonuses",
      component: Paymentsandbonuses
    },
    {
      path: "/passengercampaigns",
      name: "Passenger campaigns",
      component: Passengercampaigns
    },
    {
      path: "/driverpaidwaittimefees",
      name: "Driver paid wait time fees",
      component: Driverpaidwaittimefees
    },
    {
      path: "/cancellationfee",
      name: "Cancellation fee",
      component: Cancellationfee
    },
    {
      path: "/requestingapricereview",
      name: "Requesting a price review",
      component: Requestingapricereview
    },
    {
      path: "/weeklypayoutsandbonuses",
      name: "Weekly payouts and bonuses",
      component: Weeklypayoutsandbonuses
    },
    {
      path: "/understandingupfrontpricing",
      name: "Understanding upfront pricing",
      component: Understandingupfrontpricing
    },
    {
      path: "/commissionfee",
      name: "Commission fee",
      component: Commissionfee
    },
    {
      path: "/parkingfeesandtolls",
      name: "Parking fees and tolls",
      component: Parkingfeesandtolls
    }
  ]
});
