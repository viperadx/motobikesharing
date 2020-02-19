<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Driver-paid-wait-time-fees",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Earnings.driverPaidWaitTimeFees;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
