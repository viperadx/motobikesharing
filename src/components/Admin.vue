<template>
  <v-container grid-list-sm class="pa-4">
    <!-- <v-layout text-center wrap>
      // TODO: tre sa separ cumva astea in 2 coloane (driver requests & support tickets)
    > -->
    <v-layout text-center wrap>
      <router-link to="/reports">Reports</router-link>
    </v-layout>
    <v-flex xs6 align-center justify-space-between>
      <v-layout text-center wrap>
        <v-col cols="12" sm="6" md="3">
          <div>Driver requests to be checked</div>
          <v-list>
            <v-list-item
              v-for="driverRequestsFilterPending in driverRequestsFilterPending"
              :key="driverRequestsFilterPending.idUser"
              :to="{
                name: 'Driver-requests',
                params: { id: driverRequestsFilterPending.idUser },
              }"
            >
              {{ driverRequestsFilterPending.createdDate }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-layout>
    </v-flex>
    <v-flex xs6 align-center justify-space-between>
      <v-layout text-center wrap>
        <v-col cols="12" sm="6" md="3">
          <div>Support tickets to be checked</div>
          <v-list>
            <v-list-item
              v-for="supportTicketsFilterPending in supportTicketsFilterPending"
              :key="supportTicketsFilterPending.ticketID"
              :to="{
                name: 'Support-tickets',
                params: { id: supportTicketsFilterPending.ticketID },
              }"
            >
              {{ supportTicketsFilterPending.createdDate }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {};
  },
  computed: {
    userDetails() {
      return this.$store.getters.loggedInUserData;
    },
    user() {
      return this.$store.getters.user;
    },
    allDriversDataGetter() {
      return this.$store.getters.allDriversDataGetter
        ? this.$store.getters.allDriversDataGetter
        : [];
    },
    allTicketsDataGetter() {
      return this.$store.getters.allTicketsDataGetter
        ? this.$store.getters.allTicketsDataGetter
        : [];
    },
    driverRequestsFilterPending() {
      return this.allDriversDataGetter.filter((allDriversDataGetter) => {
        return (
          allDriversDataGetter.checkStatus === "pending" ||
          allDriversDataGetter.checkStatus === "need more info"
        );
      });
    },
    supportTicketsFilterPending() {
      return this.allTicketsDataGetter.filter((allTicketsDataGetter) => {
        return (
          allTicketsDataGetter.ticketStatus === "pending" ||
          allTicketsDataGetter.ticketStatus === "need more info"
        );
      });
    },
    userData() {
      return this.$store.getters.userDataGetter
        ? this.$store.getters.userDataGetter
        : "";
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("readAllDriversDetails");
    this.$store.dispatch("readAllTicketsDetails");
  },
  mounted() {},
};
</script>
