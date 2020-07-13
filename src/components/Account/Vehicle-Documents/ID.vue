<template>
  <v-container>
    <v-flex>
      <v-menu
        ref="menuID"
        v-model="menuID"
        :close-on-content-click="false"
        :return-value.sync="expireID"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="expireID"
            label="Expire date ID"
            :placeholder="driverData.expireDateID"
            outlined
            v-on="on"
            id="expireDateID"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireID"
          no-title
          scrollable
          :min="new Date().toISOString().substr(0, 10)"
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="menuID = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menuID.save(expireID)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12>
      <img :src="imageUrlID" height="70" width="200" />
    </v-flex>
    <v-flex xs6>
      <v-btn raised class="primary" @click="onPickImageID">Upload ID</v-btn>
      <input
        type="file"
        style="display: none"
        ref="fileInputID"
        accept="image/*"
        @change="onPickedImageID"
      />
    </v-flex>

    <v-btn
      :loading="loading3"
      :disabled="emptyFieldValidationRegister"
      color="blue-grey"
      class="ma-2 white--text"
      @click="
        loader = 'loading3';
        updateIDDetails();
      "
    >
      Save changes
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "ID",
  data() {
    return {
      expireID: null,
      menuID: null,
      loader: null,
      loading3: false,
      imageID: null,
      imageUrlID: null,
    };
  },
  computed: {
    emptyFieldValidationRegister() {
      return !(this.expireID && this.imageID);
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
    onPickImageID() {
      this.$refs.fileInputID.click();
    },
    onPickedImageID(event) {
      const filesID = event.target.files;
      let filenameID = filesID[0].name;
      if (filenameID.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReaderID = new FileReader();
      fileReaderID.addEventListener("load", () => {
        this.imageUrlID = fileReaderID.result;
      });
      fileReaderID.readAsDataURL(filesID[0]);
      this.imageID = filesID[0];
    },
    updateIDDetails() {
      const payload = {
        expireDateID: document.getElementById("expireDateID").value,
        imageID: this.imageID,
        userID: this.userID,
      };
      this.$store.dispatch("updateIDDetails", payload);
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
