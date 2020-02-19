<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Adding-a-vehicle",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Account.addingAvehicle;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
