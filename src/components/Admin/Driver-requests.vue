<template>
  <v-card>
    <v-layout column>
      <v-container fluid grid-list-md>
        <v-layout wrap>
          <div v-if="driverDetails">
            <v-flex xs6>
              <v-text-field
                label="Driver/User ID"
                outlined
                readonly
                :value="driverDetails.idUser"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <expandable-image
                :src="driverDetails.imageSelfieURL"
                height="70"
                width="70"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Expire date ID"
                outlined
                readonly
                :value="driverDetails.expireDateID"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <expandable-image
                :src="driverDetails.imageIDURL"
                height="70"
                width="70"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Expire date ITP"
                outlined
                readonly
                :value="driverDetails.expireDateITP"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <expandable-image
                :src="driverDetails.imageITPURL"
                height="70"
                width="70"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Expire date Insurance"
                outlined
                readonly
                :value="driverDetails.expireDateInsurance"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <expandable-image
                :src="driverDetails.imageInsuranceURL"
                height="70"
                width="70"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Expire date License"
                outlined
                readonly
                :value="driverDetails.expireDateLicense"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <expandable-image
                :src="driverDetails.imageLicenseURL"
                height="70"
                width="70"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                label="Expire date RCA"
                outlined
                readonly
                :value="driverDetails.expireDateRCA"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <expandable-image
                :src="driverDetails.imageRCAURL"
                height="70"
                width="70"
              />
            </v-flex>
            <v-flex xs6>
              <v-select
                :items="checkStatuses"
                v-model="checkStatusFinal"
                :placeholder="driverDetails.checkStatus"
                color="normal"
                label="Verification status"
                id="checkStatusUpdated"
              ></v-select>
            </v-flex>
          </div>

          <!-- <v-spacer></v-spacer> -->
          <v-card-actions>
            <v-btn type="submit" @click="updateCheckStatus()">Submit</v-btn>
          </v-card-actions>
        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
import Vue from "vue";
import VueExpandableImage from "vue-expandable-image";
Vue.use(VueExpandableImage);
import * as firebase from "firebase";
export default {
  name: "Driver-requests",
  data() {
    return {
      driverDetails: null,
      id: this.$route.params.id,
      checkStatusFinal: null,
      checkStatuses: ["verified", "pending", "need more info", "declined"],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    allDriversDataGetter() {
      return this.$store.getters.allDriversDataGetter
        ? this.$store.getters.allDriversDataGetter
        : "";
    },
  },
  methods: {
    updateCheckStatus() {
      const payload = {
        checkStatus: this.checkStatusFinal,
        userID: this.id,
      };
      this.$store.dispatch("updateCheckStatus", payload);
    },
  },
  created() {
    this.$store.dispatch("readAllDriversDetails", this.id);
  },
  mounted() {
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(viewportMeta);
    firebase
      .database()
      .ref("/Drivers/" + this.id)
      .on("value", (snap) => {
        this.driverDetails = snap.val();
      });
  },
};
</script>
