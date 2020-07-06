<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Acceptance-rate-calculation",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS
        .acceptanceRateCalculation;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
