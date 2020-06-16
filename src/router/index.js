import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Help from "../components/Help.vue";
import Admin from "../components/Admin.vue";
import Rides from "../components/Rides.vue";
import Listallnews from "../components/Help/List-all-news.vue";
import Campaigns from "../components/Help/Campaigns.vue";
import Helpwithrides from "../components/Help/Help-with-rides.vue";
import Earningshelp from "../components/Help/Earnings-help.vue";
import Technicalproblems from "../components/Help/Technical-problems.vue";
import Usingmbs from "../components/Help/Using-MBS.vue";
import Accounthelp from "../components/Help/Account-help.vue";
import Seeallconversations from "../components/Help/See-all-conversations.vue";
import Vehicledocuments from "../components/Account/Vehicle-documents.vue";
import Paymentsandbonuses from "../components/Help/Earnings_help/Payments-and-bonuses.vue";
import Passengercampaigns from "../components/Help/Earnings_help/Passenger-campaigns.vue";
import Driverpaidwaittimefees from "../components/Help/Earnings_help/Driver-paid-wait-time-fees.vue";
import Cancellationfee from "../components/Help/Earnings_help/Cancellation-fee.vue";
import Requestingapricereview from "../components/Help/Earnings_help/Requesting-a-price-review.vue";
import Weeklypayoutsandbonuses from "../components/Help/Earnings_help/Weekly-payouts-and-bonuses.vue";
import Understandingupfrontpricing from "../components/Help/Earnings_help/Understanding-upfront-pricing.vue";
import Commissionfee from "../components/Help/Earnings_help/Commission-fee.vue";
import Parkingfeesandtolls from "../components/Help/Earnings_help/Parking-fees-and-tolls.vue";
import Cursa from "../components/Rides/Cursa.vue";
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
import Selectingavehicleinapp from "../components/Help/Account/Selecting-a-vehicle-in-app.vue";
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
import Signupclient from "../components/Authentication/Sign-up-client.vue";
import Login from "../components/Authentication/Login.vue";
import AuthGuard from "../router/AuthGuard";
import TermsandConditions from "../components/GDPR/Terms-and-Conditions.vue";
import Becomedriver from "../components/Account/Become-driver.vue";
import Chat from "../components/Chat.vue";
import Faceapi from "../components/Admin/Face-api.vue";
import Signupdriver from "../components/Authentication/Sign-up-driver.vue";
import Driverrequests from "../components/Admin/Driver-requests.vue";
import Searchforaride from "../components/Search-for-a-ride.vue";
import Reports from "../components/Admin/Reports.vue";
import Authenticationdetails from "../components/Account/Authentication-details.vue";
import Supporttickets from "../components/Admin/Support-tickets.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/help",
      name: "Help",
      component: Help,
      beforeEnter: AuthGuard
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: "/rides",
      name: "Rides",
      component: Rides,
      beforeEnter: AuthGuard
    },
    {
      path: "/listallnews",
      name: "List-all-news",
      component: Listallnews,
      beforeEnter: AuthGuard
    },
    {
      path: "/campaigns",
      name: "Campaigns",
      component: Campaigns,
      beforeEnter: AuthGuard
    },
    {
      path: "/helpwithrides",
      name: "Help-with-rides",
      component: Helpwithrides,
      beforeEnter: AuthGuard
    },
    {
      path: "/earningshelp",
      name: "Earnings-help",
      component: Earningshelp,
      beforeEnter: AuthGuard
    },
    {
      path: "/technicalproblems",
      name: "Technical-problems",
      component: Technicalproblems,
      beforeEnter: AuthGuard
    },
    {
      path: "/usingmbs",
      name: "Using-MBS",
      component: Usingmbs,
      beforeEnter: AuthGuard
    },
    {
      path: "/accounthelp",
      name: "Account-help",
      component: Accounthelp,
      beforeEnter: AuthGuard
    },
    {
      path: "/seeallconversations",
      name: "See-all-conversations",
      component: Seeallconversations,
      beforeEnter: AuthGuard
    },
    {
      path: "/vehicledocuments",
      name: "Vehicle-documents",
      component: Vehicledocuments,
      beforeEnter: AuthGuard
    },
    {
      path: "/paymentsandbonuses",
      name: "Payments-and-bonuses",
      component: Paymentsandbonuses,
      beforeEnter: AuthGuard
    },
    {
      path: "/passengercampaigns",
      name: "Passenger-campaigns",
      component: Passengercampaigns,
      beforeEnter: AuthGuard
    },
    {
      path: "/driverpaidwaittimefees",
      name: "Driver-paid-wait-time-fees",
      component: Driverpaidwaittimefees,
      beforeEnter: AuthGuard
    },
    {
      path: "/cancellationfee",
      name: "Cancellation-fee",
      component: Cancellationfee,
      beforeEnter: AuthGuard
    },
    {
      path: "/requestingapricereview",
      name: "Requesting-a-price-review",
      component: Requestingapricereview,
      beforeEnter: AuthGuard
    },
    {
      path: "/weeklypayoutsandbonuses",
      name: "Weekly-payouts-and-bonuses",
      component: Weeklypayoutsandbonuses,
      beforeEnter: AuthGuard
    },
    {
      path: "/understandingupfrontpricing",
      name: "Understanding-upfront-pricing",
      component: Understandingupfrontpricing,
      beforeEnter: AuthGuard
    },
    {
      path: "/commissionfee",
      name: "Commission-fee",
      component: Commissionfee,
      beforeEnter: AuthGuard
    },
    {
      path: "/parkingfeesandtolls",
      name: "Parking-fees-and-tolls",
      component: Parkingfeesandtolls,
      beforeEnter: AuthGuard
    },
    {
      path: "/cursa/:id",
      name: "Cursa",
      component: Cursa,
      beforeEnter: AuthGuard
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: AuthGuard
    },
    {
      path: "/passengerlostanitem",
      name: "Passenger-lost-an-item",
      component: Passengerlostanitem,
      beforeEnter: AuthGuard
    },
    {
      path: "/passengermisconduct",
      name: "Passenger-misconduct",
      component: Passengermisconduct,
      beforeEnter: AuthGuard
    },
    {
      path: "/reportinganaccidentorviolentbehaviour",
      name: "Reporting-an-accident-or-violent-behaviour",
      component: Reportinganaccidentorviolentbehaviour,
      beforeEnter: AuthGuard
    },
    {
      path: "/havingatechnicalissue",
      name: "Having-a-technical-issue",
      component: Havingatechnicalissue,
      beforeEnter: AuthGuard
    },
    {
      path: "/otherquestions",
      name: "Other-questions",
      component: Otherquestions,
      beforeEnter: AuthGuard
    },
    {
      path: "/issueswithordernotification",
      name: "Issues-with-order-notification",
      component: Issueswithordernotification,
      beforeEnter: AuthGuard
    },
    {
      path: "/updatesfordriverapp",
      name: "Updates-for-driver-app",
      component: Updatesfordriverapp,
      beforeEnter: AuthGuard
    },
    {
      path: "/devicerequirements",
      name: "Device-requirements",
      component: Devicerequirements,
      beforeEnter: AuthGuard
    },
    {
      path: "/finishedandcompletionratecalculation",
      name: "Finished-and-completion-rate-calculation",
      component: Finishedandcompletionratecalculation,
      beforeEnter: AuthGuard
    },
    {
      path: "/outofradiusrides",
      name: "Out-of-radius-rides",
      component: Outofradiusrides,
      beforeEnter: AuthGuard
    },
    {
      path: "/acceptanceratecalculation",
      name: "Acceptance-rate-calculation",
      component: Acceptanceratecalculation,
      beforeEnter: AuthGuard
    },
    {
      path: "/callingapassenger",
      name: "Calling-a-passenger",
      component: Callingapassenger,
      beforeEnter: AuthGuard
    },
    {
      path: "/activityscorecalculation",
      name: "Activity-score-calculation",
      component: Activityscorecalculation,
      beforeEnter: AuthGuard
    },
    {
      path: "/usingdrivingradius",
      name: "Using-driving-radius",
      component: Usingdrivingradius,
      beforeEnter: AuthGuard
    },
    {
      path: "/improvingyourratings",
      name: "Improving-your-ratings",
      component: Improvingyourratings,
      beforeEnter: AuthGuard
    },
    {
      path: "/guidetobacktobackrides",
      name: "Guide-to-back-to-back-rides",
      component: Guidetobacktobackrides,
      beforeEnter: AuthGuard
    },
    {
      path: "/disablingbacktobackrides",
      name: "Disabling-back-to-back-rides",
      component: Disablingbacktobackrides,
      beforeEnter: AuthGuard
    },
    {
      path: "/getridestowardsyourdestination",
      name: "Get-rides-towards-your-destination",
      component: Getridestowardsyourdestination,
      beforeEnter: AuthGuard
    },
    {
      path: "/tipstogetmorejourneyrequests",
      name: "Tips-to-get-more-journey-requests",
      component: Tipstogetmorejourneyrequests,
      beforeEnter: AuthGuard
    },
    {
      path: "/waitingforpassenger",
      name: "Waiting-for-passenger",
      component: Waitingforpassenger,
      beforeEnter: AuthGuard
    },
    {
      path: "/ratingapassenger",
      name: "Rating-a-passenger",
      component: Ratingapassenger,
      beforeEnter: AuthGuard
    },
    {
      path: "/passengermadeamess",
      name: "Passenger-made-a-mess",
      component: Passengermadeamess,
      beforeEnter: AuthGuard
    },
    {
      path: "/safetytips",
      name: "Safety-tips",
      component: Safetytips,
      beforeEnter: AuthGuard
    },
    {
      path: "/understandingdriverfraud",
      name: "Understanding-driver-fraud",
      component: Understandingdriverfraud,
      beforeEnter: AuthGuard
    },
    {
      path: "/reasonsforablockedaccount",
      name: "Reasons-for-a-blocked-account",
      component: Reasonsforablockedaccount,
      beforeEnter: AuthGuard
    },
    {
      path: "/collectingandprocessingpersonaldata",
      name: "Collecting-and-processing-personal-data",
      component: Collectingandprocessingpersonaldata,
      beforeEnter: AuthGuard
    },
    {
      path: "/requestingyourdata",
      name: "Requesting-your-data",
      component: Requestingyourdata,
      beforeEnter: AuthGuard
    },
    {
      path: "/addingavehicle",
      name: "Adding-a-vehicle",
      component: Addingavehicle,
      beforeEnter: AuthGuard
    },
    {
      path: "/selectingavehicleinapp",
      name: "Selecting-a-vehicle-in-app",
      component: Selectingavehicleinapp,
      beforeEnter: AuthGuard
    },
    {
      path: "/resettingyourpassword",
      name: "Resetting-your-password",
      component: Resettingyourpassword,
      beforeEnter: AuthGuard
    },
    {
      path: "/uploadingyourdocuments",
      name: "Uploading-your-documents",
      component: Uploadingyourdocuments,
      beforeEnter: AuthGuard
    },
    {
      path: "/updatingyourbankdetails",
      name: "Updating-your-bank-details",
      component: Updatingyourbankdetails,
      beforeEnter: AuthGuard
    },
    {
      path: "/updatingyouraccountdetails",
      name: "Updating-your-account-details",
      component: Updatingyouraccountdetails,
      beforeEnter: AuthGuard
    },
    {
      path: "/yourprofilepicture",
      name: "Your-profile-picture",
      component: Yourprofilepicture,
      beforeEnter: AuthGuard
    },
    {
      path: "/deletingyouraccount",
      name: "Deleting-your-account",
      component: Deletingyouraccount,
      beforeEnter: AuthGuard
    },
    {
      path: "/documents",
      name: "Documents",
      component: Documents,
      beforeEnter: AuthGuard
    },
    {
      path: "/accountdetails",
      name: "Account-details",
      component: Accountdetails,
      beforeEnter: AuthGuard
    },
    {
      path: "/bankdetails",
      name: "Bank-details",
      component: Bankdetails,
      beforeEnter: AuthGuard
    },
    {
      path: "/earnings",
      name: "Earnings",
      component: Earnings,
      beforeEnter: AuthGuard
    },
    {
      path: "/signupclient",
      name: "Sign-up-client",
      component: Signupclient
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/termsandconditions",
      name: "Terms-and-Conditions",
      component: TermsandConditions
    },
    {
      path: "/becomedriver",
      name: "Become-driver",
      component: Becomedriver,
      beforeEnter: AuthGuard
    },
    {
      path: "/chat",
      name: "Chat",
      component: Chat,
      beforeEnter: AuthGuard
    },
    {
      path: "/faceapi",
      name: "Face-api",
      component: Faceapi
    },
    {
      path: "/signupdriver",
      name: "Sign-up-driver",
      component: Signupdriver
    },
    {
      path: "/driverrequests",
      name: "Driver-requests",
      component: Driverrequests,
      beforeEnter: AuthGuard
    },
    {
      path: "/searchforaride",
      name: "Search-for-a-ride",
      component: Searchforaride,
      beforeEnter: AuthGuard
    },
    {
      path: "/reports",
      name: "Reports",
      component: Reports
    },
    {
      path: "/authenticationdetails",
      name: "Authentication-details",
      component: Authenticationdetails,
      beforeEnter: AuthGuard
    },
    {
      path: "/supporttickets",
      name: "Support-tickets",
      component: Supporttickets,
      beforeEnter: AuthGuard
    }
  ]
});
