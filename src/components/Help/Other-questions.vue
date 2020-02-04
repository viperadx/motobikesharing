<template>
  <v-container>
    <v-layout text-center wrap>Browse FAQ articles</v-layout>
    <v-layout text-center wrap>test other questions/test passed</v-layout>
    <v-layout text-center wrap>
      <router-link to="/earnings">Earnings</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/technicalproblems">Technical problems</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/usingmbs">Using MBS</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/accounthelp">Account</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Other-questions",
  data() {
    return {};
  }
};
</script>