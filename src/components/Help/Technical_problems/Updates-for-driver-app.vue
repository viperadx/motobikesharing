<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Updates-for-driver-app",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.TechnicalProblems
        .updatesForDriverApp;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
