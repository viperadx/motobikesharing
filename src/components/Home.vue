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
        <div>Driver is on route</div>
        <div>
          <v-text-field
            label="Driver phone"
            :readonly="readonly"
            outlined
            :value="activeRideRequest.phoneDriver"
          ></v-text-field>
        </div>
        <div class="custom-cancel-ride-client">
          <v-btn small color="primary" dark @click="driverDidntShow()"
            >Cancel ride</v-btn
          >
        </div>
      </div>
      <div
        class="custom-driver-arrived"
        v-if="
          activeRideRequest && activeRideRequest.status === 'driver arrived'
        "
      >
        <div>Meet your driver outside</div>
        <div>
          <v-text-field
            label="Driver phone"
            outlined
            :readonly="readonly"
            :value="activeRideRequest.phoneDriver"
          ></v-text-field>
        </div>
      </div>
      <div
        class="custom-send-rating-from-client"
        v-if="
          activeRideRequest &&
            (activeRideRequest.status === 'client dropped at destination' ||
              activeRideRequest.status === 'ride finished') &&
            activeRideRequest.ratingForDriver === 'no input at the moment'
        "
      >
        <v-rating v-model="ratingForDriver"> </v-rating>
        <v-button
          class="button-margin-remover"
          rounded
          x-large
          @click="sendRatingForDriver()"
        >
          Send Rating</v-button
        >
      </div>
      <div
        class="custom-waiting-rating"
        v-if="
          activeRideRequest &&
            activeRideRequest.ratingForDriver !== 'no input at the moment'
        "
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
        <div class="custom-cancel-ride-client">
          <v-btn small color="primary" dark @click="cancelRideClient()"
            >Cancel ride</v-btn
          >
        </div>
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
    <!-- de aici e driverul -->
    <v-snackbar
      v-model="snackbarForUnverifiedDriver"
      :timeout="0"
      class="custom-snackbar-unverified-driver"
    >
      <div>
        Account under verification. Contact support for further questions
      </div>
    </v-snackbar>
    <div v-if="currentDriverDetails.checkStatus === 'verified'">
      <v-snackbar
        v-model="snackbarForDriverArrived"
        :timeout="0"
        class="custom-snackbar-unverified-driver"
        ><div class="custom-cancel-ride-driver">
          <!-- //TODO de adaugat nr clientului la driverArrived si optiune de cancel la sofer si client pentru neprezentare -->
          <v-btn
            color="orange"
            rounded
            large
            dark
            v-if="
              driverIsConnected &&
                currentRideDriver &&
                currentRideDriver.status === 'driver on route'
            "
            @click="driverArrived()"
            >I have arrived
          </v-btn>
          <br />
          <v-text-field
            v-if="
              driverIsConnected &&
                currentRideDriver &&
                currentRideDriver.status === 'driver on route'
            "
            label="Client phone"
            outlined
            :readonly="readonly"
            :value="currentRideDriver.phoneClient"
          ></v-text-field>

          <v-btn small color="primary" dark @click="cancelRideDriver()"
            >Cancel ride</v-btn
          >
        </div>
      </v-snackbar>
    </div>
    <div
      class="connect-driver"
      v-if="currentDriverDetails.checkStatus === 'verified'"
    >
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
        color="blue"
        rounded
        x-large
        dark
        v-if="
          driverIsConnected &&
            currentRideDriver &&
            currentRideDriver.status === 'driver arrived'
        "
        @click="ratingForClientPopup()"
        >Finish ride
        <!-- @click="finishRide()" -->
      </v-btn>
      <v-card
        class="custom-send-rating-from-driver"
        v-if="
          driverIsConnected &&
            currentRideDriver &&
            currentRideDriver.status === 'client dropped at destination' &&
            currentRideDriver.ratingForClient ===
              'waiting the driver to rate client'
        "
      >
        <v-rating v-model="ratingForClient"> </v-rating>
        <div class="justify-center-flex">
          <v-button
            class="button-margin-remover"
            rounded
            x-large
            @click="finishRide()"
          >
            Send Rating</v-button
          >
        </div>
      </v-card>

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
                >{{ ride.earningDriver }} RON</span
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
import moment from "moment";
export default {
  name: "Home",
  components: {
    VueGoogleAutocomplete,
  },
  data() {
    return {
      readonly: true,
      startLocationAddress: null,
      address: {},
      defaultLocation: {
        lat: 44.4268006,
        lng: 26.1025036,
      },
      destination: null,
      map: null,
      directions: {
        service: null,
        display: null,
        start: null,
        end: null,
      },
      rideInfo: {
        status: false,
        distance: null,
        duration: null,
        price: null,
        earningDriver: null,
      },
      currentRide: null,
      driverIsConnected: false,
      incomingRequest: true,
      ratingForClient: 3,
      ratingForDriver: 3,
      showRides: true,
    };
  },
  created() {
    this.$store.dispatch("readDriverDetailsByUserID", this.user);
  },
  watch: {
    defaultLocation: {
      deep: true,
      immediate: false,
      handler(newLocation) {
        if (newLocation && this.defaultLocation) {
          this.createMap();
        }
      },
    },
    activeRideRequest: {
      deep: true,
      immediate: false,
      handler(newValue) {
        if (
          newValue.status === "ride finished" ||
          newValue.status === "ride cancelled by client" ||
          newValue.status === "client didn't show" ||
          newValue.status === "driver didn't show"
        ) {
          this.createMap();
          this.geolocate();
        }
      },
    },
  },
  computed: {
    currentRideDriver() {
      return this.$store.getters.currentRideDriverGetter;
    },
    currentRideClient() {
      return this.$store.getters.currentRideClientGetter;
    },
    snackbarForDriverArrived() {
      return (
        this.currentRideDriver &&
        this.currentRideDriver.status === "driver on route"
      );
    },
    snackbarForUnverifiedDriver() {
      return (
        this.userDetails.idDriver &&
        this.currentDriverDetails.checkStatus !== "verified"
      );
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
      return this.$store.getters.user ? this.$store.getters.user : "";
    },
    userDetails() {
      return this.$store.getters.loggedInUserData
        ? this.$store.getters.loggedInUserData
        : "";
    },
    currentDriverDetails() {
      return this.$store.getters.presentDriverDataGetter
        ? this.$store.getters.presentDriverDataGetter
        : "";
    },
  },

  mounted() {
    this.createMap();
    this.geolocate();
    this.$store.dispatch("readAllRidesDetails");
    this.$store.dispatch("readDriverDetailsByUserID", this.user);
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
      //get user start location address
      const reverseStartLocationRequest = new XMLHttpRequest();
      reverseStartLocationRequest.open(
        "GET",
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          this.defaultLocation.lat +
          "," +
          this.defaultLocation.lng +
          "&key=AIzaSyCnKJYJPDPPKIwcf8fnDC7FXvUhRgPg1Gc",
        true
      );
      reverseStartLocationRequest.send();
      reverseStartLocationRequest.onload = () => {
        let startLocationResponse = JSON.parse(
          reverseStartLocationRequest.responseText
        );
        this.startLocationAddress =
          startLocationResponse.results[0].formatted_address;
      };
      //TODO nu mai merge userStartPoint/startLocation response
      // cod alex
      let day = new Date();
      let dayWrapper = moment(day);
      let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
      let dayString = dayWrapper.format("DD");
      let monthString = dayWrapper.format("MM");
      let yearString = dayWrapper.format("YYYY");
      const newRide = {
        userLocationLat: this.defaultLocation.lat,
        userLocationLng: this.defaultLocation.lng,
        status: "pending",
        userDestinationLat: this.destination.geometry.location.lat(),
        userDestinationLng: this.destination.geometry.location.lng(),
        price: this.rideInfo.price,
        earningDriver: this.rideInfo.earningDriver,
        distance: this.rideInfo.distance,
        duration: this.rideInfo.duration,
        phoneClient: this.userDetails.phone,
        clientId: this.user,
        timeStampFull: fullString,
        timeStampDay: dayString,
        timeStampMonth: monthString,
        timeStampYear: yearString,
        ratingForClient: "no input at the moment",
        ratingForDriver: "no input at the moment",
        userStartPoint: this.startLocationAddress,
        userFinishPoint: this.destination.formatted_address,
      };
      let rideId;
      firebase
        .database()
        .ref("Rides/")
        .push(newRide)
        .then((res) => {
          rideId = res.key;
          firebase
            .database()
            .ref("Rides/" + rideId)
            .update({ rideId: res.key })
            .then(() => {
              this.$store.dispatch("activeRideRequest", rideId);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelRideClient() {
      const payload = { ride: this.currentRideClient };
      this.$store.dispatch("cancelRideClient", payload);
      this.rideInfo.status = "not requesting";
      this.createMap();
      this.geolocate();
      this.clearSearch();
    },
    driverDidntShow() {
      const payload = { ride: this.currentRideClient };
      this.$store.dispatch("driverDidntShow", payload);
      this.rideInfo.status = "not requesting";
      this.createMap();
      this.geolocate();
      this.clearSearch();
      this.driverIsConnected = false;
    },
    cancelRideDriver() {
      const payload = { ride: this.currentRideDriver };
      this.$store.dispatch("cancelRideDriver", payload);
      this.rideInfo.status = "not requesting";
      this.createMap();
      this.geolocate();
      this.driverIsConnected = true;
    },
    acceptRide(ride) {
      const payload = {
        ride,
        idDriver: this.user,
        driverFullName:
          this.userDetails.firstName + " " + this.userDetails.lastName,
        phoneDriver: this.userDetails.phone,
      };
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
        lng: this.currentRideDriver.userLocationLng,
      };
    },
    ratingForClientPopup() {
      const payload = { ride: this.currentRideDriver, idDriver: this.user };
      this.$store.dispatch("ratingForClientPopup", payload);
    },
    sendRatingForDriver() {
      const payload = {
        ride: this.currentRideClient,
        clientId: this.user,
        ratingForDriver: this.ratingForDriver,
      };
      this.$store.dispatch("sendRatingForDriver", payload);
    },
    finishRide() {
      const payload = {
        ride: this.currentRideDriver,
        idDriver: this.user,
        ratingForClient: this.ratingForClient,
      };
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
      navigator.geolocation.getCurrentPosition((position) => {
        this.defaultLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
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
          enableHighAccuracy: true,
        },
      });
      this.directions.display.setMap(this.map);
      // this.search();
      new window.google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: "Your Position",
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
      if (destination) {
        const request = {
          origin: this.defaultLocation,
          destination: destination,
          travelMode: "DRIVING",
        };
        this.directions.service.route(request, (response, status) => {
          if (status === "OK") {
            this.rideInfo.status = "requesting";
            this.$store.dispatch("activeRideRequest", null);
            this.rideInfo.distance = response.routes[0].legs[0].distance.text;
            let pricedistance = 2.5;
            let priceduration = 0.3;
            this.rideInfo.price = (
              (response.routes[0].legs[0].distance.value * pricedistance) /
                1000 +
              (response.routes[0].legs[0].duration.value * priceduration) / 60
            ).toFixed(2);
            this.rideInfo.earningDriver = (
              this.rideInfo.price -
              this.rideInfo.price * 0.1
            ).toFixed(2);
            this.rideInfo.duration = response.routes[0].legs[0].duration.text;
            this.directions.display.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        });
      }
    },
  },
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
  background-color: rgba(0, 0, 0, 0.9) !important;
  color: white !important;
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

.custom-cancel-ride-client {
  display: flex;
  width: 100%;
  align-items: center;
  flex-flow: column;
}
.custom-cancel-ride-driver {
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

.custom-send-rating-from-client {
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

.custom-waiting-rating {
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

.custom-snackbar-unverified-driver {
  min-height: 220px;
}

.custom-send-rating-from-driver {
  min-height: 180px;
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
