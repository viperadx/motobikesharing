<template>
  <v-container>
    <v-layout text-center wrap>Browse FAQ articles</v-layout>
    <div v-if="userDetails.idDriver">
      <v-layout text-center wrap>
        <router-link to="/earnings">Earnings</router-link>
      </v-layout>
    </div>
    <v-layout text-center wrap>
      <router-link to="/technicalproblems">Technical problems</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/usingmbs">Using MBS</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/accounthelp">Account</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Other-questions",
  data() {
    return {};
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
  methods: {},
  created() {
    this.$store.dispatch("readUserDataByUserID", this.userID);
    this.$store.dispatch("readDriverDetailsByUserID", this.userID);
  },
  mounted() {},
};
</script>
