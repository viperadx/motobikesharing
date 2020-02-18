<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Having-a-technical-issue",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.TechnicalProblems
        .havingAtechnicalIssue;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
