<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Passenger-lost-an-item",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS.passengerLostAnItem;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
