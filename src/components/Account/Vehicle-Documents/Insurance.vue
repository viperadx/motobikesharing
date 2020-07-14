<template>
  <v-container>
    <v-flex>
      <v-menu
        ref="menuInsurance"
        v-model="menuInsurance"
        :close-on-content-click="false"
        :return-value.sync="expireInsurance"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="expireInsurance"
            label="Expire date Insurance"
            :placeholder="driverData.expireDateInsurance"
            outlined
            v-on="on"
            id="expireDateInsurance"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireInsurance"
          no-title
          scrollable
          :min="new Date().toISOString().substr(0, 10)"
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="menuInsurance = false"
            >Cancel</v-btn
          >
          <v-btn
            text
            color="primary"
            @click="$refs.menuInsurance.save(expireInsurance)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12>
      <img :src="imageUrlInsurance" height="70" width="200" />
    </v-flex>
    <v-flex xs6>
      <v-btn raised class="primary" @click="onPickImageInsurance"
        >Upload Insurance</v-btn
      >
      <input
        type="file"
        style="display: none"
        ref="fileInputInsurance"
        accept="image/*"
        @change="onPickedImageInsurance"
      />
    </v-flex>

    <v-btn
      :loading="loading3"
      :disabled="emptyFieldValidationRegister"
      color="blue-grey"
      class="ma-2 white--text"
      @click="
        loader = 'loading3';
        updateInsuranceDetails();
      "
    >
      Save changes
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Insurance",
  data() {
    return {
      expireInsurance: null,
      menuInsurance: null,
      loader: null,
      loading3: false,
      imageInsurance: null,
      imageUrlInsurance: null,
    };
  },
  computed: {
    emptyFieldValidationRegister() {
      return !(this.expireInsurance && this.imageInsurance);
    },
    userDetails() {
      return this.$store.getters.loggedInUserData;
    },
    userID() {
      return this.$store.getters.user ? this.$store.getters.user : "";
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
    onPickImageInsurance() {
      this.$refs.fileInputInsurance.click();
    },
    onPickedImageInsurance(event) {
      const filesInsurance = event.target.files;
      let filenameInsurance = filesInsurance[0].name;
      if (filenameInsurance.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReaderInsurance = new FileReader();
      fileReaderInsurance.addEventListener("load", () => {
        this.imageUrlInsurance = fileReaderInsurance.result;
      });
      fileReaderInsurance.readAsDataURL(filesInsurance[0]);
      this.imageInsurance = filesInsurance[0];
    },
    updateInsuranceDetails() {
      const payload = {
        expireDateInsurance: document.getElementById("expireDateInsurance")
          .value,
        imageInsurance: this.imageInsurance,
        userID: this.userID,
      };
      this.$store.dispatch("updateInsuranceDetails", payload);
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
