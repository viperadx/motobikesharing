<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Using-driving-radius",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS.usingDrivingRadius;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
