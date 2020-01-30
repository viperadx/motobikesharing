<template>
  <v-container>
    <v-layout text-center wrap>Active vehicle</v-layout>
    <v-layout text-center wrap>Aici tre sa fie nr. de inmatriculare/bicicleta</v-layout>
    <v-layout text-center wrap>
      <router-link to="/changevehicle">Change vehicle</router-link>
    </v-layout>
    <v-layout text-center wrap>Aplicatie navigare</v-layout>
    <v-layout text-center wrap>Pornire automata (trigger)</v-layout>
    <v-layout text-center wrap>Mod intunecat (trigger)</v-layout>
    <v-layout text-center wrap>Nr versiune</v-layout>
    <v-layout text-center wrap>Logout</v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Settings",
  data () {
    return {
    }
  }
}
</script>
