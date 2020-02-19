<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Parking-fees-and-tolls",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Earnings.parkingFeesAndTolls;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>