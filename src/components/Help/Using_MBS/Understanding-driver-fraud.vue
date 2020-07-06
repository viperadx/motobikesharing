<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Understanding-driver-fraud",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS
        .understandingDriverFraud;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
