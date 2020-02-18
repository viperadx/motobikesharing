<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Resetting-your-password",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.TechnicalProblems
        .resettingYourPassword;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
