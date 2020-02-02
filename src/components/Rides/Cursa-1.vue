<template>
  <v-container>
    <v-img :src="require('../../assets/exemplu cursa 1.jpeg')"></v-img>
    <v-layout text-center wrap>
      Numele strazii(destinatia)
      <br />An.luna.zi ora.minut
      <br />Tarif xx.xx LEI
      <br />Statusul cursei(toate astea sa fie un link catre detaliile acestei curse)
    </v-layout>
    <v-layout text-center wrap>Need help?</v-layout>
    <v-layout text-center wrap>
      <router-link to="/Passengerlostanitem">Passenger lost an item</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/Parkingfeesandtolls">Parking fees and tolls</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/Passengermisconduct">Passenger misconduct</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link
        to="/Reportinganaccidentorviolentbehaviour"
      >Reporting an accident or violent behavior</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/Havingatechnicalissue">Having a technical issue</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/Requestingapricereview">Requesting a price review</router-link>
    </v-layout>
    <v-layout text-center wrap>
      Aici tre sa mai adaug:
      <br />Having a technical issue
      <br />Other question (FAQ)
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Cursa-1",
  data() {
    return {};
  }
};
</script>
