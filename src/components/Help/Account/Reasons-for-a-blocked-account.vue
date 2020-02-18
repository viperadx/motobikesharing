<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Reasons-for-a-blocked-account",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.TechnicalProblems
        .reasonsForAblockedAccount;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
