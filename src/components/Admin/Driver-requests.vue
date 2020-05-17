<template>
  <v-container grid-list-sm class="pa-4">
    <v-text-field
      label="Driver/User ID"
      outlined
      readonly
      :value="driverDetails.idUser"
    ></v-text-field>
    <v-text-field
      label="Expire date ID"
      outlined
      readonly
      :value="driverDetails.expireDateID"
    ></v-text-field>
    <v-text-field
      label="Expire date ITP"
      outlined
      readonly
      :value="driverDetails.expireDateITP"
    ></v-text-field>
    <v-text-field
      label="Expire date Insurance"
      outlined
      readonly
      :value="driverDetails.expireDateInsurance"
    ></v-text-field>
    <v-text-field
      label="Expire date License"
      outlined
      readonly
      :value="driverDetails.expireDateLicense"
    ></v-text-field>
    <v-text-field
      label="Expire date RCA"
      outlined
      readonly
      :value="driverDetails.expireDateRCA"
    ></v-text-field>
    <v-select
      :items="checkStatuses"
      v-model="checkStatusInitial"
      color="normal"
      label="Verification status"
    ></v-select>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import * as firebase from "firebase";
export default {
  name: "Driver-requests",
  data() {
    return {
      driverDetails: null,
      id: this.$route.params.id,
      checkStatusInitial: "pending",
      checkStatuses: ["verified", "pending", "need more info", "declined"],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    allDriversDataGetter() {
      return this.$store.getters.allDriversDataGetter
        ? this.$store.getters.allDriversDataGetter
        : "";
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("readAllDriversDetails", this.id);
  },
  mounted() {
    firebase
      .database()
      .ref("/Drivers/" + this.id)
      .on("value", (snap) => {
        this.driverDetails = snap.val();
      });
  },
};
</script>
