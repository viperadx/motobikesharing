<template>
  <v-container>
    <v-layout text-center wrap>
      Ultima cursa cu detaliile separate de; pe fiecare rand:
      <br />Numele strazii(destinatia);
      <br />An.luna.zi ora.minut;
      <br />tariful cursei LEI xx.xx;
      <br />Statusul cursei(toate astea sa fie un link catre detaliile acesteicurse)
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/Cursa1">Cursa 1</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Rides",
  data() {
    return {};
  }
};
</script>
