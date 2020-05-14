<template>
  <v-container>
    <!-- <v-layout text-center wrap>
      Ultima cursa cu detaliile separate de; pe fiecare rand:
      <br />Numele strazii(destinatia); <br />An.luna.zi ora.minut;
      <br />tariful cursei LEI xx.xx; <br />Statusul cursei(toate astea sa fie
      un link catre detaliile acesteicurse)
    </v-layout>
    <div>{{ user }}</div> -->
    <v-col cols="12" sm="6" md="3">
      <div v-if="currentDriverRidesHistoryGetter.length > 0">
        Driver rides
      </div>
      <v-list v-if="currentDriverRidesHistoryGetter.length > 0">
        <v-list-item
          v-for="ride in currentDriverRidesHistoryGetter"
          :key="ride.rideId"
          :to="{
            name: 'Cursa',
            params: { id: ride.rideId },
          }"
        >
          {{ ride.timeStampFull }}
        </v-list-item>
      </v-list>
      <div v-if="currentUserRidesHistoryGetter.length > 0">
        User rides
      </div>
      <v-list v-if="currentUserRidesHistoryGetter.length > 0">
        <v-list-item
          v-for="ride in currentUserRidesHistoryGetter"
          :key="ride.rideId"
          :to="{
            name: 'Cursa',
            params: { id: ride.rideId },
          }"
        >
          {{ ride.timeStampFull }}
        </v-list-item>
      </v-list>
    </v-col>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "Rides",
  data() {
    return {};
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
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("readUserDataByUserID", this.$store.getters.user);
    this.$store.dispatch("readDriverDetailsByUserID", this.$store.getters.user);
  },
  mounted() {
    this.$store.dispatch("");
  },
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
