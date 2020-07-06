<template>
  <v-container>
    <v-layout text-center wrap>
      <router-link to="/reasonsforablockedaccount"
        >Reasons for a blocked account</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/collectingandprocessingpersonaldata"
        >Collecting and processing personal data</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/requestingyourdata">Requesting your data</router-link>
    </v-layout>
    <!-- <v-layout text-center wrap>
      <router-link to="/addingavehicle">Adding a vehicle</router-link>
    </v-layout> -->
    <!-- <v-layout text-center wrap>
      <router-link to="/selectingavehicleinapp"
        >Selecting a vehicle in-app</router-link
      >
    </v-layout> -->
    <v-layout text-center wrap>
      <router-link to="/resettingyourpassword"
        >Resetting your password</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/uploadingyourdocuments"
        >Uploading your documents</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/updatingyouraccountdetails"
        >Updating your account details</router-link
      >
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/updatingyourbankdetails"
        >Updating your bank details</router-link
      >
    </v-layout>
    <!-- <v-layout text-center wrap>
      <router-link to="/yourprofilepicture">Your profile picture</router-link>
    </v-layout> -->
    <v-layout text-center wrap>
      <router-link to="/deletingyouraccount">Deleting your account</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Account-help",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
