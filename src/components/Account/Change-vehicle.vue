<template>
  <v-container>
    <v-col cols="12" sm="6" md="3">
      <v-text-field
        label="Expire date ID"
        outlined
        :readonly="readonlyData"
        :value="driverData.expireDateID"
      ></v-text-field>
      <v-text-field
        label="Expire date License"
        outlined
        :readonly="readonlyData"
        :value="driverData.expireDateITP"
      ></v-text-field>
      <v-text-field
        label="Expire date ITP"
        outlined
        :readonly="readonlyData"
        :value="driverData.expireDateITP"
      ></v-text-field>
      <v-text-field
        label="Expire date RCA"
        outlined
        :readonly="readonlyData"
        :value="driverData.expireDateITP"
      ></v-text-field>
    </v-col>
    <v-btn @click="faCeva()">{{ readonlyData ? "Edit" : "Save" }}</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Change-vehicle",
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
  }
};
</script>
