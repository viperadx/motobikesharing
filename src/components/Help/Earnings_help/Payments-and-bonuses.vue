<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Payments-and-bonuses",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Earnings.paymentsAndbonuses;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>