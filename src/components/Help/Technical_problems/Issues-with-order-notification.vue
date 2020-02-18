<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Issues-with-order-notification",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.TechnicalProblems
        .issuesWithOrderNotification;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
