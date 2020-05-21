<template>
  <v-container>
    <v-select
      :items="years"
      v-model="year"
      color="normal"
      label="Select year"
    ></v-select>
    <v-list v-if="currentDriverRidesHistoryGetter.length > 0">
      <v-list-item
        v-for="ride in currentDriverRidesHistoryGetter"
        :key="ride.rideId"
      >
        {{ ride.timeStampYear }}
      </v-list-item>
    </v-list>
    <v-layout text-center wrap>test Earnings normal/test passed</v-layout>
    <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />test
  </v-container>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  name: "Earnings",
  data() {
    return {
      // chartData: [
      //   ["Year", "Sales", "Expenses", "Profit"],
      //   ["2014", 1000, 400, 200],
      //   ["2015", 1170, 460, 250],
      //   ["2016", 660, 1120, 300],
      //   ["2017", 1030, 540, 350]
      // ],
      years: [],
      year: null,
      chartDataHeader: ["Year", "Earning"],
      // chartDataRows: [1994, 200],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      },
    };
  },
  components: { GChart },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userDetails() {
      return this.$store.getters.loggedInUserData;
    },
    // userData() {
    //   return this.$store.getters.userDataGetter
    // ? this.$store.getters.userDataGetter
    // : "";
    // },
    driverData() {
      return this.$store.getters.presentDriverDataGetter;
      // ? this.$store.getters.presentDriverDataGetter
      // : "";
    },
    currentDriverRidesHistoryGetter() {
      return this.$store.getters.currentDriverRidesHistoryGetter;
      // ? this.$store.getters.currentDriverRidesHistoryGetter
      // : [];
    },
    chartDataRows() {
      return this.currentDriverRidesHistoryGetter.timeStampYear;
    },
    chartData() {
      return [this.chartDataHeader, this.chartDataRows];
    },
  },
  methods: {},
  created() {
    // this.$store.dispatch("readAllRidesDetailsByDriverID", this.user);
    this.$store.dispatch(
      "readAllRidesDetailsByDriverID",
      this.$store.getters.user
    );
    this.$store.dispatch("readDriverDetailsByUserID", this.$store.getters.user);
    this.rides.push(this.$store.getters.currentDriverRidesHistoryGetter);
  },
  mounted() {},
};
</script>
