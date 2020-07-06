<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Tips-to-get-more-journey-requests",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS
        .tipsToGetMoreJourneyRequests;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
