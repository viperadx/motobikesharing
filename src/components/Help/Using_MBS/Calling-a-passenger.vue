<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Calling-a-passenger",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.UsingMBS.callingApassenger;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
