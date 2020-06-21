<template>
  <v-container>
    <v-col cols="12" sm="6" md="3">
      <div v-if="itemsdriverearnings">
        <v-text-field
          label="All-Time Earnings"
          outlined
          readonly
          :value="itemsdriverearnings[0].earning.toFixed(2)"
        ></v-text-field>
      </div>
      <div v-if="driverData">
        <v-text-field
          label="Paid Earnings"
          outlined
          readonly
          :value="driverData.totalPaymentsMade.toFixed(2)"
        ></v-text-field>
      </div>
      <div v-if="payment">
        <v-text-field
          label="Unpaid Earnings"
          outlined
          readonly
          :value="payment.toFixed(2)"
        ></v-text-field>
      </div>
      <div>
        <v-btn depressed large color="primary" @click="getPaid">Get Paid</v-btn>
      </div>
    </v-col>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import * as firebase from "firebase";
export default {
  name: "Earnings",
  data() {
    return {
      itemsdriverearnings: null,
      payment: null,
    };
  },
  computed: {
    userID() {
      return this.$store.getters.user;
    },
    userDetails() {
      return this.$store.getters.loggedInUserData
        ? this.$store.getters.loggedInUserData
        : [];
    },
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
    currentDriverRidesHistoryGetter() {
      return this.$store.getters.currentDriverRidesHistoryGetter
        ? this.$store.getters.currentDriverRidesHistoryGetter
        : [];
    },
  },
  methods: {
    getPaid() {
      return firebase
        .database()
        .ref("Drivers" + "/" + this.userID)
        .update({
          totalPaymentsMade: parseFloat(
            this.itemsdriverearnings[0].earning.toFixed(2)
          ),
        })
        .then(() => {
          this.driverEarnings();
        });
    },
    driverEarnings() {
      return firebase
        .database()
        .ref("DriversRidesHistory" + "/" + this.userID)
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allEarned = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              // allSpendings.push(myObj[key][key1].price);
              const allEarnings = {};
              allEarnings.earning = myObj[key].earning;
              allEarnings.keyUser = this.userID;

              allEarned.push(allEarnings);
            });
            allEarned.forEach((item) => {
              let sums = sumsArray[item.keyUser];
              if (sums) {
                sums.earning += item.earning;
              } else {
                sumsArray[item.keyUser] = {
                  keyUser: item.keyUser,
                  earning: item.earning,
                };
              }
            });
            this.itemsdriverearnings = Object.keys(sumsArray).map((key) => {
              return sumsArray[key];
            });
            this.payment =
              this.itemsdriverearnings[0].earning -
              this.driverData.totalPaymentsMade;
          },

          (error) => {
            console.log("driverEarnings Error: " + error.message);
          }
        );
    },
  },
  created() {
    this.$store.dispatch("readAllRidesDetailsByDriverID", this.userID);
    this.$store.dispatch("readDriverDetailsByUserID", this.userID);
  },
  mounted() {
    this.driverEarnings();
  },
};
</script>
