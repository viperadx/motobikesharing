<template>
  <v-container>
    <v-flex>
      <v-menu
        ref="menuITP"
        v-model="menuITP"
        :close-on-content-click="false"
        :return-value.sync="expireITP"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="expireITP"
            label="Expire date ITP"
            :placeholder="driverData.expireDateITP"
            outlined
            v-on="on"
            id="expireDateITP"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireITP"
          no-title
          scrollable
          :min="new Date().toISOString().substr(0, 10)"
        >
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="menuITP = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menuITP.save(expireITP)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs12>
      <img :src="imageUrlITP" height="70" width="200" />
    </v-flex>
    <v-flex xs6>
      <v-btn raised class="primary" @click="onPickImageITP">Upload ITP</v-btn>
      <input
        type="file"
        style="display: none"
        ref="fileInputITP"
        accept="image/*"
        @change="onPickedImageITP"
      />
    </v-flex>

    <v-btn
      :loading="loading3"
      :disabled="emptyFieldValidationRegister"
      color="blue-grey"
      class="ma-2 white--text"
      @click="
        loader = 'loading3';
        updateITPDetails();
      "
    >
      Save changes
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "ITP",
  data() {
    return {
      expireITP: null,
      menuITP: null,
      loader: null,
      loading3: false,
      imageITP: null,
      imageUrlITP: null,
    };
  },
  computed: {
    emptyFieldValidationRegister() {
      return !(this.expireITP && this.imageITP);
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
    onPickImageITP() {
      this.$refs.fileInputITP.click();
    },
    onPickedImageITP(event) {
      const filesITP = event.target.files;
      let filenameITP = filesITP[0].name;
      if (filenameITP.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReaderITP = new FileReader();
      fileReaderITP.addEventListener("load", () => {
        this.imageUrlITP = fileReaderITP.result;
      });
      fileReaderITP.readAsDataURL(filesITP[0]);
      this.imageITP = filesITP[0];
    },
    updateITPDetails() {
      const payload = {
        expireDateITP: document.getElementById("expireDateITP").value,
        imageITP: this.imageITP,
        userID: this.userID,
      };
      this.$store.dispatch("updateITPDetails", payload);
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
