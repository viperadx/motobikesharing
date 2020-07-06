<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Passenger-made-a-mess",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS.passengerMadeAmess;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
