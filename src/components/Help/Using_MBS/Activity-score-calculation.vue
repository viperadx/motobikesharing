<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Activity-score-calculation",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS
        .activityScoreCalculation;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
