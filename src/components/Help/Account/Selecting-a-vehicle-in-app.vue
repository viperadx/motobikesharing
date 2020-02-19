<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Selecting-a-vehicle-in-app",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Account.selectingAvehicleInApp;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
