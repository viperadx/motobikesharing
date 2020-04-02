<template>
  <v-container>
    <!-- <v-img :src="require('../../assets/exemplu cursa 1.jpeg')"></v-img> -->
    <!-- <v-text-field
      label="Average Rating"
      outlined
      readonly
      :value="Rides.rideId"
    ></v-text-field> -->
    <!-- <div>{{ currentUserRidesHistoryGetter.id }}</div> -->
    <v-text-field
      label="Date & time"
      outlined
      readonly="true"
      :value="rideDetails.timeStamp"
    ></v-text-field>
    <v-text-field
      label="Pick up location"
      outlined
      readonly="true"
      :value="rideDetails.price"
    ></v-text-field>
    <v-text-field
      label="Drop off location"
      outlined
      readonly="true"
      :value="rideDetails.price"
    ></v-text-field>
    <v-text-field
      label="Cost"
      outlined
      readonly="true"
      :value="rideDetails.price"
    ></v-text-field>
    <v-text-field
      label="Duration"
      outlined
      readonly="true"
      :value="rideDetails.duration"
    ></v-text-field>
    <v-text-field
      label="Distance"
      outlined
      readonly="true"
      :value="rideDetails.distance"
    ></v-text-field>
    <v-text-field
      label="Your driver"
      outlined
      readonly="true"
      :value="rideDetails.idDriver"
    ></v-text-field>

    <v-layout text-center wrap>
      Numele strazii(destinatia)
      <br />An.luna.zi ora.minut <br />Tarif xx.xx LEI <br />Statusul
      cursei(toate astea sa fie un link catre detaliile acestei curse)
    </v-layout>
    <v-layout text-center wrap>Need help?</v-layout>
    <v-layout text-center wrap>
      <router-link to="/passengerlostanitem"
        >Passenger lost an item</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/parkingfeesandtolls"
        >Parking fees and tolls</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/passengermisconduct">Passenger misconduct</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/reportinganaccidentorviolentbehaviour"
        >Reporting an accident or violent behavior</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/havingatechnicalissue"
        >Having a technical issue</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/requestingapricereview"
        >Requesting a price review</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/technicalproblems">Technical problems</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/otherquestions">Other questions</router-link>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import * as firebase from "firebase";
export default {
  data() {
    return {
      rideDetails: null,
      id: this.$route.params.id
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },

    userDetails() {
      return this.$store.getters.loggedInUserData;
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
    currentUserRidesHistoryGetter() {
      return this.$store.getters.currentUserRidesHistoryGetter
        ? this.$store.getters.currentUserRidesHistoryGetter
        : [];
    }
  },
  methods: {},
  created() {
    this.$store.dispatch("readUserDataByUserID", "idUser");
    this.$store.dispatch("readDriverDetailsByUserID", "idUser");
  },
  mounted() {
    firebase
      .database()
      .ref("/Rides/" + this.id)
      .on("value", snap => {
        this.rideDetails = snap.val();
      });
  }
};
</script>

<style scoped>
.custom-test-chestii {
  position: absolute;
  height: 100px;
  right: 40vw;
  bottom: 5vh;
  display: flex;
  flex-flow: column;
  padding: 10px;
}
</style>
