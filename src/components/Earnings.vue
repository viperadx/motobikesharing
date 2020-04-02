<template>
  <v-container>
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
      chartDataHeader: ["Year", "Earning"],
      // chartDataRows: [1994, 200],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      }
    };
  },
  components: { GChart },
  computed: {
    currentDriverRidesHistoryGetter() {
      return this.$store.getters.currentDriverRidesHistoryGetter
        ? this.$store.getters.currentDriverRidesHistoryGetter
        : [];
    },
    chartDataRows() {
      return this.currentDriverRidesHistoryGetter;
    },
    chartData() {
      return [this.chartDataHeader, this.chartDataRows];
    }
  },
  methods: {},
  created() {},
  mounted() {
    this.currentDriverRidesHistoryGetter();
  }
};
</script>
