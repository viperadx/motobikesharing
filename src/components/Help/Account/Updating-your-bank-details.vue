<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Updating-your-bank-details",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.TechnicalProblems
        .updatingYourBankDetails;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
