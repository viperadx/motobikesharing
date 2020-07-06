<template>
  <v-container grid-list-sm class="pa-4">
    <div v-if="ticketDetails">
      <v-layout wrap>
        <v-flex xs12>
          <v-text-field
            label="Ticket ID"
            outlined
            readonly
            :value="ticketDetails.ticketID"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Subject"
            outlined
            readonly
            :value="ticketDetails.subject"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            label="Query"
            outlined
            readonly
            :value="ticketDetails.query"
          ></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="User full name"
            outlined
            readonly
            :value="ticketDetails.userFullName"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="User phone number"
            outlined
            readonly
            :value="ticketDetails.phone"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="User email"
            outlined
            readonly
            :value="ticketDetails.email"
          ></v-text-field>
        </v-flex>
        <div
          xs12
          v-if="this.ticketDetails.filenameSupport !== 'no file attached'"
        >
          <v-flex xs12>
            <v-text-field
              label="File link"
              outlined
              readonly
              :value="ticketDetails.supportFileURL"
            ></v-text-field>
          </v-flex>
        </div>
        <v-flex xs12>
          <v-select
            :items="ticketStatuses"
            v-model="ticketStatusFinal"
            :placeholder="ticketDetails.ticketStatus"
            color="normal"
            label="Verification status"
            id="ticketStatusUpdated"
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn type="submit" @click="updateTicketStatus()">Submit</v-btn>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import * as firebase from "firebase";
export default {
  name: "Support-tickets",
  data() {
    return {
      ticketDetails: null,
      id: this.$route.params.id,
      ticketStatusFinal: null,
      ticketStatuses: ["solved", "pending", "need more info"],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    allTicketsDataGetter() {
      return this.$store.getters.allTicketsDataGetter
        ? this.$store.getters.allTicketsDataGetter
        : "";
    },
  },
  methods: {
    updateTicketStatus() {
      const payload = {
        ticketStatus: this.ticketStatusFinal,
        ticketID: this.id,
      };
      this.$store.dispatch("updateTicketStatus", payload);
    },
  },
  created() {
    this.$store.dispatch("readAllTicketsDetails", this.id);
  },
  mounted() {
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);
    firebase
      .database()
      .ref("/Tickets/" + this.id)
      .on("value", (snap) => {
        this.ticketDetails = snap.val();
      });
  },
};
</script>
