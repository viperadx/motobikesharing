<template>
  <v-container fluid>
    <v-col cols="12" md="6">
      <v-layout text-center wrap
        >Please note that only the file attachment is optional!</v-layout
      >
      <v-select
        :items="categories"
        v-model="category"
        color="normal"
        label="Category"
      ></v-select>
      <v-text-field
        v-model="placeholder"
        label="Subject"
        id="subject"
      ></v-text-field>
      <v-textarea
        v-model="querytest"
        solo
        name="input-7-4"
        label="Please write your query here"
        id="query"
      ></v-textarea>
      <v-card-actions>
        <input type="file" @change="onPickedSupportFile" id="fileSupport" />
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          :disabled="emptyFieldValidationRegister"
          @click="supportRequest"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-col>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "Chat",
  data() {
    return {
      placeholder: null,
      filenameSupport: "no file attached",
      subject: null,
      querytest: null,
      fileSupportFinal: null,
      category: null,
      categories: ["Application", "Misconduct", "Rates", "Feedback", "Other"],
    };
  },
  computed: {
    emptyFieldValidationRegister() {
      return !(this.category && this.placeholder && this.querytest);
    },
    userDetails() {
      return this.$store.getters.loggedInUserData;
    },
    userID() {
      return this.$store.getters.user ? this.$store.getters.user : "";
    },
  },
  methods: {
    supportRequest() {
      this.$store.dispatch("supportRequest", {
        subject: document.getElementById("subject").value,
        query: document.getElementById("query").value,
        ticketStatus: "pending",
        category: this.category,
        userID: this.userID,
        userFullName:
          this.userDetails.firstName + " " + this.userDetails.lastName,
        email: this.userDetails.email,
        phone: this.userDetails.phone,
        supportFile: this.fileSupportFinal,
        filenameSupport: this.filenameSupport,
      });
    },
    onPickedSupportFile(event) {
      const fileSupport = event.target.files;
      let filenameSupport = fileSupport[0].name;
      if (filenameSupport.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      this.fileSupportFinal = fileSupport[0];
      this.filenameSupport = fileSupport[0].name;
    },
  },
  created() {
    this.$store.dispatch("readUserDataByUserID", this.userID);
  },
  mounted() {},
};
</script>
