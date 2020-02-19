<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Requesting-a-price-review",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Earnings.requestingApriceReview;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>