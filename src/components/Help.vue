<template>
  <v-container>
    <v-layout text-center wrap>Latest news(doar ultima stire)</v-layout>
    <v-layout text-center wrap>
      <router-link to="/listallnews">List all news</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/campaigns">Campaigns</router-link>
    </v-layout>
    <v-layout text-center wrap>Support</v-layout>
    <v-layout text-center wrap>
      <router-link to="/helpwithrides">Help with rides</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/winnings">Winnings</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/technicalproblems">Technical problems</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/usingmbs">Using MBS</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/account">Account</router-link>
    </v-layout>
    <v-layout text-center wrap>Conversations</v-layout>
    <v-layout text-center wrap>
      <router-link to="/seeallconversations">See all conversations</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Help",

  data() {}
};
</script>
