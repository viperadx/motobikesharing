<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Help-with-rides",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.HelpWithRides;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
