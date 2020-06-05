<template>
  <v-layout column>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>All users</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
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
                  <td class="text-xs-left">{{ props.item.key }}</td>
                  <td class="text-xs-left">{{ props.item.lastName }}</td>
                  <td class="text-xs-left">{{ props.item.firstName }}</td>
                  <td class="text-xs-left">{{ props.item.birthDate }}</td>
                  <td class="text-xs-left">{{ props.item.email }}</td>
                  <td class="text-xs-left">{{ props.item.location }}</td>
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
                :headers="headersdrivers"
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
                  <td class="text-xs-left">{{ props.item.key }}</td>
                  <td class="text-xs-left">{{ props.item.checkStatus }}</td>
                  <td class="text-xs-left">{{ props.item.expireDateID }}</td>
                  <td class="text-xs-left">{{ props.item.expireDateITP }}</td>
                  <td class="text-xs-left">
                    {{ props.item.expireDateInsurance }}
                  </td>
                  <td class="text-xs-left">
                    {{ props.item.expireDateLicense }}
                  </td>
                  <td class="text-xs-left">{{ props.item.expireDateRCA }}</td>
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
                :headers="headerstickets"
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
                  <td class="text-xs-left">{{ props.item.key }}</td>
                  <td class="text-xs-left">{{ props.item.userFullName }}</td>
                  <td class="text-xs-left">{{ props.item.userID }}</td>
                  <td class="text-xs-left">{{ props.item.email }}</td>
                  <td class="text-xs-left">{{ props.item.subject }}</td>
                  <td class="text-xs-left">{{ props.item.query }}</td>
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
                :headers="headersrides"
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
                  <td class="text-xs-left">{{ props.item.key }}</td>
                  <td class="text-xs-left">{{ props.item.status }}</td>
                  <td class="text-xs-left">{{ props.item.clientId }}</td>
                  <td class="text-xs-left">{{ props.item.idDriver }}</td>
                  <td class="text-xs-left">{{ props.item.price }}</td>
                  <td class="text-xs-left">{{ props.item.timeStampFull }}</td>
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
                :headers="headersUniqueDestination"
                :options.sync="pagination"
                :items="allUniqueDestinations"
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
                  <td class="text-xs-left">{{ props.item.userFinishPoint }}</td>
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
                :headers="headersAllClientsSpendings"
                :options.sync="pagination"
                :items="itemsallspendings2"
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
                  <td class="text-xs-left">{{ props.item.keyUser }}</td>
                  <td class="text-xs-left">{{ props.item.price }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex>
          <v-card>
            <v-card-title>Frecvența vârstelor utilizatorilor</v-card-title>
            <v-card-text>
              <div id="barchart1"></div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-title>
              <v-icon style="color: #f86c5c;">
                history
              </v-icon>
              Utilizatori cu/fără istoric
            </v-card-title>
            <v-card-text>
              <div id="piechart2"></div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
//TODO: top 3 cei mai cheltuitori clienti, top 3 cei mai castigatori soferi, o lista cu toate cheltuielile/client, o lista cu toate castigurile/sofer
//TODO optionale: sa adaug un topic la ticket submission si sa fac un top/grafic cu topicurile tichetelor
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import * as firebase from "firebase";
import moment from "moment";
export default {
  name: "Reports",
  data() {
    return {
      usersLocations: [],
      clientsLocations: [],
      driversLocations: [],
      topusersHistory: [],
      topdriversHistory: [],
      topDestination: [],
      allDestinations: [],
      allUniqueDestinations: [],
      userAges: [],
      clientAges: [],
      driverAges: [],
      allUsersAges: [],
      allClientsAges: [],
      allDriversAges: [],
      items: [],
      itemsdrivers: [],
      itemstickets: [],
      itemsrides: [],
      itemsallspendings: [],
      itemsallspendings2: [],
      pagination: {
        itemsPerPage: 5,
      },
      headers: [
        { text: "User Key", align: "left", value: "key" },
        { text: "Last Name", value: "lastName" },
        { text: "First Name", value: "firstName" },
        { text: "Birth Date", value: "birthDate" },
        { text: "Email", value: "email" },
        { text: "Residency", value: "location" },
      ],
      headersdrivers: [
        { text: "Driver Key", align: "left", value: "key" },
        { text: "Verification Status", value: "checkStatus" },
        { text: "Expiration Date ID", value: "expireDateID" },
        { text: "Expiration Date ITP", value: "expireDateITP" },
        { text: "Expiration Date Insurance", value: "expireDateInsurance" },
        { text: "Expiration Date License", value: "expireDateLicense" },
        { text: "Expiration Date RCA", value: "expireDateRCA" },
      ],
      headerstickets: [
        { text: "Ticket Key", align: "left", value: "key" },
        { text: "User ID", value: "userID" },
        { text: "User Full Name", value: "userFullName" },
        { text: "User Email", value: "email" },
        { text: "Subject", value: "subject" },
        { text: "Query", value: "query" },
      ],
      headersrides: [
        { text: "Ride Key", align: "left", value: "key" },
        { text: "Status", value: "status" },
        { text: "Client ID", value: "clientId" },
        { text: "Driver ID", value: "idDriver" },
        { text: "Price", value: "price" },
        { text: "Time Stamp", value: "timeStampFull" },
      ],
      headersUniqueDestination: [{ text: "Address", value: "userFinishPoint" }],
      headersAllClientsSpendings: [
        { text: "User ID", value: "keyUser" },
        { text: "Value", value: "price" },
      ],
    };
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
              userdetails.birthDate = myObj[key].birthDate;
              userdetails.location = myObj[key].location;
              userdetails.firstName = myObj[key].firstName;
              userdetails.lastName = myObj[key].lastName;
              userdetails.email = myObj[key].email;
              userdetails.key = key;
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
              driverdetails.checkStatus = myObj[key].checkStatus;
              driverdetails.expireDateID = myObj[key].expireDateID;
              driverdetails.expireDateITP = myObj[key].expireDateITP;
              driverdetails.expireDateInsurance =
                myObj[key].expireDateInsurance;
              driverdetails.expireDateLicense = myObj[key].expireDateLicense;
              driverdetails.expireDateRCA = myObj[key].expireDateRCA;
              driverdetails.key = key;
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
              ticketdetails.userFullName = myObj[key].userFullName;
              ticketdetails.userID = myObj[key].userID;
              ticketdetails.email = myObj[key].email;
              ticketdetails.subject = myObj[key].subject;
              ticketdetails.query = myObj[key].query;
              ticketdetails.key = key;
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
              ridedetails.status = myObj[key].status;
              ridedetails.clientId = myObj[key].clientId;
              ridedetails.idDriver = myObj[key].idDriver;
              ridedetails.price = myObj[key].price;
              ridedetails.timeStampFull = myObj[key].timeStampFull;
              ridedetails.key = key;
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
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                const allDestinationsArtificiu = {};
                allDestinationsArtificiu.userFinishPoint =
                  myObj[key][key1].userFinishPoint;
                // allDest.push(myObj[key][key1].userFinishPoint);
                allDest.push(allDestinationsArtificiu);
              });
            });
            this.allDestinations = allDest;
            let uniqueArray = allDest.filter(function(item, pos) {
              return allDest.indexOf(item) == pos;
            });
            this.allUniqueDestinations = uniqueArray;
          },
          (error) => {
            console.log("allUsersDestinations Error: " + error.message);
          }
        );
    },
    // allClientsSpendings() {
    //   return firebase
    //     .database()
    //     .ref("UsersDestinationsHistory")
    //     .on(
    //       "value",
    //       (snap) => {
    //         let allSpend = [];
    //         let allSpend2 = [];
    //         const myObj = snap.val();
    //         const keysUsers = Object.keys(snap.val());
    //         keysUsers.forEach((key) => {
    //           const allSpendings2 = {};
    //           const keysHistory = Object.keys(myObj[key]);
    //           keysHistory.forEach((key1) => {
    //             // allSpendings.push(myObj[key][key1].price);
    //             const allSpendings = {};
    //             allSpendings.price = myObj[key][key1].price;
    //             allSpendings.key = key1;
    //             allSpend.push(allSpendings);
    //           });
    //           allSpendings2.finalPrice += allSpend.price;
    //           allSpendings2.key = key;
    //           allSpend2.push(allSpendings2);
    //         });
    //         this.itemsallspendings = allSpend2;
    //       },
    //       (error) => {
    //         console.log("allClientsSpendings Error: " + error.message);
    //       }
    //     );
    // },
    allClientsSpendings() {
      return firebase
        .database()
        .ref("UsersDestinationsHistory")
        .on(
          "value",
          (snap) => {
            let sumsArray = {};
            let allSpend = [];
            let allSpend2 = [];
            const myObj = snap.val();
            const keysUsers = Object.keys(snap.val());
            keysUsers.forEach((key) => {
              const keysHistory = Object.keys(myObj[key]);
              keysHistory.forEach((key1) => {
                // allSpendings.push(myObj[key][key1].price);
                const allSpendings = {};
                allSpendings.price = myObj[key][key1].price;
                allSpendings.keyRide = key1;
                allSpendings.keyUser = key;
                allSpend.push(allSpendings);
              });
              this.itemsallspendings = allSpend;
            });
            //TODO: tre sa repar vizualizarea sau cum sunt salvate datele astea (vezi exemple din alte tabele)
            allSpend.forEach((item) => {
              let sums = sumsArray[item.keyUser];
              if (sums) {
                sums.price += item.price;
              } else {
                sumsArray[item.keyUser] = {
                  keyUser: item.keyUser,
                  price: item.price,
                };
              }
            });
            allSpend2.push(sumsArray);
            this.itemsallspendings2 = allSpend2;
          },
          (error) => {
            console.log("allClientsSpendings Error: " + error.message);
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
              this.allUsersAges.push(allAges[i]);
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
    // piechart2() {
    //   let myObjwith = [];
    //   let myObj = [];
    //   let colors = [
    //     "#9c5463",
    //     "#7b4c67",
    //     "#c86060",
    //     "#5e4469",
    //     "#7f4c66",
    //     "#b25a62",
    //   ];
    //   firebase
    //     .database()
    //     .ref("Users")
    //     .on("value", (snap) => {
    //       myObj = snap.val();
    //     }),
    //     (error) => {
    //       console.log("Error: " + error.message);
    //     };
    //   firebase
    //     .database()
    //     .ref("UsersDestinationsHistory")
    //     .on("value", (snap) => {
    //       myObjwith = snap.val();
    //     }),
    //     (error) => {
    //       console.log("Error: " + error.message);
    //     };
    //   google.charts.load("visualization", "1.0", {
    //     packages: ["corechart", "bar", "table"],
    //     callback: () => {
    //       let chart = new window.google.visualization.PieChart(
    //         document.getElementById("piechart2")
    //       );
    //       chart.draw(
    //         window.google.visualization.arrayToDataTable([
    //           ["Tip", "Numar"],
    //           ["Cu Istoric", Object.keys(myObjwith).length],
    //           [
    //             "Fără Istoric",
    //             Object.keys(myObj).length - Object.keys(myObjwith).length,
    //           ],
    //         ]),
    //         {
    //           is3D: false,
    //           colors: [
    //             "#f86c5c",
    //             colors[Math.floor(Math.random() * colors.length)],
    //           ],
    //         }
    //       );
    //     },
    //   });
    // },
    barchart() {
      let a = [];
      let b = [];
      let colors = [
        "#9c5463",
        "#7b4c67",
        "#c86060",
        "#5e4469",
        "#7f4c66",
        "#b25a62",
        "#f86c5c",
      ];
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
      let x = [["Ani", "Frecvență", { role: "style" }]];
      for (let i = 0; i < a.length; i++) {
        x.push([a[i], b[i], colors[Math.floor(Math.random() * colors.length)]]);
        console.log(x);
      }
      window.google.charts.setOnLoadCallback(() => {
        let view = new window.google.visualization.DataView(
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
        let chart = new window.google.visualization.ColumnChart(
          document.getElementById("barchart1")
        );
        chart.draw(view, {
          height: 400,
          bar: { groupWidth: "95%" },
          legend: { position: "none" },
        });
      });
    },
  },
  created() {},
  mounted() {
    this.allClientsSpendings();
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
    this.barchart();
    this.piechart2();
  },
};
</script>
