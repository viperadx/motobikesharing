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
        :value="userData.noOfRides"
      ></v-text-field> -->
    </v-col>
    <div v-if="!this.userDetails.idDriver && this.userDetails.Admin === false">
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
/* eslint-disable no-console */
export default {
  name: "Account",
  data() {
    return {
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
  },
  methods: {
    faCeva() {
      this.readonlyData = !this.readonlyData;
    },
  },
  created() {
    this.$store.dispatch("readUserDataByUserID", "idUser");
    this.$store.dispatch("readDriverDetailsByUserID", "idUser");
  },
  mounted() {},
};
</script>
