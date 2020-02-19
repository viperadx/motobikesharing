<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Passenger-campaigns",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Earnings.passengerCampaigns;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>