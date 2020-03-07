import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Help from "../components/Help.vue";
import Settings from "../components/Settings.vue";
import Rides from "../components/Rides.vue";
import Listallnews from "../components/Help/List-all-news.vue";
import Campaigns from "../components/Help/Campaigns.vue";
import Helpwithrides from "../components/Help/Help-with-rides.vue";
import Earningshelp from "../components/Help/Earnings-help.vue";
import Technicalproblems from "../components/Help/Technical-problems.vue";
import Usingmbs from "../components/Help/Using-MBS.vue";
import Accounthelp from "../components/Help/Account-help.vue";
import Seeallconversations from "../components/Help/See-all-conversations.vue";
import Changevehicle from "../components/Account/Change-vehicle.vue";
import Paymentsandbonuses from "../components/Help/Earnings_help/Payments-and-bonuses.vue";
import Passengercampaigns from "../components/Help/Earnings_help/Passenger-campaigns.vue";
import Driverpaidwaittimefees from "../components/Help/Earnings_help/Driver-paid-wait-time-fees.vue";
import Cancellationfee from "../components/Help/Earnings_help/Cancellation-fee.vue";
import Requestingapricereview from "../components/Help/Earnings_help/Requesting-a-price-review.vue";
import Weeklypayoutsandbonuses from "../components/Help/Earnings_help/Weekly-payouts-and-bonuses.vue";
import Understandingupfrontpricing from "../components/Help/Earnings_help/Understanding-upfront-pricing.vue";
import Commissionfee from "../components/Help/Earnings_help/Commission-fee.vue";
import Parkingfeesandtolls from "../components/Help/Earnings_help/Parking-fees-and-tolls.vue";
import Cursa1 from "../components/Rides/Cursa-1.vue";
import Account from "../components/Account.vue";
import Passengerlostanitem from "../components/Help/Using_MBS/Passenger-lost-an-item.vue";
import Passengermisconduct from "../components/Help/Using_MBS/Passenger-misconduct.vue";
import Reportinganaccidentorviolentbehaviour from "../components/Help/Using_MBS/Reporting-an-accident-or-violent-behaviour.vue";
import Havingatechnicalissue from "../components/Help/Technical_problems/Having-a-technical-issue.vue";
import Otherquestions from "../components/Help/Other-questions.vue";
import Issueswithordernotification from "../components/Help/Technical_problems/Issues-with-order-notification.vue";
import Updatesfordriverapp from "../components/Help/Technical_problems/Updates-for-driver-app.vue";
import Devicerequirements from "../components/Help/Technical_problems/Device-requirements.vue";
import Finishedandcompletionratecalculation from "../components/Help/Using_MBS/Finished-and-completion-rate-calculation.vue";
import Outofradiusrides from "../components/Help/Using_MBS/Out-of-radius-rides.vue";
import Acceptanceratecalculation from "../components/Help/Using_MBS/Acceptance-rate-calculation.vue";
import Callingapassenger from "../components/Help/Using_MBS/Calling-a-passenger.vue";
import Activityscorecalculation from "../components/Help/Using_MBS/Activity-score-calculation.vue";
import Usingdrivingradius from "../components/Help/Using_MBS/Using-driving-radius.vue";
import Improvingyourratings from "../components/Help/Using_MBS/Improving-your-ratings.vue";
import Guidetobacktobackrides from "../components/Help/Using_MBS/Guide-to-back-to-back-rides.vue";
import Disablingbacktobackrides from "../components/Help/Using_MBS/Disabling-back-to-back-rides.vue";
import Getridestowardsyourdestination from "../components/Help/Using_MBS/Get-rides-towards-your-destination.vue";
import Tipstogetmorejourneyrequests from "../components/Help/Using_MBS/Tips-to-get-more-journey-requests.vue";
import Waitingforpassenger from "../components/Help/Using_MBS/Waiting-for-passenger.vue";
import Ratingapassenger from "../components/Help/Using_MBS/Rating-a-passenger.vue";
import Passengermadeamess from "../components/Help/Using_MBS/Passenger-made-a-mess.vue";
import Safetytips from "../components/Help/Using_MBS/Safety-tips.vue";
import Understandingdriverfraud from "../components/Help/Using_MBS/Understanding-driver-fraud.vue";
import Reasonsforablockedaccount from "../components/Help/Account/Reasons-for-a-blocked-account.vue";
import Collectingandprocessingpersonaldata from "../components/Help/Account/Collecting-and-processing-personal-data.vue";
import Requestingyourdata from "../components/Help/Account/Requesting-your-data.vue";
import Addingavehicle from "../components/Help/Account/Adding-a-vehicle.vue";
import Selectinavehicleinapp from "../components/Help/Account/Selecting-a-vehicle-in-app.vue";
import Resettingyourpassword from "../components/Help/Account/Resetting-your-password.vue";
import Uploadingyourdocuments from "../components/Help/Account/Uploading-your-documents.vue";
import Updatingyourbankdetails from "../components/Help/Account/Updating-your-bank-details.vue";
import Updatingyouraccountdetails from "../components/Help/Account/Updating-your-account-details.vue";
import Yourprofilepicture from "../components/Help/Account/Your-profile-picture.vue";
import Deletingyouraccount from "../components/Help/Account/Deleting-your-account.vue";
import Documents from "../components/Account/Documents.vue";
import Accountdetails from "../components/Account/Account-details.vue";
import Bankdetails from "../components/Account/Bank-details.vue";
import Earnings from "../components/Earnings.vue";
import Signup from "../components/Authentication/Sign-up.vue";
import Login from "../components/Authentication/Login.vue";
import AuthGuard from "../router/AuthGuard";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      beforeEnter: AuthGuard
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
      path: "/earningshelp",
      name: "Earnings-help",
      component: Earningshelp
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
    },
    {
      path: "/issueswithordernotification",
      name: "Issues-with-order-notification",
      component: Issueswithordernotification
    },
    {
      path: "/updatesfordriverapp",
      name: "Updates-for-driver-app",
      component: Updatesfordriverapp
    },
    {
      path: "/devicerequirements",
      name: "Device-requirements",
      component: Devicerequirements
    },
    {
      path: "/finishedandcompletionratecalculation",
      name: "Finished-and-completion-rate-calculation",
      component: Finishedandcompletionratecalculation
    },
    {
      path: "/outofradiusrides",
      name: "Out-of-radius-rides",
      component: Outofradiusrides
    },
    {
      path: "/acceptanceratecalculation",
      name: "Acceptance-rate-calculation",
      component: Acceptanceratecalculation
    },
    {
      path: "/callingapassenger",
      name: "Calling-a-passenger",
      component: Callingapassenger
    },
    {
      path: "/activityscorecalculation",
      name: "Activity-score-calculation",
      component: Activityscorecalculation
    },
    {
      path: "/usingdrivingradius",
      name: "Using-driving-radius",
      component: Usingdrivingradius
    },
    {
      path: "/improvingyourratings",
      name: "Improving-your-ratings",
      component: Improvingyourratings
    },
    {
      path: "/guidetobacktobackrides",
      name: "Guide-to-back-to-back-rides",
      component: Guidetobacktobackrides
    },
    {
      path: "/disablingbacktobackrides",
      name: "Disabling-back-to-back-rides",
      component: Disablingbacktobackrides
    },
    {
      path: "/getridestowardsyourdestination",
      name: "Get-rides-towards-your-destination",
      component: Getridestowardsyourdestination
    },
    {
      path: "/tipstogetmorejourneyrequests",
      name: "Tips-to-get-more-journey-requests",
      component: Tipstogetmorejourneyrequests
    },
    {
      path: "/waitingforpassenger",
      name: "Waiting-for-passenger",
      component: Waitingforpassenger
    },
    {
      path: "/ratingapassenger",
      name: "Rating-a-passenger",
      component: Ratingapassenger
    },
    {
      path: "/passengermadeamess",
      name: "Passenger-made-a-mess",
      component: Passengermadeamess
    },
    {
      path: "/safetytips",
      name: "Safety-tips",
      component: Safetytips
    },
    {
      path: "/understandingdriverfraud",
      name: "Understanding-driver-fraud",
      component: Understandingdriverfraud
    },
    {
      path: "/reasonsforablockedaccount",
      name: "Reasons-for-a-blocked-account",
      component: Reasonsforablockedaccount
    },
    {
      path: "/collectingandprocessingpersonaldata",
      name: "Collecting-and-processing-personal-data",
      component: Collectingandprocessingpersonaldata
    },
    {
      path: "/requestingyourdata",
      name: "Requesting-your-data",
      component: Requestingyourdata
    },
    {
      path: "/addingavehicle",
      name: "Adding-a-vehicle",
      component: Addingavehicle
    },
    {
      path: "/selectingavehicleinapp",
      name: "Selecting-a-vehicle-in-app",
      component: Selectinavehicleinapp
    },
    {
      path: "/resettingyourpassword",
      name: "Resetting-your-password",
      component: Resettingyourpassword
    },
    {
      path: "/uploadingyourdocuments",
      name: "Uploading-your-documents",
      component: Uploadingyourdocuments
    },
    {
      path: "/updatingyourbankdetails",
      name: "Updating-your-bank-details",
      component: Updatingyourbankdetails
    },
    {
      path: "/updatingyouraccountdetails",
      name: "Updating-your-account-details",
      component: Updatingyouraccountdetails
    },
    {
      path: "/yourprofilepicture",
      name: "Your-profile-picture",
      component: Yourprofilepicture
    },
    {
      path: "/deletingyouraccount",
      name: "Deleting-your-account",
      component: Deletingyouraccount
    },
    {
      path: "/documents",
      name: "Documents",
      component: Documents
    },
    {
      path: "/accountdetails",
      name: "Account-details",
      component: Accountdetails
    },
    {
      path: "/bankdetails",
      name: "Bank-details",
      component: Bankdetails
    },
    {
      path: "/earnings",
      name: "Earnings",
      component: Earnings
    },
    {
      path: "/signup",
      name: "Sign-up",
      component: Signup
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
