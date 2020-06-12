<template>
  <v-container>
    <!-- <div>{{ userDetails }}</div> -->
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        label="Average Rating"
        outlined
        readonly
        :value="userDetails.Name"
      ></v-text-field>

      <!-- <v-text-field
        label="Number of Rides"
        outlined
        readonly
        :value="itemsallclientsnoofrides.rides"
      ></v-text-field> -->
    </v-col>
    <div v-if="!this.userDetails.idDriver && this.userDetails.admin === false">
      <v-layout text-center wrap
        ><router-link to="/becomedriver">
          Do you want to become a driver on the platform?</router-link
        ></v-layout
      >
    </div>
    <v-layout text-center wrap
      >You can view or change details on the following links:</v-layout
    >
    <v-layout text-center wrap>
      <router-link to="/authenticationdetails"
        >Authentication details</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/accountdetails">Account details</router-link>
    </v-layout>
    <div v-if="this.userDetails.idDriver">
      <v-layout text-center wrap>
        <router-link to="/vehicledocuments">Vehicle documents</router-link>
      </v-layout>
    </div>
    <!-- <v-layout text-center wrap v-if="this.userDetails.idDriver">
      <router-link to="/documents">Personal documents</router-link>
    </v-layout> -->
    <v-layout text-center wrap>
      <router-link to="/bankdetails">Bank details</router-link>
    </v-layout>
  </v-container>
</template>

<script>
//TODO: adauga media de rating si totalul de curse din reports.vue
/* eslint-disable no-console */
import * as firebase from "firebase";
export default {
  name: "Account",
  data() {
    return {
      itemsallclientsnoofrides: [],
      itemsallclientsavgrating: [],
      name: "",
      readonlyData: true,
      email: "",
    };
  },
  computed: {
    // userData() {
    //   return this.$store.getters.userDataGetter
    //     ? this.$store.getters.userDataGetter
    //     : "";
    // },
    driverData() {
      return this.$store.getters.presentDriverDataGetter
        ? this.$store.getters.presentDriverDataGetter
        : "";
    },
    userDetails() {
      return this.$store.getters.loggedInUserData;
    },
    userID() {
      return this.$store.getters.user ? this.$store.getters.user : "";
    },
  },
  methods: {
    allClientsNoRides() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory" + "/" + this.userID)
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allRides2 = [];
            let allCRides = [];
            const keysHistory = Object.keys(snap.val());
            keysHistory.forEach((key) => {
              const allClientsRides = {};
              allClientsRides.keyRide = key;
              allCRides.push(allClientsRides);
            });
            allCRides.forEach((item) => {
              let sums = sumsArray[item.keyRide];
              if (sums) {
                sums.rides += 1;
              } else {
                sumsArray = {
                  rides: 1,
                };
              }
            });
            console.log(sumsArray);
            allRides2.push(sumsArray);
            this.itemsallclientsnoofrides = allRides2;
          },
          (error) => {
            console.log("allClientsNoRides Error: " + error.message);
          }
        );
    },
    allClientsAvgRating() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory" + this.userID)
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allCAvgRating = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                const allClientsAvgRating = {};
                allClientsAvgRating.ratingForClient =
                  myObj[key][key1].ratingForClient;
                allClientsAvgRating.keyUser = key;
                allCAvgRating.push(allClientsAvgRating);
              });
            });
            allCAvgRating.forEach((item) => {
              let sums = sumsArray[item.keyUser];
              if (sums) {
                (sums.ratingForClientNominator += item.ratingForClient),
                  (sums.ratingForClientDenominator += 1),
                  (sums.ratingForClient =
                    sums.ratingForClientNominator /
                    sums.ratingForClientDenominator);
              } else {
                sumsArray[item.keyUser] = {
                  keyUser: item.keyUser,
                  ratingForClientNominator: item.ratingForClient,
                  ratingForClientDenominator: 1,
                  ratingForClient: item.ratingForClient,
                };
              }
            });
            this.itemsallclientsavgrating = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allClientsAvgRating Error: " + error.message);
          }
        );
    },
  },
  created() {
    this.$store.dispatch("readUserDataByUserID", this.userID);
    this.$store.dispatch("readDriverDetailsByUserID", this.userID);
  },
  mounted() {
    this.allClientsAvgRating();
    this.allClientsNoRides();
  },
};
</script>
