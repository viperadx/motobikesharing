<template>
  <v-container>
    <v-layout text-center wrap>test Become-driver</v-layout>
    <v-col cols="12" sm="6" md="3">
      <div>Requests to be checked</div>
      <v-list>
        <v-list-item
          v-for="checkStatus in allDriversDetails"
          :key="checkStatus"
          :to="{
            name: 'Cursa',
            params: {id: ride.rideId}
          }">
          {{ allDriversDetails.expireDateID }}
          //TODO: de vazut de ce eroarea in consola si cum continui
        </v-list-item>
      </v-list>
    </v-col>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "Driver-requests",
  data() {
    return {};
  },
  computed: {
    user() {return this.$store.getters.user;},
    allDriversDataGetter() 
      {return this.$store.getters.allDriversDataGetter ? this.$store.getters.allDriversDataGetter: "";},
    },
  methods: {},
  created() {
    this.$store.dispatch("readAllDriversDetails");
  },
  mounted() {}
};
</script>
