<template>
  <v-container>
    <v-switch
      v-model="readonly"
      inset
      :label="`Readonly: ${readonly.toString()}`"
    ></v-switch>
    <v-flex>
      <v-menu
        ref="menuID"
        :readonly="readonly"
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
            :readonly="readonly"
            :placeholder="driverData.expireDateID"
            outlined
            v-on="on"
            id="expireDateID"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireID"
          no-title
          :readonly="readonly"
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
    <v-flex>
      <v-menu
        ref="menuITP"
        :readonly="readonly"
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
            :readonly="readonly"
            :placeholder="driverData.expireDateITP"
            outlined
            v-on="on"
            id="expireDateITP"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireITP"
          no-title
          :readonly="readonly"
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
    <v-flex>
      <v-menu
        ref="menuLicense"
        :readonly="readonly"
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
            :readonly="readonly"
            :placeholder="driverData.expireDateLicense"
            outlined
            v-on="on"
            id="expireDateLicense"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireLicense"
          no-title
          :readonly="readonly"
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
    <v-flex>
      <v-menu
        ref="menuRCA"
        :readonly="readonly"
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
            :readonly="readonly"
            :placeholder="driverData.expireDateRCA"
            outlined
            v-on="on"
            id="expireDateRCA"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireRCA"
          no-title
          :readonly="readonly"
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
    <v-flex>
      <v-menu
        ref="menuInsurance"
        :readonly="readonly"
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
            :readonly="readonly"
            :placeholder="driverData.expireDateInsurance"
            outlined
            v-on="on"
            id="expireDateInsurance"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="expireInsurance"
          no-title
          :readonly="readonly"
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
    <!-- <v-text-field
      label="Expire date ID"
      outlined
      :readonly="readonly"
      :value="driverData.expireDateID"
      id="expireDateID"
    ></v-text-field>
    <v-text-field
      label="Expire date License"
      outlined
      :readonly="readonly"
      :value="driverData.expireDateLicense"
      id="expireDateLicense"
    ></v-text-field>
    <v-text-field
      label="Expire date ITP"
      outlined
      :readonly="readonly"
      :value="driverData.expireDateITP"
      id="expireDateITP"
    ></v-text-field>
    <v-text-field
      label="Expire date RCA"
      outlined
      :readonly="readonly"
      :value="driverData.expireDateRCA"
      id="expireDateRCA"
    ></v-text-field>
    <v-text-field
      label="Expire date Insurance"
      outlined
      :readonly="readonly"
      :value="driverData.expireDateInsurance"
      id="expireDateInsurance"
    ></v-text-field> -->
    <div v-if="readonly === false">
      <v-btn
        :loading="loading3"
        :disabled="loading3"
        color="blue-grey"
        class="ma-2 white--text"
        @click="
          loader = 'loading3';
          updateVehicleDocuments();
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
  name: "Vehicle-documents",
  data() {
    return {
      readonly: true,
      loader: null,
      loading3: false,
      expireID: null,
      expireLicense: null,
      expireRCA: null,
      expireITP: null,
      expireInsurance: null,
      menuID: null,
      menuRCA: null,
      menuITP: null,
      menuLicense: null,
      menuInsurance: null,
    };
  },
  computed: {
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
    updateVehicleDocuments() {
      const payload = {
        expireDateID: document.getElementById("expireDateID").value,
        expireDateITP: document.getElementById("expireDateITP").value,
        expireDateRCA: document.getElementById("expireDateRCA").value,
        expireDateLicense: document.getElementById("expireDateLicense").value,
        expireDateInsurance: document.getElementById("expireDateInsurance")
          .value,
        userID: this.userID,
      };
      this.$store.dispatch("updateVehicleDocuments", payload);
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
