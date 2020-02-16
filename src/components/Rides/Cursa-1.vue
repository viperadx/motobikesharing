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
      <router-link to="/passengerlostanitem">Passenger lost an item</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/parkingfeesandtolls">Parking fees and tolls</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/passengermisconduct">Passenger misconduct</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link
        to="/reportinganaccidentorviolentbehaviour"
      >Reporting an accident or violent behavior</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/havingatechnicalissue">Having a technical issue</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/requestingapricereview">Requesting a price review</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/technicalproblems">Technical problems</router-link>
    </v-layout>
    <v-layout text-center wrap>
      <router-link to="/otherquestions">Other questions</router-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Cursa-1",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
