<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Waiting-for-passenger",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS.waitingForPassenger;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
