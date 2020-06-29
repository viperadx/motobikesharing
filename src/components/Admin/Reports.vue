<template>
  <v-layout column>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>All users</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersusersdetails"
                :options.sync="pagination"
                :items="items"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.userKeyuserdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.lastNameuserdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.firstNameuserdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.birthDateuserdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.emailuserdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.locationuserdetails }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top active clients </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in topusersHistory"
                    :key="index"
                  >
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top active drivers </v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in topdriversHistory"
                    :key="index"
                  >
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top searched addresses</v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in topDestination"
                    :key="index"
                  >
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card>
            <v-card-title>Drivers details</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersdriversdetails"
                :options.sync="pagination"
                :items="itemsdrivers"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.driverKeydriverdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.checkStatusdriverdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.expireDateIDdriverdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.expireDateITPdriverdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.expireDateInsurancedriverdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.expireDateLicensedriverdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.expireDateRCAdriverdetails }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top residency users</v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in usersLocations"
                    :key="index"
                  >
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top residency clients</v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in clientsLocations"
                    :key="index"
                  >
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top residency drivers</v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in driversLocations"
                    :key="index"
                  >
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card>
            <v-card-title>Tickets details</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersticketsdetails"
                :options.sync="pagination"
                :items="itemstickets"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.ticketKeyticketdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.userFullNameticketdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.ticketStatusticketdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.userIDticketdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.emailticketdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.subjectticketdetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.queryticketdetails }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top age users</v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item v-for="(item, index) in userAges" :key="index">
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top age clients</v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item v-for="(item, index) in clientAges" :key="index">
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4>
          <v-card>
            <v-card-title>Top age drivers</v-card-title>
            <v-card-text>
              <v-card>
                <v-list>
                  <v-list-item v-for="(item, index) in driverAges" :key="index">
                    <v-list-item-action>
                      <v-icon v-if="index === 0">mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card>
            <v-card-title>Rides details</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersridesdetails"
                :items="itemsrides"
                :options.sync="pagination"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.rideKeyridedetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.statusridedetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.clientIdridedetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.idDriverridedetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.priceridedetails }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.timeStampFullridedetails }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card>
            <v-card-title>All searched destinations </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersuniquedestination"
                :options.sync="pagination"
                :items="alluniquedestinations"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.userFinishPointallUsersDestinations }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>All clients spendings </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersallclientsspendings"
                :options.sync="pagination"
                :items="itemsallclientsspendings"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.keyUserallClientsSpendings }}
                  </td>
                  <td class="text-xs-left">
                    {{
                      numeral(props.item.priceallClientsSpendings).format(
                        "0.00"
                      )
                    }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>All drivers earnings </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersalldriversearnings"
                :options.sync="pagination"
                :items="itemsalldriversearnings"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.keyUserallDriversEarnings }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.earningallDriversEarnings }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>Clients no. of rides </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersallclientsnoofrides"
                :options.sync="pagination"
                :items="itemsallclientsnoofrides"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.keyUserallClientsNoRides }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.ridesallClientsNoRides }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>Drivers no. of rides </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersalldriversnoofrides"
                :options.sync="pagination"
                :items="itemsalldriversnoofrides"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.keyUserallDriversNoRides }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.ridesallDriversNoRides }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>Clients average rating </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersallclientsavgrating"
                :options.sync="pagination"
                :items="itemsallclientsavgrating"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.keyUserallClientsAvgRating }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.ratingForClientallClientsAvgRating }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>Drivers average rating </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headersalldriversavgrating"
                :options.sync="pagination"
                :items="itemsalldriversavgrating"
                item-key="name"
                class="elevation-1"
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    {{ props.item.keyUserallDriversAvgRating }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.ratingForDriverallDriversAvgRating }}
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Users type
            </v-card-title>
            <v-card-text>
              <div id="piechartUsersType"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Tickets status
            </v-card-title>
            <v-card-text>
              <div id="piechartTicketsStatus"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Rides status
            </v-card-title>
            <v-card-text>
              <div id="piechartRidesStatus"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Cancelled rides status
            </v-card-title>
            <v-card-text>
              <div id="piechartCancelledRides"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Users gender
            </v-card-title>
            <v-card-text>
              <div id="piechartUsersGender"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Clients gender
            </v-card-title>
            <v-card-text>
              <div id="piechartClientsGender"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Drivers gender
            </v-card-title>
            <v-card-text>
              <div id="piechartDriversGender"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              Drivers verification status
            </v-card-title>
            <v-card-text>
              <div id="piechartDriversCheckStatus"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card>
            <v-card-title>
              Users frequency age
            </v-card-title>
            <v-card-text>
              <div id="barchartAgeFrequency"></div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
//TODO optionale: sa adaug un topic la ticket submission si sa fac un top/grafic cu topicurile tichetelor
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import * as firebase from "firebase";
import moment from "moment";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
Vue.use(Chartkick.use(Chart));

Vue.filter("formatNumber", function(value) {
  return this.numeral(value).format("0.00"); // displaying other groupings/separators is possible, look at the docs
});

export default {
  name: "Reports",
  data() {
    return {
      topusersType: [],
      driverCheckStatusVerified: 0,
      driverCheckStatusNotVerified: 0,
      userMale: 0,
      userFemale: 0,
      userOther: 0,
      userUnspecified: 0,
      clientMale: 0,
      clientFemale: 0,
      clientOther: 0,
      clientUnspecified: 0,
      driverMale: 0,
      driverFemale: 0,
      driverOther: 0,
      driverUnspecified: 0,
      rideCancelledByClient: 0,
      clientDidntShow: 0,
      driverDidntShow: 0,
      ridesFinished: 0,
      ridesUnfinished: 0,
      usersClients: 0,
      usersDrivers: 0,
      ticketsOpened: 0,
      ticketsClosed: 0,
      usersLocations: [],
      clientsLocations: [],
      driversLocations: [],
      topusersHistory: [],
      topdriversHistory: [],
      topDestination: [],
      allDestinations: [],
      alluniquedestinations: [],
      userAges: [],
      clientAges: [],
      driverAges: [],
      allUsersAges: [],
      allUsersAgesTest: [],
      allClientsAges: [],
      allDriversAges: [],
      items: [],
      itemsdrivers: [],
      itemstickets: [],
      itemsrides: [],
      itemsallclientsspendings: [],
      itemsalldriversearnings: [],
      itemsallclientsnoofrides: [],
      itemsalldriversnoofrides: [],
      itemsallclientsavgrating: [],
      itemsalldriversavgrating: [],
      pagination: {
        itemsPerPage: 5,
      },
      headersusersdetails: [
        { text: "User Key", align: "left", value: "userKeyuserdetails" },
        { text: "Last Name", value: "lastNameuserdetails" },
        { text: "First Name", value: "firstNameuserdetails" },
        { text: "Birth Date", value: "birthDateuserdetails" },
        { text: "Email", value: "emailuserdetails" },
        { text: "Residency", value: "locationuserdetails" },
      ],
      headersdriversdetails: [
        { text: "Driver Key", align: "left", value: "driverKeydriverdetails" },
        { text: "Verification Status", value: "checkStatusdriverdetails" },
        { text: "Expiration Date ID", value: "expireDateIDdriverdetails" },
        { text: "Expiration Date ITP", value: "expireDateITPdriverdetails" },
        {
          text: "Expiration Date Insurance",
          value: "expireDateInsurancedriverdetails",
        },
        {
          text: "Expiration Date License",
          value: "expireDateLicensedriverdetails",
        },
        { text: "Expiration Date RCA", value: "expireDateRCAdriverdetails" },
      ],
      headersticketsdetails: [
        { text: "Ticket Key", align: "left", value: "ticketKeyticketdetails" },
        { text: "User ID", value: "userIDticketdetails" },
        { text: "Status", value: "ticketStatusticketdetails" },
        { text: "User Full Name", value: "userFullNameticketdetails" },
        { text: "User Email", value: "emailticketdetails" },
        { text: "Subject", value: "subjectticketdetails" },
        { text: "Query", value: "queryticketdetails" },
      ],
      headersridesdetails: [
        { text: "Ride Key", align: "left", value: "rideKeyridedetails" },
        { text: "Status", value: "statusridedetails" },
        { text: "Client ID", value: "clientIdridedetails" },
        { text: "Driver ID", value: "idDriverridedetails" },
        { text: "Price", value: "priceridedetails" },
        { text: "Time Stamp", value: "timeStampFullridedetails" },
      ],
      headersuniquedestination: [
        { text: "Address", value: "userFinishPointallUsersDestinations" },
      ],
      headersallclientsspendings: [
        { text: "User ID", value: "keyUserallClientsSpendings" },
        { text: "Value", value: "priceallClientsSpendings" },
      ],
      headersalldriversearnings: [
        { text: "User ID", value: "keyUserallDriversEarnings" },
        { text: "Value", value: "earningallDriversEarnings" },
      ],
      headersallclientsnoofrides: [
        { text: "Client ID", value: "keyUserallClientsNoRides" },
        { text: "Value", value: "ridesallClientsNoRides" },
      ],
      headersalldriversnoofrides: [
        { text: "Driver ID", value: "keyUserallDriversNoRides" },
        { text: "Value", value: "ridesallDriversNoRides" },
      ],
      headersallclientsavgrating: [
        { text: "User ID", value: "keyUserallClientsAvgRating" },
        { text: "Value", value: "ratingForClientallClientsAvgRating" },
      ],
      headersalldriversavgrating: [
        { text: "User ID", value: "keyUserallDriversAvgRating" },
        { text: "Value", value: "ratingForDriverallDriversAvgRating" },
      ],
    };
  },
  mounted() {
    this.piechartUsersType();
    this.allClientsAvgRating();
    this.allDriversAvgRating();
    this.allClientsNoRides();
    this.allDriversNoRides();
    this.allClientsSpendings();
    this.allDriversEarnings();
    this.topUsersLocations();
    this.topClientsLocations();
    this.topDriversLocations();
    this.userdetails();
    this.driverdetails();
    this.ticketdetails();
    this.ridedetails();
    this.topUsersbyRides();
    this.allUsersDestinations();
    this.topDriversbyRides();
    this.topDestinations();
    this.usersAges();
    this.clientsAges();
    this.driversAges();
    this.topusersbyType();
    this.piechartTicketsStatus();
    this.ticketsStatus();
    this.ridesStatus();
    this.piechartRidesStatus();
    this.cancelledRides();
    this.piechartCancelledRides();
    this.usersGender();
    this.clientsGender();
    this.driversGender();
    this.driversCheckStatus();
    this.piechartUsersGender();
    this.piechartClientsGender();
    this.piechartDriversGender();
    this.piechartDriversCheckStatus();
    this.barchartAgeFrequency();
  },
  computed: {},
  methods: {
    userdetails() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            const myObj = snap.val();
            let alluserdetails = [];
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const userdetails = {};
              userdetails.birthDateuserdetails = myObj[key].birthDate;
              userdetails.locationuserdetails = myObj[key].location;
              userdetails.firstNameuserdetails = myObj[key].firstName;
              userdetails.lastNameuserdetails = myObj[key].lastName;
              userdetails.emailuserdetails = myObj[key].email;
              userdetails.userKeyuserdetails = key;
              alluserdetails.push(userdetails);
            });
            this.items = alluserdetails;
          },
          function(error) {
            console.log("userdetails Error: " + error.message);
          }
        );
    },
    topUsersbyRides() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory")
        .on(
          "value",
          (snap) => {
            const myObj = snap.val();
            const topSearch = [];
            const numbers = [];
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              numbers.push(Object.keys(myObj[key]).length);
            });
            this.usersWithHistory = keysUsers.length;
            for (let i = 0; i < 3; i++) {
              if (numbers.length == 0) console.log("empty topUsersbyRides");
              if (Math.max(...numbers) !== 0) {
                let a = numbers.indexOf(Math.max(...numbers));
                topSearch.push(keysUsers[a]);
                numbers[a] = 0;
              }
            }
            this.topusersHistory = topSearch;
          },
          (error) => {
            console.log("topUsersbyRides Error: " + error.message);
          }
        );
    },
    topDriversbyRides() {
      return firebase
        .database()
        .ref("DriversRidesHistory")
        .on(
          "value",
          (snap) => {
            const myObj = snap.val();
            const topSearch = [];
            const numbers = [];
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              numbers.push(Object.keys(myObj[key]).length);
            });
            this.driversWithHistory = keysUsers.length;
            for (let i = 0; i < 3; i++) {
              if (numbers.length == 0) console.log("empty topDriversbyRides");
              if (Math.max(...numbers) !== 0) {
                let a = numbers.indexOf(Math.max(...numbers));
                topSearch.push(keysUsers[a]);
                numbers[a] = 0;
              }
            }
            this.topdriversHistory = topSearch;
          },
          (error) => {
            console.log("topDriversbyRides Error: " + error.message);
          }
        );
    },
    topDestinations() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory")
        .on(
          "value",
          (snap) => {
            let allDest = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                allDest.push(myObj[key][key1].userFinishPoint);
              });
            });
            allDest.sort();
            for (let j = 0; j < 3; j++) {
              if (allDest.length == 0) console.log("empty topDestinations");
              let modeMap = {};
              let maxEl = allDest[0],
                maxCount = 1;
              for (let i = 0; i < allDest.length; i++) {
                let el = allDest[i];
                if (modeMap[el] == null) modeMap[el] = 1;
                else modeMap[el]++;
                if (modeMap[el] > maxCount) {
                  maxEl = el;
                  maxCount = modeMap[el];
                }
              }
              for (let i = 0; i < allDest.length; i++) {
                if (maxEl.localeCompare(allDest[i]) == 0) {
                  allDest.splice(i, maxCount);
                }
              }
              this.topDestination.push(maxEl);
            }
          },
          (error) => {
            console.log("topDestinations Error: " + error.message);
          }
        );
    },
    driverdetails() {
      return firebase
        .database()
        .ref("Drivers")
        .on(
          "value",
          (snap) => {
            const myObj = snap.val();
            let alldriverdetails = [];
            const keysDrivers = Object.keys(snap.val());
            keysDrivers.forEach((key) => {
              const driverdetails = {};
              driverdetails.checkStatusdriverdetails = myObj[key].checkStatus;
              driverdetails.expireDateIDdriverdetails = myObj[key].expireDateID;
              driverdetails.expireDateITPdriverdetails =
                myObj[key].expireDateITP;
              driverdetails.expireDateInsurancedriverdetails =
                myObj[key].expireDateInsurance;
              driverdetails.expireDateLicensedriverdetails =
                myObj[key].expireDateLicense;
              driverdetails.expireDateRCAdriverdetails =
                myObj[key].expireDateRCA;
              driverdetails.driverKeydriverdetails = key;
              alldriverdetails.push(driverdetails);
            });
            this.itemsdrivers = alldriverdetails;
          },
          function(error) {
            console.log("driverdetails Error: " + error.message);
          }
        );
    },
    ticketdetails() {
      return firebase
        .database()
        .ref("Tickets")
        .on(
          "value",
          (snap) => {
            const myObj = snap.val();
            let allticketdetails = [];
            const keysTickets = Object.keys(snap.val());
            keysTickets.forEach((key) => {
              const ticketdetails = {};
              ticketdetails.userFullNameticketdetails = myObj[key].userFullName;
              ticketdetails.userIDticketdetails = myObj[key].userID;
              ticketdetails.emailticketdetails = myObj[key].email;
              ticketdetails.subjectticketdetails = myObj[key].subject;
              ticketdetails.queryticketdetails = myObj[key].query;
              ticketdetails.ticketStatusticketdetails = myObj[key].ticketStatus;
              ticketdetails.ticketKeyticketdetails = key;
              allticketdetails.push(ticketdetails);
            });
            this.itemstickets = allticketdetails;
          },
          function(error) {
            console.log("ticketdetails Error: " + error.message);
          }
        );
    },
    ridedetails() {
      return firebase
        .database()
        .ref("Rides")
        .on(
          "value",
          (snap) => {
            const myObj = snap.val();
            let allridedetails = [];
            const keysRides = Object.keys(snap.val());
            keysRides.forEach((key) => {
              const ridedetails = {};
              ridedetails.statusridedetails = myObj[key].status;
              ridedetails.clientIdridedetails = myObj[key].clientId;
              ridedetails.idDriverridedetails = myObj[key].idDriver;
              ridedetails.priceridedetails = myObj[key].price;
              ridedetails.timeStampFullridedetails = myObj[key].timeStampFull;
              ridedetails.rideKeyridedetails = key;
              allridedetails.push(ridedetails);
            });
            this.itemsrides = allridedetails;
          },
          function(error) {
            console.log("ridedetails Error: " + error.message);
          }
        );
    },
    topUsersLocations() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            let allLocations = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              allLocations.push(myObj[key].location);
            });
            allLocations.sort();
            for (let j = 0; j < 3; j++) {
              if (allLocations.length == 0)
                console.log("empty topUsersLocations");
              let modeMap = {};
              let maxEl = allLocations[0],
                maxCount = 1;
              for (let i = 0; i < allLocations.length; i++) {
                let el = allLocations[i];
                if (modeMap[el] == null) modeMap[el] = 1;
                else modeMap[el]++;
                if (modeMap[el] > maxCount) {
                  maxEl = el;
                  maxCount = modeMap[el];
                }
              }
              for (let i = 0; i < allLocations.length; i++) {
                if (maxEl.localeCompare(allLocations[i]) == 0) {
                  allLocations.splice(i, maxCount);
                }
              }
              this.usersLocations.push(maxEl);
            }
          },
          (error) => {
            console.log("topUsersLocations Error: " + error.message);
          }
        );
    },
    topClientsLocations() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            let allLocations = [];
            const myObj = snap.val();
            const keysClients = Object.keys(snap.val());
            keysClients.forEach((key) => {
              if (myObj[key].idDriver == null) {
                allLocations.push(myObj[key].location);
              }
            });
            allLocations.sort();
            for (let j = 0; j < 3; j++) {
              if (allLocations.length == 0)
                console.log("empty topClientsLocations");
              let modeMap = {};
              let maxEl = allLocations[0],
                maxCount = 1;
              for (let i = 0; i < allLocations.length; i++) {
                let el = allLocations[i];
                if (modeMap[el] == null) modeMap[el] = 1;
                else modeMap[el]++;
                if (modeMap[el] > maxCount) {
                  maxEl = el;
                  maxCount = modeMap[el];
                }
              }
              for (let i = 0; i < allLocations.length; i++) {
                if (maxEl.localeCompare(allLocations[i]) == 0) {
                  allLocations.splice(i, maxCount);
                }
              }
              this.clientsLocations.push(maxEl);
            }
          },
          (error) => {
            console.log("topClientsLocations Error: " + error.message);
          }
        );
    },
    topDriversLocations() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            let allLocations = [];
            const myObj = snap.val();
            const keysDrivers = Object.keys(snap.val());
            keysDrivers.forEach((key) => {
              if (myObj[key].idDriver != null) {
                allLocations.push(myObj[key].location);
              }
            });
            allLocations.sort();
            for (let j = 0; j < 3; j++) {
              if (allLocations.length == 0)
                console.log("empty topDriversLocations");
              let modeMap = {};
              let maxEl = allLocations[0],
                maxCount = 1;
              for (let i = 0; i < allLocations.length; i++) {
                let el = allLocations[i];
                if (modeMap[el] == null) modeMap[el] = 1;
                else modeMap[el]++;
                if (modeMap[el] > maxCount) {
                  maxEl = el;
                  maxCount = modeMap[el];
                }
              }
              for (let i = 0; i < allLocations.length; i++) {
                if (maxEl.localeCompare(allLocations[i]) == 0) {
                  allLocations.splice(i, maxCount);
                }
              }
              this.driversLocations.push(maxEl);
            }
          },
          (error) => {
            console.log("topDriversLocations Error: " + error.message);
          }
        );
    },
    allUsersDestinations() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory")
        .on(
          "value",
          (snap) => {
            let allDest = [];
            let uniqueArray2 = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                // const allDestinationsArtificiu = {};
                // allDestinationsArtificiu.userFinishPoint =
                //   myObj[key][key1].userFinishPoint;

                // allDest.push(allDestinationsArtificiu);
                allDest.push(myObj[key][key1].userFinishPoint);
              });
            });
            this.allDestinations = allDest;
            let uniqueArray = allDest.filter(function(item, pos) {
              return allDest.indexOf(item) == pos;
            });
            uniqueArray.forEach((item) => {
              const uniqueArrayArtificiu = {};
              uniqueArrayArtificiu.userFinishPointallUsersDestinations = item;
              uniqueArray2.push(uniqueArrayArtificiu);
            });
            this.alluniquedestinations = uniqueArray2;
          },
          (error) => {
            console.log("allUsersDestinations Error: " + error.message);
          }
        );
    },
    allClientsSpendings() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory")
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allSpend = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                const allSpendings = {};
                allSpendings.priceallClientsSpendings = myObj[key][key1].price;
                allSpendings.keyRideallClientsSpendings = key1;
                allSpendings.keyUserallClientsSpendings = key;
                allSpend.push(allSpendings);
              });
            });
            allSpend.forEach((item) => {
              let sums = sumsArray[item.keyUserallClientsSpendings];
              if (sums) {
                (sums.priceallClientsSpendings +=
                  item.priceallClientsSpendings).toFixed(2);
              } else {
                sumsArray[item.keyUserallClientsSpendings] = {
                  keyUserallClientsSpendings: item.keyUserallClientsSpendings,
                  priceallClientsSpendings: item.priceallClientsSpendings,
                };
              }
            });
            this.itemsallclientsspendings = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allClientsSpendings Error: " + error.message);
          }
        );
    },
    allDriversEarnings() {
      return firebase
        .database()
        .ref("DriversRidesHistory")
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allEarned = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                // allSpendings.push(myObj[key][key1].price);
                const allEarnings = {};
                allEarnings.earningallDriversEarnings =
                  myObj[key][key1].earning;
                allEarnings.keyRideallDriversEarnings = key1;
                allEarnings.keyUserallDriversEarnings = key;
                allEarned.push(allEarnings);
              });
            });
            allEarned.forEach((item) => {
              let sums = sumsArray[item.keyUserallDriversEarnings];
              if (sums) {
                sums.earningallDriversEarnings +=
                  item.earningallDriversEarnings;
              } else {
                sumsArray[item.keyUserallDriversEarnings] = {
                  keyUserallDriversEarnings: item.keyUserallDriversEarnings,
                  earningallDriversEarnings: item.earningallDriversEarnings,
                };
              }
            });
            this.itemsalldriversearnings = Object.keys(sumsArray).map((key) => {
              return sumsArray[key];
            });
          },
          (error) => {
            console.log("allDriversEarnings Error: " + error.message);
          }
        );
    },
    allClientsNoRides() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory")
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allCRides = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                const allClientsRides = {};
                allClientsRides.keyRideallClientsNoRides = key1;
                allClientsRides.keyUserallClientsNoRides = key;
                allCRides.push(allClientsRides);
              });
            });
            allCRides.forEach((item) => {
              let sums = sumsArray[item.keyUserallClientsNoRides];
              if (sums) {
                sums.ridesallClientsNoRides += 1;
              } else {
                sumsArray[item.keyUserallClientsNoRides] = {
                  keyUserallClientsNoRides: item.keyUserallClientsNoRides,
                  ridesallClientsNoRides: 1,
                };
              }
            });
            this.itemsallclientsnoofrides = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allClientsNoRides Error: " + error.message);
          }
        );
    },
    allDriversNoRides() {
      return firebase
        .database()
        .ref("DriversRidesHistory")
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allDRides = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                const allDriversRides = {};
                allDriversRides.keyRideallDriversNoRides = key1;
                allDriversRides.keyUserallDriversNoRides = key;
                allDRides.push(allDriversRides);
              });
            });
            allDRides.forEach((item) => {
              let sums = sumsArray[item.keyUserallDriversNoRides];
              if (sums) {
                sums.ridesallDriversNoRides += 1;
              } else {
                sumsArray[item.keyUserallDriversNoRides] = {
                  keyUserallDriversNoRides: item.keyUserallDriversNoRides,
                  ridesallDriversNoRides: 1,
                };
              }
            });
            this.itemsalldriversnoofrides = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allDriversNoRides Error: " + error.message);
          }
        );
    },
    allClientsAvgRating() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory")
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allCAvgRating = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                const allClientsAvgRating = {};
                allClientsAvgRating.ratingForClientallClientsAvgRating =
                  myObj[key][key1].ratingForClient;
                allClientsAvgRating.keyUserallClientsAvgRating = key;
                allCAvgRating.push(allClientsAvgRating);
              });
            });
            allCAvgRating.forEach((item) => {
              let sums = sumsArray[item.keyUserallClientsAvgRating];
              if (sums) {
                (sums.ratingForClientNominatorallClientsAvgRating +=
                  item.ratingForClientallClientsAvgRating),
                  (sums.ratingForClientDenominatorallClientsAvgRating += 1),
                  (sums.ratingForClientallClientsAvgRating =
                    sums.ratingForClientNominatorallClientsAvgRating /
                    sums.ratingForClientDenominatorallClientsAvgRating);
              } else {
                sumsArray[item.keyUserallClientsAvgRating] = {
                  keyUserallClientsAvgRating: item.keyUserallClientsAvgRating,
                  ratingForClientNominatorallClientsAvgRating:
                    item.ratingForClientallClientsAvgRating,
                  ratingForClientDenominatorallClientsAvgRating: 1,
                  ratingForClientallClientsAvgRating:
                    item.ratingForClientallClientsAvgRating,
                };
              }
            });
            this.itemsallclientsavgrating = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allClientsAvgRating Error: " + error.message);
          }
        );
    },
    allDriversAvgRating() {
      return firebase
        .database()
        .ref("DriversRidesHistory")
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allDAvgRating = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                const allDriversAvgRating = {};
                allDriversAvgRating.ratingForDriverallDriversAvgRating =
                  myObj[key][key1].ratingForDriver;
                allDriversAvgRating.keyUserallDriversAvgRating = key;
                allDAvgRating.push(allDriversAvgRating);
              });
            });
            allDAvgRating.forEach((item) => {
              let sums = sumsArray[item.keyUserallDriversAvgRating];
              if (sums) {
                (sums.ratingForDriverNominatorallDriversAvgRating +=
                  item.ratingForDriverallDriversAvgRating),
                  (sums.ratingForDriverDenominatorallDriversAvgRating += 1),
                  (sums.ratingForDriverallDriversAvgRating =
                    sums.ratingForDriverNominatorallDriversAvgRating /
                    sums.ratingForDriverDenominatorallDriversAvgRating);
              } else {
                sumsArray[item.keyUserallDriversAvgRating] = {
                  keyUserallDriversAvgRating: item.keyUserallDriversAvgRating,
                  ratingForDriverNominatorallDriversAvgRating:
                    item.ratingForDriverallDriversAvgRating,
                  ratingForDriverDenominatorallDriversAvgRating: 1,
                  ratingForDriverallDriversAvgRating:
                    item.ratingForDriverallDriversAvgRating,
                };
              }
            });
            this.itemsalldriversavgrating = Object.keys(sumsArray).map(
              (key) => {
                return sumsArray[key];
              }
            );
          },
          (error) => {
            console.log("allDriversAvgRating Error: " + error.message);
          }
        );
    },
    usersAges() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            // let allAgesinNumber = [];
            let allAges = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              let x = myObj[key].birthDate;
              allAges.push(moment(x).format());
            });
            for (let i = 0; i < allAges.length; i++) {
              allAges[i] = Math.round(
                moment
                  .duration(moment(new Date()).diff(moment(allAges[i])))
                  .asYears()
              );
              const umplutura = {};
              umplutura.valoare = allAges[i];
              umplutura.nume = allAges[i];
              this.allUsersAges.push(allAges[i]);
              this.allUsersAgesTest.push(umplutura);
            }
            allAges.sort();
            for (let j = 0; j < 3; j++) {
              if (allAges.length == 0) console.log("empty: usersAges");
              let modeMap = {};
              let maxEl = allAges[0],
                maxCount = 1;
              for (let i = 0; i < allAges.length; i++) {
                let el = allAges[i];
                if (modeMap[el] == null) modeMap[el] = 1;
                else modeMap[el]++;
                if (modeMap[el] > maxCount) {
                  maxEl = el;
                  maxCount = modeMap[el];
                }
              }
              for (let i = 0; i < allAges.length; i++) {
                if (maxEl === allAges[i]) {
                  allAges.splice(i, maxCount);
                }
              }
              this.userAges.push(maxEl);
            }
          },
          (error) => {
            console.log("Error: " + error.message);
          }
        );
    },
    clientsAges() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            // let allAgesinNumber = [];
            let allAges = [];
            const myObj = snap.val();
            const keysClients = Object.keys(snap.val());
            keysClients.forEach((key) => {
              if (myObj[key].idDriver == null) {
                let x = myObj[key].birthDate;
                allAges.push(moment(x).format());
              }
            });
            for (let i = 0; i < allAges.length; i++) {
              allAges[i] = Math.round(
                moment
                  .duration(moment(new Date()).diff(moment(allAges[i])))
                  .asYears()
              );
              this.allClientsAges.push(allAges[i]);
            }
            allAges.sort();
            for (let j = 0; j < 3; j++) {
              if (allAges.length == 0) console.log("empty: clientsAges");
              let modeMap = {};
              let maxEl = allAges[0],
                maxCount = 1;
              for (let i = 0; i < allAges.length; i++) {
                let el = allAges[i];
                if (modeMap[el] == null) modeMap[el] = 1;
                else modeMap[el]++;
                if (modeMap[el] > maxCount) {
                  maxEl = el;
                  maxCount = modeMap[el];
                }
              }
              for (let i = 0; i < allAges.length; i++) {
                if (maxEl === allAges[i]) {
                  allAges.splice(i, maxCount);
                }
              }
              this.clientAges.push(maxEl);
            }
          },
          (error) => {
            console.log("clientsAges Error: " + error.message);
          }
        );
    },
    driversAges() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            // let allAgesinNumber = [];
            let allAges = [];
            const myObj = snap.val();
            const keysDrivers = Object.keys(snap.val());
            keysDrivers.forEach((key) => {
              if (myObj[key].idDriver != null) {
                let x = myObj[key].birthDate;
                allAges.push(moment(x).format());
              }
            });
            for (let i = 0; i < allAges.length; i++) {
              allAges[i] = Math.round(
                moment
                  .duration(moment(new Date()).diff(moment(allAges[i])))
                  .asYears()
              );
              this.allDriversAges.push(allAges[i]);
            }
            allAges.sort();
            for (let j = 0; j < 3; j++) {
              if (allAges.length == 0) console.log("empty: driversAges");
              let modeMap = {};
              let maxEl = allAges[0],
                maxCount = 1;
              for (let i = 0; i < allAges.length; i++) {
                let el = allAges[i];
                if (modeMap[el] == null) modeMap[el] = 1;
                else modeMap[el]++;
                if (modeMap[el] > maxCount) {
                  maxEl = el;
                  maxCount = modeMap[el];
                }
              }
              for (let i = 0; i < allAges.length; i++) {
                if (maxEl === allAges[i]) {
                  allAges.splice(i, maxCount);
                }
              }
              this.driverAges.push(maxEl);
            }
          },
          (error) => {
            console.log("driversAges Error: " + error.message);
          }
        );
    },
    topusersbyType() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            let myObj = snap.val();
            let keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (myObj[key].idDriver) {
                this.usersDrivers = +this.usersDrivers + 1;
              } else {
                this.usersClients = +this.usersClients + 1;
              }
            });
          },
          function(error) {
            console.log("topusersbyType Error: " + error.message);
          }
        );
    },
    ticketsStatus() {
      return firebase
        .database()
        .ref("Tickets")
        .on(
          "value",
          (snap) => {
            let myObj = snap.val();
            let keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (myObj[key].ticketStatus === "solved") {
                this.ticketsClosed = +this.ticketsClosed + 1;
              } else {
                this.ticketsOpened = +this.ticketsOpened + 1;
              }
            });
          },
          function(error) {
            console.log("ticketsStatus Error: " + error.message);
          }
        );
    },
    ridesStatus() {
      return firebase
        .database()
        .ref("Rides")
        .on(
          "value",
          (snap) => {
            let myObj = snap.val();
            let keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (myObj[key].status === "ride finished") {
                this.ridesFinished = +this.ridesFinished + 1;
              } else {
                this.ridesUnfinished = +this.ridesUnfinished + 1;
              }
            });
          },
          function(error) {
            console.log("ridesStatus Error: " + error.message);
          }
        );
    },
    cancelledRides() {
      return firebase
        .database()
        .ref("Rides")
        .on(
          "value",
          (snap) => {
            let myObj = snap.val();
            let keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (myObj[key].status === "ride cancelled by client") {
                this.rideCancelledByClient = +this.rideCancelledByClient + 1;
              } else {
                if (myObj[key].status === "driver didn't show") {
                  this.driverDidntShow = +this.driverDidntShow + 1;
                } else {
                  if (myObj[key].status === "client didn't show") {
                    this.clientDidntShow = +this.clientDidntShow + 1;
                  }
                }
              }
            });
          },
          function(error) {
            console.log("cancelledRides Error: " + error.message);
          }
        );
    },
    usersGender() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            let myObj = snap.val();
            let keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (myObj[key].gender === "Male") {
                this.userMale = +this.userMale + 1;
              } else {
                if (myObj[key].gender === "Female") {
                  this.userFemale = +this.userFemale + 1;
                } else {
                  if (myObj[key].gender === "Other") {
                    this.userOther = +this.userOther + 1;
                  } else {
                    if (myObj[key].gender === "Unspecified") {
                      this.userUnspecified = +this.userUnspecified + 1;
                    }
                  }
                }
              }
            });
          },
          function(error) {
            console.log("usersGender Error: " + error.message);
          }
        );
    },
    clientsGender() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            let myObj = snap.val();
            let keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (myObj[key].idDriver !== null) {
                if (myObj[key].gender === "Male") {
                  this.clientMale = +this.clientMale + 1;
                } else {
                  if (myObj[key].gender === "Female") {
                    this.clientFemale = +this.clientFemale + 1;
                  } else {
                    if (myObj[key].gender === "Other") {
                      this.clientOther = +this.clientOther + 1;
                    } else {
                      if (myObj[key].gender === "Unspecified") {
                        this.clientUnspecified = +this.clientUnspecified + 1;
                      }
                    }
                  }
                }
              }
            });
          },
          function(error) {
            console.log("clientsGender Error: " + error.message);
          }
        );
    },
    driversGender() {
      return firebase
        .database()
        .ref("Users")
        .on(
          "value",
          (snap) => {
            let myObj = snap.val();
            let keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (myObj[key].idDriver) {
                if (myObj[key].gender === "Male") {
                  this.driverMale = +this.driverMale + 1;
                } else {
                  if (myObj[key].gender === "Female") {
                    this.driverFemale = +this.driverFemale + 1;
                  } else {
                    if (myObj[key].gender === "Other") {
                      this.driverOther = +this.driverOther + 1;
                    } else {
                      if (myObj[key].gender === "Unspecified") {
                        this.driverUnspecified = +this.driverUnspecified + 1;
                      }
                    }
                  }
                }
              }
            });
          },
          function(error) {
            console.log("driversGender Error: " + error.message);
          }
        );
    },
    driversCheckStatus() {
      return firebase
        .database()
        .ref("Drivers")
        .on(
          "value",
          (snap) => {
            let myObj = snap.val();
            let keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              if (myObj[key].checkStatus === "verified") {
                this.driverCheckStatusVerified =
                  +this.driverCheckStatusVerified + 1;
              } else {
                this.driverCheckStatusNotVerified =
                  +this.driverCheckStatusNotVerified + 1;
              }
            });
          },
          function(error) {
            console.log("driversCheckStatus Error: " + error.message);
          }
        );
    },
    piechartDriversCheckStatus() {
      let colors1 = ["#8df85c", "#5cf8e8"];
      let colors2 = ["#5caaf8", "#e8000c"];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          let chart = new window.google.visualization.PieChart(
            document.getElementById("piechartDriversCheckStatus")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Type", "Number"],
              ["Verified", this.driverCheckStatusVerified],
              ["Not verified", this.driverCheckStatusNotVerified],
            ]),
            {
              is3D: false,
              backgroundColor: "transparent",
              legend: { textStyle: { color: "white" } },
              colors: [
                colors1[Math.floor(Math.random() * colors1.length)],
                colors2[Math.floor(Math.random() * colors2.length)],
              ],
            }
          );
        },
      });
    },
    piechartUsersGender() {
      let colors1 = ["#8df85c"];
      let colors2 = ["#5cf8e8"];
      let colors3 = ["#5caaf8"];
      let colors4 = ["#e8000c"];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          let chart = new window.google.visualization.PieChart(
            document.getElementById("piechartUsersGender")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Type", "Number"],
              ["Male", this.userMale],
              ["Female", this.userFemale],
              ["Other", this.userOther],
              ["Unspecified", this.userUnspecified],
            ]),
            {
              is3D: false,
              backgroundColor: "transparent",
              legend: { textStyle: { color: "white" } },
              colors: [
                colors1[Math.floor(Math.random() * colors1.length)],
                colors2[Math.floor(Math.random() * colors2.length)],
                colors3[Math.floor(Math.random() * colors3.length)],
                colors4[Math.floor(Math.random() * colors4.length)],
              ],
            }
          );
        },
      });
    },
    piechartClientsGender() {
      let colors1 = ["#8df85c"];
      let colors2 = ["#5cf8e8"];
      let colors3 = ["#5caaf8"];
      let colors4 = ["#e8000c"];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          let chart = new window.google.visualization.PieChart(
            document.getElementById("piechartClientsGender")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Type", "Number"],
              ["Male", this.clientMale],
              ["Female", this.clientFemale],
              ["Other", this.clientOther],
              ["Unspecified", this.clientUnspecified],
            ]),
            {
              is3D: false,
              backgroundColor: "transparent",
              legend: { textStyle: { color: "white" } },
              colors: [
                colors1[Math.floor(Math.random() * colors1.length)],
                colors2[Math.floor(Math.random() * colors2.length)],
                colors3[Math.floor(Math.random() * colors3.length)],
                colors4[Math.floor(Math.random() * colors4.length)],
              ],
            }
          );
        },
      });
    },
    piechartDriversGender() {
      let colors1 = ["#8df85c"];
      let colors2 = ["#5cf8e8"];
      let colors3 = ["#5caaf8"];
      let colors4 = ["#e8000c"];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          let chart = new window.google.visualization.PieChart(
            document.getElementById("piechartDriversGender")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Type", "Number"],
              ["Male", this.driverMale],
              ["Female", this.driverFemale],
              ["Other", this.driverOther],
              ["Unspecified", this.driverUnspecified],
            ]),
            {
              is3D: false,
              backgroundColor: "transparent",
              legend: { textStyle: { color: "white" } },
              colors: [
                colors1[Math.floor(Math.random() * colors1.length)],
                colors2[Math.floor(Math.random() * colors2.length)],
                colors3[Math.floor(Math.random() * colors3.length)],
                colors4[Math.floor(Math.random() * colors4.length)],
              ],
            }
          );
        },
      });
    },
    piechartUsersType() {
      let colors1 = ["#8df85c", "#5cf8e8"];
      let colors2 = ["#5caaf8", "#e8000c"];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          let chart = new window.google.visualization.PieChart(
            document.getElementById("piechartUsersType")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Type", "Number"],
              ["Clients", this.usersClients],
              ["Drivers", this.usersDrivers],
            ]),
            {
              is3D: false,
              backgroundColor: "transparent",
              legend: { textStyle: { color: "white" } },
              colors: [
                colors1[Math.floor(Math.random() * colors1.length)],
                colors2[Math.floor(Math.random() * colors2.length)],
              ],
            }
          );
        },
      });
    },
    piechartTicketsStatus() {
      let colors1 = ["#8df85c", "#5cf8e8"];
      let colors2 = ["#5caaf8", "#e8000c"];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          let chart = new window.google.visualization.PieChart(
            document.getElementById("piechartTicketsStatus")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Type", "Number"],
              ["Open", this.ticketsOpened],
              ["Closed", this.ticketsClosed],
            ]),
            {
              is3D: false,
              backgroundColor: "transparent",
              legend: { textStyle: { color: "white" } },
              colors: [
                colors1[Math.floor(Math.random() * colors1.length)],
                colors2[Math.floor(Math.random() * colors2.length)],
              ],
            }
          );
        },
      });
    },
    piechartRidesStatus() {
      let colors1 = ["#8df85c", "#5cf8e8"];
      let colors2 = ["#5caaf8", "#e8000c"];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          let chart = new window.google.visualization.PieChart(
            document.getElementById("piechartRidesStatus")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Type", "Number"],
              ["Finished", this.ridesFinished],
              ["Unfinished", this.ridesUnfinished],
            ]),
            {
              is3D: false,
              backgroundColor: "transparent",
              legend: { textStyle: { color: "white" } },
              colors: [
                colors1[Math.floor(Math.random() * colors1.length)],
                colors2[Math.floor(Math.random() * colors2.length)],
              ],
            }
          );
        },
      });
    },
    piechartCancelledRides() {
      let colors1 = ["#8df85c", "#5cf8e8"];
      let colors2 = ["#5caaf8", "#e8000c"];
      let colors3 = ["#06912b", "#ff8c00"];
      window.google.charts.load("visualization", "1.0", {
        packages: ["corechart", "bar", "table"],
        callback: () => {
          let chart = new window.google.visualization.PieChart(
            document.getElementById("piechartCancelledRides")
          );
          chart.draw(
            window.google.visualization.arrayToDataTable([
              ["Type", "Number"],
              ["Ride cancelled by client", this.rideCancelledByClient],
              ["Client didn't show", this.clientDidntShow],
              ["Driver didn't show", this.driverDidntShow],
            ]),
            {
              is3D: false,
              backgroundColor: "transparent",
              legend: { textStyle: { color: "white" } },
              colors: [
                colors1[Math.floor(Math.random() * colors1.length)],
                colors2[Math.floor(Math.random() * colors2.length)],
                colors3[Math.floor(Math.random() * colors3.length)],
              ],
            }
          );
        },
      });
    },
    barchartAgeFrequency() {
      let a = [];
      let b = [];
      let colors = ["#8df85c", "#5cf8e8", "#5caaf8", "#e8000c"];
      let prev;
      this.allUsersAges.sort();
      for (let i = 0; i < this.allUsersAges.length; i++) {
        if (this.allUsersAges[i] !== prev) {
          a.push(this.allUsersAges[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = this.allUsersAges[i];
      }
      let x = [["Years", "Frequency", { role: "style" }]];
      for (let i = 0; i < a.length; i++) {
        x.push([a[i], b[i], colors[Math.floor(Math.random() * colors.length)]]);
      }
      window.google.charts.setOnLoadCallback(() => {
        var view = new window.google.visualization.DataView(
          window.google.visualization.arrayToDataTable(x)
        );
        view.setColumns([
          0,
          1,
          {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation",
          },
          2,
        ]);
        var chart = new window.google.visualization.ColumnChart(
          document.getElementById("barchartAgeFrequency")
        );
        chart.draw(view, {
          height: 400,
          bar: { groupWidth: "95%" },
          legend: { position: "none", textStyle: { color: "white" } },
          backgroundColor: "transparent",
          hAxis: {
            textPosition: "none",
            textStyle: { color: "#FFFFFF" },
            gridlines: {
              color: "#FFFFFF",
            },
            baselineColor: "#FFFFFF",
          },
          vAxis: {
            textStyle: { color: "#FFFFFF" },
            baselineColor: "#FFFFFF",
          },
        });
      });
    },
  },
  created() {},
};
</script>
