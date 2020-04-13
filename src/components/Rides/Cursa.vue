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
      readonly
      :value="rideDetails.timeStampFull"
    ></v-text-field>
    <v-text-field
      label="Pick up location"
      outlined
      readonly
      :value="rideDetails.userStartPoint"
    ></v-text-field>
    <v-text-field
      label="Drop off location"
      outlined
      readonly
      :value="rideDetails.userFinishPoint"
    ></v-text-field>
    <v-text-field
      label="Cost"
      outlined
      readonly
      :value="rideDetails.price"
    ></v-text-field>
    <v-text-field
      label="Duration"
      outlined
      readonly
      :value="rideDetails.duration"
    ></v-text-field>
    <v-text-field
      label="Distance"
      outlined
      readonly
      :value="rideDetails.distance"
    ></v-text-field>
    <v-text-field
      v-if="currentUserRidesHistoryGetter.length > 0"
      label="Your driver"
      outlined
      readonly
      :value="rideDetails.driverFullName"
    ></v-text-field>

    <div v-if="currentUserRidesHistoryGetter.length > 0">
      <div v-if="rideDetails.ratingForDriver === 'no input at the moment'">
        Select a rating for your driver
        <v-rating v-model="ratingForDriver"></v-rating>
        <v-btn
          depressed
          small
          color="primary"
          @click="sendRatingForDriverFromHistory()"
          >Send rating</v-btn
        >
      </div>
      <div v-else>
        <v-text-field
          label="Rating given to driver"
          outlined
          readonly
          :value="rideDetails.ratingForDriver"
        ></v-text-field>
      </div>
    </div>

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
      readonlyData: true,
      id: this.$route.params.id,
      // rideId: this.$route.params.id,
      ratingForDriver: 3
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
  methods: {
    sendRatingForDriverFromHistory() {
      const payload = {
        ratingForDriver: this.ratingForDriver,
        id: this.id
        // rideId: this.rideDetails.rideId,
      };
      this.$store.dispatch("sendRatingForDriverFromHistory", payload);
    }
  },
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
