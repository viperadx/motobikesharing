<template>
  <div class="map-wrapper">
    <div id="map" />
    <v-snackbar
      v-model="showSnackbarForUser"
      :timeout="0"
      class="custom-snackbar"
    >
      <div
        class="custom-driver-is-on-route"
        v-if="
          activeRideRequest && activeRideRequest.status === 'driver on route'
        "
      >
        Driver is on route
      </div>
      <div
        class="custom-driver-arrived"
        v-if="
          activeRideRequest && activeRideRequest.status === 'driver arrived'
        "
      >
        Meet your driver outside
      </div>
      <div
        class="custom-ride-finished"
        v-if="activeRideRequest && activeRideRequest.status === 'ride finished'"
      >
        Thank you for your ride!
      </div>
      <div
        class="custom-search-progress"
        column
        fill-height
        v-if="activeRideRequest && activeRideRequest.status === 'pending'"
      >
        <div>
          Searching ride
        </div>
        <v-progress-circular indeterminate color="primary">
        </v-progress-circular>
      </div>
      <div
        class="user-ride-info"
        v-if="!userDetails.idDriver && !activeRideRequest"
      >
        <div class="justify-center-flex">
          <span class="user-ride-info-text bold-text">Ride Info</span>
        </div>
        <div class="justify-start-flex">
          <v-icon class="blue-color">mdi-map-marker-distance</v-icon>
          <span class="user-ride-info-text ml-1">{{ rideInfo.distance }}</span>
        </div>
        <div class="justify-start-flex">
          <v-icon class="orange-color">mdi-account-clock-outline</v-icon>
          <span class="user-ride-info-text ml-1">{{ rideInfo.duration }}</span>
        </div>
        <div class="justify-start-flex">
          <v-icon class="green-color">mdi-cash</v-icon>
          <span class="user-ride-info-text ml-1">{{ rideInfo.price }} RON</span>
        </div>
        <div class="justify-center-flex">
          <v-btn class="button-margin-remover" @click="searchRide()"
            >Search</v-btn
          >
        </div>
      </div>
    </v-snackbar>

    <div class="custom-search-wrap" v-if="!userDetails.idDriver">
      <!-- v-if="!userDetails.idDriver" -->
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
    <div class="connect-driver" v-if="userDetails.idDriver">
      <v-btn
        color="green"
        fab
        x-large
        dark
        v-if="!driverIsConnected && !currentRideDriver"
        @click="connectDriver()"
      >
        <v-icon>mdi-motorbike</v-icon>
      </v-btn>

      <v-btn
        color="orange"
        rounded
        x-large
        dark
        v-if="
          driverIsConnected &&
            currentRideDriver &&
            currentRideDriver.status === 'driver on route'
        "
        @click="driverArrived()"
        >I have arrived
      </v-btn>

      <v-btn
        color="blue"
        rounded
        x-large
        dark
        v-if="
          driverIsConnected &&
            currentRideDriver &&
            currentRideDriver.status === 'driver arrived'
        "
        @click="finishRide()"
        >Finish ride
      </v-btn>

      <v-btn
        color="red"
        fab
        x-large
        dark
        v-if="driverIsConnected && !currentRideDriver"
        @click="disconnectDriver()"
      >
        <v-icon>mdi-motorbike</v-icon>
      </v-btn>
    </div>
    <div
      class="custom-rides-requests"
      v-if="userDetails.idDriver && !currentRideDriver"
    >
      <div v-for="(ride, index) in rides" :key="index">
        <v-card
          v-if="ride.status === 'pending'"
          class="custom-ride-request"
          v-on:
          click="showRides"
        >
          <div class="driver-ride-info" v-if="driverIsConnected">
            <div class="justify-center-flex">
              <span class="driver-ride-info-text bold-text">Ride Info</span>
            </div>
            <div class="justify-start-flex">
              <v-icon class="blue-color">mdi-map-marker-distance</v-icon>
              <span class="driver-ride-info-text ml-1">{{
                ride.distance
              }}</span>
            </div>
            <div class="justify-start-flex">
              <v-icon class="orange-color">mdi-account-clock-outline</v-icon>
              <span class="driver-ride-info-text ml-1">{{
                ride.duration
              }}</span>
            </div>
            <div class="justify-start-flex">
              <v-icon class="green-color">mdi-cash</v-icon>
              <span class="driver-ride-info-text ml-1"
                >{{ ride.price }} RON</span
              >
            </div>
            <div class="justify-center-flex">
              <v-btn class="button-margin-remover" @click="acceptRide(ride)"
                >Accept ride</v-btn
              >
            </div>
          </div>
        </v-card>
      </div>
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
      },
      currentRide: null,
      driverIsConnected: false,
      incomingRequest: true,
      showRides: true
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
    },
    activeRideRequest: {
      deep: true,
      immediate: false,
      handler(newValue) {
        if (newValue.status === "ride finished") {
          this.createMap();
          this.geolocate();
        }
      }
    }
  },
  computed: {
    currentRideDriver() {
      return this.$store.getters.currentRideDriverGetter;
    },
    showSnackbarForUser() {
      return (
        this.rideInfo.status === "requesting" && !this.userDetails.idDriver
      );
    },
    rides() {
      return this.$store.getters.allRidesDataGetter;
    },
    activeRideRequest() {
      return this.$store.getters.activeRideRequest;
    },
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
    this.$store.dispatch("readAllRidesDetails");
  },
  methods: {
    connectDriver() {
      this.driverIsConnected = !this.driverIsConnected;
    },
    disconnectDriver() {
      this.driverIsConnected = !this.driverIsConnected;
    },
    newRequest() {
      this.incomingRequest = !this.incomingRequest;
    },
    searchRide() {
      console.log(this);
      const newRide = {
        userLocationLat: this.defaultLocation.lat,
        userLocationLng: this.defaultLocation.lng,
        status: "pending",
        userDestinationLat: this.destination.geometry.location.lat(),
        userDestinationLng: this.destination.geometry.location.lng(),
        price: this.rideInfo.price,
        distance: this.rideInfo.distance,
        duration: this.rideInfo.duration,
        clientId: this.user
      };
      let rideId;
      firebase
        .database()
        .ref("Rides/")
        .push(newRide)
        .then(res => {
          console.log(res);
          rideId = res.key;
          firebase
            .database()
            .ref("Rides/" + rideId)
            .update({ rideId: res.key })
            .then(() => {
              this.$store.dispatch("activeRideRequest", rideId);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    acceptRide(ride) {
      const payload = { ride, idDriver: this.user };
      this.$store.dispatch("acceptRide", payload);
      this.initRouteMap(
        new window.google.maps.LatLng(
          ride.userLocationLat,
          ride.userLocationLng
        )
      );
    },
    driverArrived() {
      const payload = { ride: this.currentRideDriver, idDriver: this.user };
      this.$store.dispatch("driverArrived", payload);
      this.initRouteMap(
        new window.google.maps.LatLng(
          this.currentRideDriver.userDestinationLat,
          this.currentRideDriver.userDestinationLng
        )
      );

      this.defaultLocation = {
        lat: this.currentRideDriver.userLocationLat,
        lng: this.currentRideDriver.userLocationLng
      };
    },
    finishRide() {
      const payload = { ride: this.currentRideDriver, idDriver: this.user };
      this.$store.dispatch("finishRide", payload);
      this.createMap();
      this.geolocate();
      this.driverIsConnected = true;
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
      // this.search();
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
      this.initRouteMap(this.destination.geometry.location);
    },
    initRouteMap(destination) {
      console.log(destination);
      if (destination) {
        const request = {
          origin: this.defaultLocation,
          destination: destination,
          travelMode: "DRIVING"
        };
        this.directions.service.route(request, (response, status) => {
          if (status === "OK") {
            this.rideInfo.status = "requesting";
            this.$store.dispatch("activeRideRequest", null);
            this.rideInfo.distance = response.routes[0].legs[0].distance.text;
            let price = 3;
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

.custom-rides-requests {
  top: 74px;
  position: fixed;
  right: 10px;
  bottom: 46px;
  overflow: auto;
  height: auto;
}
.custom-ride-request {
  margin: 5px;
  padding: 10px;
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
  left: 0.5vw;
  bottom: 3vh;
}

.user-ride-info {
  display: flex;
  flex-flow: column;
  width: -webkit-fill-available;
  padding: 10px;
  height: 230px;
}

.user-ride-info-text {
  font-size: 1.4rem;
}

.custom-search-progress {
  display: flex;
  width: 100%;
  align-items: center;
  flex-flow: column;
}

.custom-driver-is-on-route {
  display: flex;
  width: 100%;
  align-items: center;
  flex-flow: column;
}

.custom-driver-arrived {
  display: flex;
  width: 100%;
  align-items: center;
  flex-flow: column;
}

.custom-ride-finished {
  display: flex;
  width: 100%;
  align-items: center;
  flex-flow: column;
}

.v-snack__wrapper {
  min-height: 220px;
}

.driver-ride-info {
  display: flex;
  flex-flow: column;
  width: -webkit-fill-available;
  padding: 10px;
}

.driver-ride-info-text {
  font-size: 1.4rem;
}

.custom-snackbar {
  min-height: 220px;
}

.connect-driver {
  position: absolute;
  height: 100px;
  right: 40vw;
  bottom: 5vh;
  display: flex;
  flex-flow: column;
  padding: 10px;
}
</style>
