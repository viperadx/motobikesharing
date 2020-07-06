<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Finished-and-completion-rate-calculation",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS
        .finishedAndCompletionRateCalculation;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
