<template>
  <v-container fluid>
    <v-col cols="12" md="6">
      <v-text-field
        v-model="placeholder"
        label="Subject"
        id="subject"
      ></v-text-field>
      <v-textarea
        solo
        name="input-7-4"
        label="Please write your query here"
        id="query"
      ></v-textarea>
      <!-- <div>{{ filenameSupport }}</div> -->
      <v-card-actions>
        <input
          type="file"
          ref="fileInputSelfie"
          @change="onPickedSupportFile"
          id="fileSupport"
        />
        <v-spacer></v-spacer>
        <v-btn type="submit" @click="supportRequest">Submit</v-btn>
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
      filenameSupport: null,
      fileSupportFinal: null,
    };
  },
  computed: {
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
        userID: this.userID,
        userFullName:
          this.userDetails.firstName + " " + this.userDetails.lastName,
        email: this.userDetails.email,
        phone: this.userDetails.phone,
        supportFile: this.fileSupportFinal,
        filenameSupport: this.fileSupportFinal.name,
      });
    },
    onPickedSupportFile(event) {
      const fileSupport = event.target.files;
      let filenameSupport = fileSupport[0].name;
      if (filenameSupport.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      this.fileSupportFinal = fileSupport[0];
    },
  },
  created() {
    this.$store.dispatch("readUserDataByUserID", this.userID);
  },
  mounted() {},
};
</script>
