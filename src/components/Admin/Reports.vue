<template>
  <v-container>
    <!-- // TODO: aici tre sa mai adaug pie chart uri etc -->
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
  name: "Reports",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
