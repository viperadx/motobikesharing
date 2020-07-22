<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Terms-and-Conditions",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.GDPR.gdpr;
    },
  },
  methods: {},
  created() {
    // this.$store.dispatch("readAllTexts");
  },
  mounted() {},
};
</script>
