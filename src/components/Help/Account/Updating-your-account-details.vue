<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Updating-your-account-details",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Account
        .updatingYourAccountDetails;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
