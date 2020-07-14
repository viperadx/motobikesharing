<template>
  <v-container>
    <v-flex>
      <v-menu
        ref="menuLicense"
        v-model="menuLicense"
        :close-on-content-click="false"
        :return-value.sync="expireLicense"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="expireLicense"
            label="Expire date License"
            :placeholder="driverData.expireDateLicense"
            outlined
            v-on="on"
            id="expireDateLicense"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireLicense"
          no-title
          scrollable
          :min="new Date().toISOString().substr(0, 10)"
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="menuLicense = false"
            >Cancel</v-btn
          >
          <v-btn
            text
            color="primary"
            @click="$refs.menuLicense.save(expireLicense)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12>
      <img :src="imageUrlLicense" height="70" width="200" />
    </v-flex>
    <v-flex xs6>
      <v-btn raised class="primary" @click="onPickImageLicense"
        >Upload License</v-btn
      >
      <input
        type="file"
        style="display: none"
        ref="fileInputLicense"
        accept="image/*"
        @change="onPickedImageLicense"
      />
    </v-flex>

    <v-btn
      :loading="loading3"
      :disabled="emptyFieldValidationRegister"
      color="blue-grey"
      class="ma-2 white--text"
      @click="
        loader = 'loading3';
        updateLicenseDetails();
      "
    >
      Save changes
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "License",
  data() {
    return {
      expireLicense: null,
      menuLicense: null,
      loader: null,
      loading3: false,
      imageLicense: null,
      imageUrlLicense: null,
    };
  },
  computed: {
    emptyFieldValidationRegister() {
      return !(this.expireLicense && this.imageLicense);
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
    onPickImageLicense() {
      this.$refs.fileInputLicense.click();
    },
    onPickedImageLicense(event) {
      const filesLicense = event.target.files;
      let filenameLicense = filesLicense[0].name;
      if (filenameLicense.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReaderLicense = new FileReader();
      fileReaderLicense.addEventListener("load", () => {
        this.imageUrlLicense = fileReaderLicense.result;
      });
      fileReaderLicense.readAsDataURL(filesLicense[0]);
      this.imageLicense = filesLicense[0];
    },
    updateLicenseDetails() {
      const payload = {
        expireDateLicense: document.getElementById("expireDateLicense").value,
        imageLicense: this.imageLicense,
        userID: this.userID,
      };
      this.$store.dispatch("updateLicenseDetails", payload);
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
