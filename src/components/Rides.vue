<template>
  <v-container>
    <v-layout text-center wrap>
      Ultima cursa cu detaliile separate de; pe fiecare rand:
      <br />Numele strazii(destinatia); <br />An.luna.zi ora.minut;
      <br />tariful cursei LEI xx.xx; <br />Statusul cursei(toate astea sa fie
      un link catre detaliile acesteicurse)
    </v-layout>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        label="Average Rating"
        outlined
        readonly
        :value="userData.avgRating"
      ></v-text-field>
      <v-text-field
        label="Number of Rides"
        outlined
        readonly
        :value="userData.noOfRides"
      ></v-text-field>
    </v-col>
    <div class="custom-test-chestii">
      <v-btn color="green" fab x-large @click="setloggedInUserData()">
        <v-icon>mdi-motorbike</v-icon>
      </v-btn>
    </div>
    <v-layout text-center wrap>
      <router-link to="/Cursa1">Cursa 1</router-link>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "Rides",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userDetails() {
      return this.$store.getters.loggedInUserData;
    },
    userData() {
      return this.$store.getters.userDataGetter
        ? this.$store.getters.userDataGetter
        : "";
    },
    driverData() {
      return this.$store.getters.presentDriverDataGetter
        ? this.$store.getters.presentDriverDataGetter
        : "";
    },
    setloggedInUserData() {
      return this.setloggedInUserData;
    }
  },
  methods: {},
  created() {},
  mounted() {
    this.$store.dispatch("");
  }
};
</script>

<style scoped>
.custom-test-chestii {
  position: absolute;
  height: 100px;
  right: 40vw;
  bottom: 5vh;
  display: flex;
  flex-flow: column;
  padding: 10px;
}
</style>
