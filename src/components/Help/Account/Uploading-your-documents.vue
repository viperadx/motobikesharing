<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Uploading-your-documents",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Account.uploadingYourDocuments;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
