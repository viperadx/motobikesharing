<template>
  <v-container>
    <div>{{ userData.email }}</div>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        label="First Name"
        outlined
        :readonly="readonlyData"
        :value="userData.firstName"
      ></v-text-field>
      <v-text-field
        label="Last Name"
        outlined
        :readonly="readonlyData"
        :value="userData.lastName"
      ></v-text-field>
      <v-text-field
        label="Email"
        outlined
        v-if="driverData"
        :readonly="readonlyData"
        :value="userData.email"
      ></v-text-field>
      <v-text-field
        label="Phone number"
        outlined
        :readonly="readonlyData"
        :value="userData.phoneNumber"
      ></v-text-field>
    </v-col>

    {{ driverData ? "da" : "nu" }}
    <v-btn @click="faCeva()">{{ readonlyData ? "Edit" : "Save" }}</v-btn>
    <!-- <v-img :src="require('../assets/exemplu profil.jpeg')"></v-img> -->
    <v-layout text-center wrap>Active vehicle</v-layout>
    <v-layout text-center wrap
      >Aici tre sa fie nr. de inmatriculare/bicicleta</v-layout
    >
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
      readonlyData: true,
      email: ""
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
      this.readonlyData = !this.readonlyData;
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
