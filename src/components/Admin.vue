<template>
  <v-container>
    <v-layout text-center wrap>
      // TODO: aici tre sa mai adaug pie chart uri etc</v-layout
    >
    <v-layout text-center wrap>
      <v-col cols="12" sm="6" md="3">
        <div>Requests to be checked</div>
        <v-list>
          <v-list-item
            v-for="allDriversDataGetter  in allDriversDataGetter"
            :key="allDriversDataGetter.checkStatus"
            TODO aici tre sa mai fac ceva cu allDriversDataGetter.checkStatus.pending
            :to="{
              name: 'Driver-requests',
              params: { id: allDriversDataGetter.idUser },
            }"
          >
            {{ allDriversDataGetter.idUser }}
          </v-list-item>
        </v-list>
      </v-col>
    </v-layout>
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
    userData() {
      return this.$store.getters.userDataGetter
        ? this.$store.getters.userDataGetter
        : "";
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("readAllDriversDetails");
  },
  mounted() {},
};
</script>
