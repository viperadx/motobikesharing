<template>
  <v-container>
    <div>{{ userData | json}}</div>
    <div v-if="!userCanEdit">{{ userData | json}}</div>
    <div v-if="userCanEdit">
      <v-text-field :v-model="name"></v-text-field>
    </div>
    <v-btn @click="faCeva()">{{ userCanEdit ? 'Save' : 'Edit'}}</v-btn>
    <!-- <v-img :src="require('../assets/exemplu profil.jpeg')"></v-img> -->
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
    return {
      name: "",
      userCanEdit: false
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userDataGetter
        ? this.$store.getters.userDataGetter
        : "";
    },
    driverData() {
      return this.$store.getters.presentDriverDataGetter
        ? this.$store.getters.presentDriverDataGetter
        : "";
    }
  },
  methods: {
    faCeva() {
      this.userCanEdit = !this.userCanEdit;
    }
  },
  created() {
    this.$store.dispatch("readUserDataByUserID", "idUser");
    this.$store.dispatch("readDriverDetailsByUserID", "idUser");
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.$store.getters.allDriversDataGetter);
  }
};
</script>