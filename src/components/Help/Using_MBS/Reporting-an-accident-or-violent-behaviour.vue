<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Reporting-an-accident-or-violent-behaviour",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS
        .reportingAnAccidentorViolentBehaviour;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
