<template>
  <v-container>
    <v-layout text-center wrap>test list all news/test passed</v-layout>
    <v-date-picker
      v-model="date"
      lang="en"
      type="date"
      format="YYYY-MM-dd"
    ></v-date-picker>
  </v-container>
</template>

<script>
export default {
  name: "List-all-news",
  data() {
    return {
      date: ""
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
