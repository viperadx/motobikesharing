<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Weekly-payouts-and-bonuses",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter
        ? this.$store.getters.allTextsGetter.Earnings.weeklyPayoutsAndBonuses
        : "";
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
