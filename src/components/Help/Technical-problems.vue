<template>
  <v-container>
    <v-layout text-center wrap>Technical problems</v-layout>
    <v-layout text-center wrap>
      <router-link to="/issueswithordernotification">Issues with order notification</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/updatesfordriverapp">Updates for driver app</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/havingatechnicalissue">Having a technical issue</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/devicerequirements">Device requirements</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Technical-problems",
  data() {
    return {};
  }
};
</script>
