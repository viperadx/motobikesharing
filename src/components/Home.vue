<template>
  <div class="map-wrapper">
    <div id="map" />
    <div class="custom-search-wrap">
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
          <v-icon @click="clearSearch()" class="custom-search-erase">mdi-close</v-icon>
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
  computed: {},

  mounted() {
    this.createMap();
    this.geolocate();
  },
  methods: {
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
            console.log(response.routes[0].legs[0].distance.text)
            console.log(response.routes[0].legs[0].duration.text)
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
</style>
