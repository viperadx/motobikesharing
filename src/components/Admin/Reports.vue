<template>
  <v-container>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <v-icon> All users </v-icon>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
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
  </v-container>
</template>

<script>
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import * as firebase from "firebase";
export default {
  name: "Reports",
  data() {
    return {
      items: [],
      headers: [
        { text: "Key", align: "left", value: "key" },
        { text: "Last Name", value: "lastName" },
        { text: "First Name", value: "firstName" },
        { text: "Birth Date", value: "birthDate" },
        { text: "Email", value: "email" },
        { text: "Residency", value: "location" },
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
            console.log("Error: " + error.message);
          }
        );
    },
  },
  created() {},
  mounted() {
    this.userdetails();
  },
};
</script>
