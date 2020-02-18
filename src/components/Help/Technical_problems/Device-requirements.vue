<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Device-requirements",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.TechnicalProblems
        .deviceRequirements;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
