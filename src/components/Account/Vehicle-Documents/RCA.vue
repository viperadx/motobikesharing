<template>
  <v-container>
    <v-flex>
      <v-menu
        ref="menuRCA"
        v-model="menuRCA"
        :close-on-content-click="false"
        :return-value.sync="expireRCA"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="expireRCA"
            label="Expire date RCA"
            :placeholder="driverData.expireDateRCA"
            outlined
            v-on="on"
            id="expireDateRCA"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireRCA"
          no-title
          scrollable
          :min="new Date().toISOString().substr(0, 10)"
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="menuRCA = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menuRCA.save(expireRCA)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12>
      <img :src="imageUrlRCA" height="70" width="200" />
    </v-flex>
    <v-flex xs6>
      <v-btn raised class="primary" @click="onPickImageRCA">Upload RCA</v-btn>
      <input
        type="file"
        style="display: none"
        ref="fileInputRCA"
        accept="image/*"
        @change="onPickedImageRCA"
      />
    </v-flex>

    <v-btn
      :loading="loading3"
      :disabled="emptyFieldValidationRegister"
      color="blue-grey"
      class="ma-2 white--text"
      @click="
        loader = 'loading3';
        updateRCADetails();
      "
    >
      Save changes
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "RCA",
  data() {
    return {
      expireRCA: null,
      menuRCA: null,
      loader: null,
      loading3: false,
      imageRCA: null,
      imageUrlRCA: null,
    };
  },
  computed: {
    emptyFieldValidationRegister() {
      return !(this.expireRCA && this.imageRCA);
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
    onPickImageRCA() {
      this.$refs.fileInputRCA.click();
    },
    onPickedImageRCA(event) {
      const filesRCA = event.target.files;
      let filenameRCA = filesRCA[0].name;
      if (filenameRCA.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReaderRCA = new FileReader();
      fileReaderRCA.addEventListener("load", () => {
        this.imageUrlRCA = fileReaderRCA.result;
      });
      fileReaderRCA.readAsDataURL(filesRCA[0]);
      this.imageRCA = filesRCA[0];
    },
    updateRCADetails() {
      const payload = {
        expireDateRCA: document.getElementById("expireDateRCA").value,
        imageRCA: this.imageRCA,
        userID: this.userID,
      };
      this.$store.dispatch("updateRCADetails", payload);
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
