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
import * as firebase from "firebase";
import router from "@/router";
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
      const newTicket = {
        subject: document.getElementById("subject").value,
        query: document.getElementById("query").value,
        status: "pending",
        userID: this.userID,
        userFullName:
          this.userDetails.firstName + " " + this.userDetails.lastName,
        email: this.userDetails.email,
        phone: this.userDetails.phone,
      };
      // this.$store.dispatch("supportRequest", payload);
      let ticketID;
      let filenameSupport = this.fileSupportFinal.name;
      firebase
        .database()
        .ref("Tickets/")
        .push(newTicket)
        .then((res) => {
          ticketID = res.key;
          firebase
            .database()
            .ref("Tickets/" + ticketID)
            .update({ ticketID: res.key });
        })
        .catch((error) => {
          console.log(error);
        });
      //TODO
      let ticketIDStorage = "TODO";
      let fullPathSupportFile = firebase
        .storage()
        .ref(`Tickets/${ticketIDStorage}/${filenameSupport}`)
        .put(this.fileSupportFinal);
      fullPathSupportFile.on(
        "state_changed",
        (snapshot) => {
          let percentageSupportFile =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadValueSupportFile = percentageSupportFile;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValueSupportFile = 100;
          fullPathSupportFile.snapshot.ref
            .getDownloadURL()
            .then((downloadURLSupportFile) => {
              firebase
                .database()
                .ref("/Tickets/" + ticketID)
                .update({
                  supportFileURL: downloadURLSupportFile,
                });
            });
        }
      );
      window.alert("Your request has been submitted.");
      router.push({ path: "/home" });
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
