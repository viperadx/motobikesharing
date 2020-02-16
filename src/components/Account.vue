<template>
  <v-container>
    <v-img :src="require('../assets/exemplu profil.jpeg')"></v-img>
    <v-layout text-center wrap>Active vehicle</v-layout>
    <v-layout text-center wrap>Aici tre sa fie nr. de inmatriculare/bicicleta</v-layout>
    <v-layout text-center wrap>
      <router-link to="/changevehicle">Change vehicle</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/documents">Documents</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/accountdetails">Account details</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/bankdetails">Bank details</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>