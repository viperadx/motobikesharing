<template>
  <v-container>
    <v-layout text-center wrap>
      // TODO: aici tre sa mai adaug pie chart uri etc</v-layout
    >
    <v-layout text-center wrap>
      <router-link to="/Driverrequests">Driver requests</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {};
  },
  computed: {
    userDetails() {
      return this.$store.getters.loggedInUserData;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
