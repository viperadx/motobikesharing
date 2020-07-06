<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Passenger-misconduct",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS.passengerMisconduct;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
