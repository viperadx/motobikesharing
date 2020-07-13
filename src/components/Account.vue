<template>
  <v-container>
    <v-col cols="12" sm="6" md="3">
      <div v-if="itemsallclientsnoofrides && itemsallclientsavgrating">
        Client stats
        <br />
        <v-text-field
          label="Average Rating"
          outlined
          readonly
          :value="itemsallclientsavgrating[0].ratingForClient.toFixed(2)"
        ></v-text-field>

        <v-text-field
          label="Number of Rides"
          outlined
          readonly
          :value="itemsallclientsnoofrides[0].rides"
        ></v-text-field>
      </div>
      <div
        v-if="
          userDetails.idDriver &&
            itemsalldriversnoofrides &&
            itemsalldriversavgrating
        "
      >
        Driver stats
        <br />
        <v-text-field
          label="Average Rating"
          outlined
          readonly
          :value="itemsalldriversavgrating[0].ratingForDriver.toFixed(2)"
        ></v-text-field>

        <v-text-field
          label="Number of Rides"
          outlined
          readonly
          :value="itemsalldriversnoofrides[0].rides"
        ></v-text-field>
      </div>
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
    <v-layout text-center wrap>
      <router-link to="/bankdetails">Bank details</router-link>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import * as firebase from "firebase";
export default {
  name: "Account",
  data() {
    return {
      itemsallclientsnoofrides: null,
      itemsallclientsavgrating: null,
      itemsalldriversnoofrides: null,
      itemsalldriversavgrating: null,
      ratingForClient: null,
      name: "",
      readonlyData: true,
      email: "",
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userDataGetter
        ? this.$store.getters.userDataGetter
        : "";
    },
    driverData() {
      return this.$store.getters.presentDriverDataGetter
        ? this.$store.getters.presentDriverDataGetter
        : "";
    },
    userDetails() {
      return this.$store.getters.loggedInUserData
        ? this.$store.getters.loggedInUserData
        : [];
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
            let allCRides = [];
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const allClientsRides = {};
              allClientsRides.keyRide = key;
              allClientsRides.keyUser = this.userID;
              allCRides.push(allClientsRides);
            });
            allCRides.forEach((item) => {
              let sums = sumsArray[item.keyUser];
              if (sums) {
                sums.rides += 1;
              } else {
                sumsArray[item.keyUser] = {
                  rides: 1,
                };
              }
            });
            this.itemsallclientsnoofrides = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allClientsNoRides Error: " + error.message);
          }
        );
    },
    allClientsAvgRating() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory" + "/" + this.userID)
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            const myObj = snap.val();
            let allCAvgRating = [];
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (
                myObj[key].ratingForClient &&
                myObj[key].ratingForClient !== "no input at the moment"
              ) {
                const allClientsAvgRating = {};
                allClientsAvgRating.ratingForClient =
                  myObj[key].ratingForClient;
                allClientsAvgRating.keyUser = this.userID;
                allCAvgRating.push(allClientsAvgRating);
              }
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
            console.log("allClientsNoRides Error: " + error.message);
          }
        );
    },
    allDriversNoRides() {
      return firebase
        .database()
        .ref("DriversRidesHistory" + "/" + this.userID)
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allDRides = [];
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const allDriversRides = {};
              allDriversRides.keyRide = key;
              allDriversRides.keyUser = this.userID;
              allDRides.push(allDriversRides);
            });
            allDRides.forEach((item) => {
              let sums = sumsArray[item.keyUser];
              if (sums) {
                sums.rides += 1;
              } else {
                sumsArray[item.keyUser] = {
                  rides: 1,
                };
              }
            });
            this.itemsalldriversnoofrides = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allDriversNoRides Error: " + error.message);
          }
        );
    },
    allDriversAvgRating() {
      return firebase
        .database()
        .ref("DriversRidesHistory" + "/" + this.userID)
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            const myObj = snap.val();
            let allDAvgRating = [];
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (
                myObj[key].ratingForDriver &&
                myObj[key].ratingForDriver !== "no input at the moment"
              ) {
                const allDriversAvgRating = {};
                allDriversAvgRating.ratingForDriver =
                  myObj[key].ratingForDriver;
                allDriversAvgRating.keyUser = this.userID;
                allDAvgRating.push(allDriversAvgRating);
              }
            });
            allDAvgRating.forEach((item) => {
              let sums = sumsArray[item.keyUser];
              if (sums) {
                (sums.ratingForDriverNominator += item.ratingForDriver),
                  (sums.ratingForDriverDenominator += 1),
                  (sums.ratingForDriver =
                    sums.ratingForDriverNominator /
                    sums.ratingForDriverDenominator);
              } else {
                sumsArray[item.keyUser] = {
                  keyUser: item.keyUser,
                  ratingForDriverNominator: item.ratingForDriver,
                  ratingForDriverDenominator: 1,
                  ratingForDriver: item.ratingForDriver,
                };
              }
            });
            this.itemsalldriversavgrating = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allClientsNoRides Error: " + error.message);
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
    this.allDriversAvgRating();
    this.allDriversNoRides();
  },
};
</script>
