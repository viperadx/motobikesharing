<template>
  <v-container>
    <v-layout text-center wrap>{{ text }}</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Your-profile-picture",
  data() {
    return {};
  },
  computed: {
    text() {
      return this.$store.getters.allTextsGetter.Account.yourProfilePicture;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
