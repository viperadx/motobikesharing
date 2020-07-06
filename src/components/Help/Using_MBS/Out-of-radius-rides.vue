<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Out-of-radius-rides",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS.improvingYourRatings;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
