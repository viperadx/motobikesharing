<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Guide-to-back-to-back-rides",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS.guideToBacktoBackRides;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
