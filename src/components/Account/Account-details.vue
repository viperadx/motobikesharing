<template>
  <v-container>
    <!-- <div>{{ userData.email }}</div> -->
    <v-switch
      v-model="readonly"
      inset
      :label="`Readonly: ${readonly.toString()}`"
    ></v-switch>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        label="First Name"
        outlined
        :readonly="readonly"
        :value="userDetails.firstName"
        id="firstName"
      ></v-text-field>
      <v-text-field
        label="Last Name"
        outlined
        :readonly="readonly"
        :value="userDetails.lastName"
        id="lastName"
      ></v-text-field>
      <v-text-field
        label="Phone number"
        outlined
        :readonly="readonly"
        :value="userDetails.phone"
        id="phone"
      ></v-text-field>
      <v-text-field
        label="Residency"
        outlined
        :readonly="readonly"
        :value="userDetails.location"
        id="location"
      ></v-text-field>
    </v-col>
    <div v-if="readonly === false">
      <v-btn
        :loading="loading3"
        :disabled="loading3"
        color="blue-grey"
        class="ma-2 white--text"
        @click="
          loader = 'loading3';
          updateAccountDetails();
        "
      >
        Save changes
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Account-details",
  data() {
    return {
      name: "",
      readonly: true,
      loader: null,
      loading3: false,
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters.loggedInUserData;
    },
    userID() {
      return this.$store.getters.user ? this.$store.getters.user : "";
    },
    driverData() {
      return this.$store.getters.presentDriverDataGetter
        ? this.$store.getters.presentDriverDataGetter
        : "";
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 2000);

      this.loader = null;
      setTimeout(() => (this.readonly = true), 2010);
    },
  },
  methods: {
    updateAccountDetails() {
      const payload = {
        lastName: document.getElementById("lastName").value,
        firstName: document.getElementById("firstName").value,
        location: document.getElementById("location").value,
        phone: document.getElementById("phone").value,
        userID: this.userID,
      };
      this.$store.dispatch("updateAccountDetails", payload);
    },
  },
  created() {
    this.$store.dispatch("readUserDataByUserID", this.userID);
    this.$store.dispatch("readDriverDetailsByUserID", this.userID);
  },
  mounted() {
    // eslint-disable-next-line no-console
  },
};
</script>
