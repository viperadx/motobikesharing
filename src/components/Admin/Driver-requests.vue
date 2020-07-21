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
            <v-flex xs3>
              <expandable-image
                class="custom-expandable-image"
                :src="driverDetails.imageSelfieURL"
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
            <v-flex xs3>
              <expandable-image
                class="custom-expandable-image"
                :src="driverDetails.imageIDURL"
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
            <v-flex xs3>
              <expandable-image
                class="custom-expandable-image"
                :src="driverDetails.imageITPURL"
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
            <v-flex xs3>
              <expandable-image
                class="custom-expandable-image"
                :src="driverDetails.imageInsuranceURL"
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
            <v-flex xs3>
              <expandable-image
                class="custom-expandable-image"
                :src="driverDetails.imageLicenseURL"
              />
            </v-flex>
            <v-flex xs6>
              <v-text-field
                class="custom-expandable-image"
                label="Expire date RCA"
                outlined
                readonly
                :value="driverDetails.expireDateRCA"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <expandable-image
                class="custom-expandable-image"
                :src="driverDetails.imageRCAURL"
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
        </v-layout>
        <v-card-actions>
          <v-btn type="submit" @click="updateCheckStatus()">Submit</v-btn>
        </v-card-actions>
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

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  max-width: 100%;
  margin: 50px auto;
  position: relative;
}

.image {
  width: 400px;
  max-width: 100%;
}

.expandable-image {
  position: relative;
  transition: 0.25s opacity;
  cursor: zoom-in;
}

body > .expandable-image.expanded {
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  align-items: center;
  opacity: 0;
  padding-bottom: 0 !important;
  cursor: default;
}

.custom-expandable-image {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin: 0 auto;
}

body > .expandable-image.expanded > img {
  width: 100%;
  max-width: 1200px;
  max-height: 100%;
  object-fit: contain;
  margin: 0 auto;
}

body > .expandable-image.expanded > .close-button {
  display: block;
}

.close-button {
  position: fixed;
  top: 10px;
  right: 10px;
  display: none;
  cursor: pointer;
}
svg {
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
}
svg path {
  fill: #fff;
}
.expand-button {
  position: absolute;
  z-index: 999;
  right: 10px;
  top: 10px;
  padding: 0px;
  align-items: center;
  justify-content: center;
  padding: 3px;
  opacity: 0;
  transition: 0.2s opacity;
}

.expandable-image:hover .expand-button {
  opacity: 1;
}
.expand-button svg {
  width: 20px;
  height: 20px;
}
.expand-button path {
  fill: #fff;
}

.expandable-image img {
  width: 100%;
}
</style>
