<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Cancellation-fee",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Earnings.cancellationFee;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
