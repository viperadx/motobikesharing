<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Collecting-and-processing-personal-data",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.TechnicalProblems
        .collectingAndProcessingPersonalData;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
