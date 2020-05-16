<template>
  <v-container>
    <v-switch
      v-model="readonly"
      inset
      :label="`Readonly: ${readonly.toString()}`"
    ></v-switch>
    <v-text-field
      label="Credit card"
      outlined
      :readonly="readonly"
      :value="userDetails.creditCard"
      id="creditCard"
    ></v-text-field>
    <div v-if="readonly === false">
      <v-btn
        :loading="loading3"
        :disabled="loading3"
        color="blue-grey"
        class="ma-2 white--text"
        @click="
          loader = 'loading3';
          updateBankDetails();
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
  name: "Bank-details",
  data() {
    return {
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
    updateBankDetails() {
      const payload = {
        creditCard: document.getElementById("creditCard").value,
        userID: this.userID,
      };
      this.$store.dispatch("updateBankDetails", payload);
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
