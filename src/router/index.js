import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Help from "../components/Help.vue";
import Settings from "../components/Settings.vue";
import Rides from "../components/Rides.vue";
import Listallnews from "../components/Help/List-all-news.vue";
import Campaigns from "../components/Help/Campaigns.vue";
import Helpwithrides from "../components/Help/Help-with-rides.vue";
import Earnings from "../components/Help/Earnings.vue";
import Technicalproblems from "../components/Help/Technical-problems.vue";
import Usingmbs from "../components/Help/Using-MBS.vue";
import Accounthelp from "../components/Help/Account-help.vue";
import Seeallconversations from "../components/Help/See-all-conversations.vue";
import Changevehicle from "../components/Change-vehicle.vue";
import Passengerdidntpay from "../components/Help/Earnings/Passenger-didn't-pay.vue";
import Paymentsandbonuses from "../components/Help/Earnings/Payments-and-bonuses.vue";
import Passengercampaigns from "../components/Help/Earnings/Passenger-campaigns.vue";
import Driverpaidwaittimefees from "../components/Help/Earnings/Driver-paid-wait-time-fees.vue";
import Cancellationfee from "../components/Help/Earnings/Cancellation-fee.vue";
import Requestingapricereview from "../components/Help/Earnings/Requesting-a-price-review.vue";
import Weeklypayoutsandbonuses from "../components/Help/Earnings/Weekly-payouts-and-bonuses.vue";
import Understandingupfrontpricing from "../components/Help/Earnings/Understanding-upfront-pricing.vue";
import Commissionfee from "../components/Help/Earnings/Commission-fee.vue";
import Parkingfeesandtolls from "../components/Help/Earnings/Parking-fees-and-tolls.vue";
import Cursa1 from "../components/Rides/Cursa-1.vue";
import Account from "../components/Account.vue";
import Passengerlostanitem from "../components/Rides/Passenger-lost-an-item.vue";
import Passengermisconduct from "../components/Rides/Passenger-misconduct.vue";
import Reportinganaccidentorviolentbehaviour from "../components/Rides/Reporting-an-accident-or-violent-behaviour.vue";
import Havingatechnicalissue from "../components/Rides/Having-a-technical-issue.vue";
import Otherquestions from "../components/Help/Other-questions.vue";

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
      name: "List-all-news",
      component: Listallnews
    },
    {
      path: "/campaigns",
      name: "Campaigns",
      component: Campaigns
    },
    {
      path: "/helpwithrides",
      name: "Help-with-rides",
      component: Helpwithrides
    },
    {
      path: "/earnings",
      name: "Earnings",
      component: Earnings
    },
    {
      path: "/technicalproblems",
      name: "Technical-problems",
      component: Technicalproblems
    },
    {
      path: "/usingmbs",
      name: "Using-MBS",
      component: Usingmbs
    },
    {
      path: "/accounthelp",
      name: "Account-help",
      component: Accounthelp
    },
    {
      path: "/seeallconversations",
      name: "See-all-conversations",
      component: Seeallconversations
    },
    {
      path: "/changevehicle",
      name: "Change-vehicle",
      component: Changevehicle
    },
    {
      path: "/passengerdidntpay",
      name: "Passenger-didn't-pay",
      component: Passengerdidntpay
    },
    {
      path: "/paymentsandbonuses",
      name: "Payments-and-bonuses",
      component: Paymentsandbonuses
    },
    {
      path: "/passengercampaigns",
      name: "Passenger-campaigns",
      component: Passengercampaigns
    },
    {
      path: "/driverpaidwaittimefees",
      name: "Driver-paid-wait-time-fees",
      component: Driverpaidwaittimefees
    },
    {
      path: "/cancellationfee",
      name: "Cancellation-fee",
      component: Cancellationfee
    },
    {
      path: "/requestingapricereview",
      name: "Requesting-a-price-review",
      component: Requestingapricereview
    },
    {
      path: "/weeklypayoutsandbonuses",
      name: "Weekly-payouts-and-bonuses",
      component: Weeklypayoutsandbonuses
    },
    {
      path: "/understandingupfrontpricing",
      name: "Understanding-upfront-pricing",
      component: Understandingupfrontpricing
    },
    {
      path: "/commissionfee",
      name: "Commission-fee",
      component: Commissionfee
    },
    {
      path: "/parkingfeesandtolls",
      name: "Parking-fees-and-tolls",
      component: Parkingfeesandtolls
    },
    {
      path: "/cursa1",
      name: "Cursa-1",
      component: Cursa1
    },
    {
      path: "/account",
      name: "Account",
      component: Account
    },
    {
      path: "/passengerlostanitem",
      name: "Passenger-lost-an-item",
      component: Passengerlostanitem
    },
    {
      path: "/passengermisconduct",
      name: "Passenger-misconduct",
      component: Passengermisconduct
    },
    {
      path: "/reportinganaccidentorviolentbehaviour",
      name: "Reporting-an-accident-or-violent-behaviour",
      component: Reportinganaccidentorviolentbehaviour
    },
    {
      path: "/havingatechnicalissue",
      name: "Having-a-technical-issue",
      component: Havingatechnicalissue
    },
    {
      path: "/otherquestions",
      name: "Other-questions",
      component: Otherquestions
    }
  ]
});
