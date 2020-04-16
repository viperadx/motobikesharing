<template>
  <v-container>
    <v-layout text-center wrap>test Become-driver</v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "Driver-requests",
  data() {
    return {};
  },
  computed: {
    user() {return this.$store.getters.user;},
    allDriversDataGetter() 
      {return this.$store.getters.allDriversDataGetter ? this.$store.getters.allDriversDataGetter: "";},
    },
  methods: {},
  created() {
    this.$store.dispatch("readAllDriversDetails");
  },
  mounted() {}
};
</script>
