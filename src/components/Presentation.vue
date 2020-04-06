<template>
  <v-container>
    <v-layout text-center wrap>Test Presentation</v-layout>
    <v-layout text-center wrap>
      <router-link to="/login">Log In</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/signup">Sign up</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Presentation",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
