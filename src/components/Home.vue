<template>
  <div class="map-wrapper">
    <div id="map" />
    <v-snackbar v-model="rideInfo.status" :timeout="0">
      <div class="user-ride-info" v-if="!userDetails.idDriver">
        <div class="justify-center-flex">
          <span class="user-ride-info-text bold-text">Ride Info</span>
        </div>
        <div class="justify-start-flex">
          <v-icon class="blue-color">mdi-map-marker-distance</v-icon>
          <span class="user-ride-info-text ml-1">{{
            this.rideInfo.distance
          }}</span>
        </div>
        <div class="justify-start-flex">
          <v-icon class="orange-color">mdi-account-clock-outline</v-icon>
          <span class="user-ride-info-text ml-1">{{
            this.rideInfo.duration
          }}</span>
        </div>
        <div class="justify-start-flex">
          <v-icon class="green-color">mdi-cash</v-icon>
          <span class="user-ride-info-text ml-1"
            >{{ this.rideInfo.price }} RON</span
          >
        </div>
        <div class="justify-center-flex">
          <v-btn class="button-margin-remover" @click="searchRide()"
            >Search</v-btn
          >
        </div>
      </div>
    </v-snackbar>

    <div class="custom-search-wrap" v-if="!userDetails.idDriver">
      <v-card class="search-card" elevation="0">
        <vue-google-autocomplete
          ref="address"
          id="search"
          class="form-control"
          placeholder="Search..."
          country="ro"
          enable-geolocation
          types="address"
          v-on:placechanged="getAddressData"
        ></vue-google-autocomplete>
        <div class="custom-search-icons">
          <v-icon @click="clearSearch()" class="custom-search-erase"
            >mdi-close</v-icon
          >
          <v-icon color="green" @click="search()">mdi-magnify</v-icon>
        </div>
      </v-card>
    </div>
    <div class="gps-custom-button" @click="geolocate()">
      <v-btn class="ma-2" fab dark small color="white" elevation="0">
        <v-icon color="blue lighten-1">mdi-crosshairs-gps</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import VueGoogleAutocomplete from "vue-google-autocomplete";
import * as firebase from "firebase";
export default {
  name: "Home",
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      address: {},
      defaultLocation: {
        lat: 44.4268006,
        lng: 26.1025036
      },
      destination: null,
      map: null,
      directions: {
        service: null,
        display: null,
        start: null,
        end: null
      },
      rideInfo: {
        status: false,
        distance: null,
        duration: null,
        price: null
      }
    };
  },
  created() {},
  watch: {
    defaultLocation: {
      deep: true,
      immediate: false,
      handler(newLocation) {
        if (newLocation && this.defaultLocation) {
          this.createMap();
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userDetails() {
      return this.$store.getters.loggedInUserData;
    }
  },

  mounted() {
    this.createMap();
    this.geolocate();
  },
  methods: {
    searchRide() {
      console.log(this.user);
      const newRide = {
        userLocationLat: this.defaultLocation.lat,
        userLocationLng: this.defaultLocation.lng,
        userDestinationLat: this.destination.geometry.location.lat(),
        userDestinationLng: this.destination.geometry.location.lng(),
        price: this.rideInfo.price,
        distance: this.rideInfo.distance,
        duration: this.rideInfo.duration,
        clientId: this.user
      };
      // TODO: replace with userId
      firebase
        .database()
        .ref("Rides/")
        .push(newRide)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    initialize(data) {
      this.map = data.map;
      this.google = data.google;
      this.askGeolocation();
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.defaultLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    createMap() {
      let myLatLng = new window.google.maps.LatLng(
        this.defaultLocation.lat,
        this.defaultLocation.lng
      );
      this.directions.service = new window.google.maps.DirectionsService();
      this.directions.display = new window.google.maps.DirectionsRenderer();
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 16,
        options: {
          disableDefaultUI: true,
          enableHighAccuracy: true
        }
      });
      this.directions.display.setMap(this.map);
      this.search();
      new window.google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: "Your Position"
      });
    },
    getAddressData(addressData, placeResultData) {
      this.address = addressData;
      this.destination = placeResultData;
    },
    clearSearch() {
      this.address = "";
      document.getElementById("search").value = "";
    },
    search() {
      this.destination;
      if (this.destination) {
        const request = {
          origin: this.defaultLocation,
          destination: this.destination.geometry.location,
          travelMode: "DRIVING"
        };
        this.directions.service.route(request, (response, status) => {
          if (status === "OK") {
            // this.$confirm("ceva").then(() => {
            //   //do something...
            //   console.log("something");
            // });
            this.rideInfo.status = true;
            this.rideInfo.distance = response.routes[0].legs[0].distance.text;
            let price = 3;
            console.log(response.routes[0].legs[0].distance.value * price);
            this.rideInfo.price = (
              (response.routes[0].legs[0].distance.value * price) /
              1000
            ).toFixed(2);
            this.rideInfo.duration = response.routes[0].legs[0].duration.text;
            this.directions.display.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
#map {
  height: 100%;
  width: 100%;
}
.search-card {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 450px;
  height: 40px;
  margin-top: 1.7vh;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 20px;
  font-size: 1em;
  appearance: none;
  border: none;
  border-radius: 21px !important;
  background: none;
  background-color: rgba(255, 255, 255, 0.9);
}
.form-control {
  width: -webkit-fill-available;
  caret-color: lightgray;
  outline: none;
  margin-right: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.custom-search-wrap {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.custom-search-icons {
  display: flex;
}
.custom-search-erase {
  margin-right: 10px;
}
.custom-search-erase:hover {
  transition: 0.4s ease;
  color: red;
}
.gps-custom-button {
  position: absolute;
  right: 0.5vw;
  bottom: 3vh;
}

.user-ride-info {
  display: flex;
  flex-flow: column;
  width: -webkit-fill-available;
  padding: 10px;
}

.user-ride-info-text {
  font-size: 1.4rem;
}
</style>
