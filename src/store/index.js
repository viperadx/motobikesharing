/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    driverData: null,
    userData: null,
    loggedInUserData: null,
    allDriversData: [],
    allRatingsData: [],
    allRidesData: [],
    allUsersData: [],
    allTexts: null,
    user: null,
    presentDriverData: null,
    activeRide: null,
    currentRideDriver: null
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setDriverData(state, payload) {
      state.driverData = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
    setloggedInUserData(state, payload) {
      state.loggedInUserData = payload;
    },
    setAllDriversData(state, payload) {
      state.allDriversData = payload;
    },
    setAllRatingsData(state, payload) {
      state.allRatingsData = payload;
    },
    setAllRidesData(state, payload) {
      state.allRidesData = payload;
    },
    setAllUsersData(state, payload) {
      state.allUsersData = payload;
    },
    setAllTexts(state, payload) {
      state.allTexts = payload;
    },
    savePresentDriverData(state, payload) {
      state.presentDriverData = payload;
    },
    setActiveRideRequest(state, payload) {
      state.activeRide = payload;
    },
    setCurrentRideForDriver(state, payload) {
      state.currentRideDriver = payload;
    }
  },
  actions: {
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(function() {
          commit("setUser", null);
          commit("setloggedInUserData", null);
          router.push({ path: "/" });
        })
        .catch(error => {
          window.alert(error.message);
        });
    },
    signIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(details => {
          console.log(details);
          commit("setUser", details.user.uid);
          firebase
            .database()
            .ref("Users/" + details.user.uid)
            .on(
              "value",
              snap => {
                commit("setloggedInUserData", snap.val());
              },
              function(error) {
                console.log("Error: " + error.message);
              }
            );
          router.push({ path: "/" });
        })
        .catch(error => {
          window.alert(error.message);
        });
    },
    AuthChange({ commit }) {
      firebase.auth().onAuthStateChanged(details => {
        if (details) {
          commit("setUser", details.uid);
          firebase
            .database()
            .ref("Users/" + details.uid)
            .on(
              "value",
              snap => {
                commit("setloggedInUserData", snap.val());
              },
              function(error) {
                console.log("Error: " + error.message);
              }
            );
        } else {
          commit("setUser", null);
        }
      });
    },
    signUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(details => {
          commit("setUser", details.user.uid);
          router.push({ path: "/" });
          firebase
            .database()
            .ref("/Users/" + details.user.uid)
            .set({
              Name: payload.nume,
              Surname: payload.prenume,
              Locality: payload.localitate,
              // BirthDate: payload.datana,
              Email: payload.email,
              Collaborations: "",
              Admin: false,
              GDPR: false,
              phone: payload.phone
            });
        })
        .catch(error => {
          window.alert(error);
        });
    },
    readDriverDataByDriverID({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload)
        .on("value", snap => {
          commit("setDriverData", snap.val());
        });
    },
    readUserDataByUserID({ commit }, payload) {
      firebase
        .database()
        .ref("/Users/" + payload)
        .on("value", snap => {
          commit("setUserData", snap.val());
        });
    },
    readAllDriversDetails({ commit }) {
      firebase
        .database()
        .ref("/Drivers/")
        .on("value", snap => {
          let data = [];
          let keys = Object.keys(snap.val());
          keys.forEach(item => {
            data.push(snap.val()[item]);
          });
          commit("setAllDriversData", data);
        });
    },
    readAllRatingsDetails({ commit }) {
      firebase
        .database()
        .ref("/Rating/")
        .on("value", snap => {
          commit("setAllRatingsData", snap.val());
        });
    },
    readAllRidesDetails({ commit }) {
      firebase
        .database()
        .ref("/Rides/")
        .on("value", snap => {
          const myObj = snap.val();
          var rides = [];
          console.log(snap.val());
          const keysRides = Object.keys(snap.val());
          keysRides.forEach(key => {
            const ride = myObj[key];
            rides.push(ride);
          });
          console.log(rides);
          commit("setAllRidesData", rides);
        });
    },
    activeRideRequest({ commit }, payload) {
      if (payload) {
        firebase
          .database()
          .ref("/Rides/" + payload)
          .on("value", snap => {
            commit("setActiveRideRequest", snap.val());
          });
      } else {
        commit("setActiveRideRequest", null);
      }
    },
    acceptRide({ commit }, payload) {
      console.log(payload.ride);
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "driver on route",
          idDriver: payload.idDriver
        })
        .then(() => {
          firebase
            .database()
            .ref("/Rides/" + payload.ride.rideId)
            .on("value", snap => {
              const values = snap.val();
              values.rideId = snap.key;
              commit("setCurrentRideForDriver", values);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },

    driverArrived({ commit }, payload) {
      console.log(payload.ride);
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "driver arrived"
        })
        .then(() => {
          firebase
            .database()
            .ref("/Rides/" + payload.ride.rideId)
            .on("value", snap => {
              commit("setCurrentRideForDriver", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    finishRide({ commit }, payload) {
      console.log(payload.ride);
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "ride finished"
        })
        .then(() => {
          firebase
            .database()
            .ref("/Rides/" + payload.ride.rideId)
            .on("value", snap => {
              commit("setCurrentRideForDriver", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    readAllUsersDetails({ commit }) {
      firebase
        .database()
        .ref("/Users/")
        .on("value", snap => {
          commit("setAllUsersData", snap.val());
        });
    },
    readAllTexts({ commit }) {
      firebase
        .database()
        .ref("/Texts/")
        .on("value", snap => {
          commit("setAllTexts", snap.val());
        });
    },
    readDriverDetailsByUserID({ commit }, payload) {
      firebase
        .database()
        .ref("/Users/" + payload)
        .on("value", snap => {
          firebase
            .database()
            .ref("/Drivers/" + snap.val()["idDriver"])
            .on("value", snap => {
              commit("savePresentDriverData", snap.val());
            });
        });
    }
  },
  getters: {
    driverDataGetter: state => state.driverData,
    userDataGetter: state => state.userData,
    allDriversDataGetter: state => state.allDriversData,
    allRatingsDataGetter: state => state.allRatingsData,
    allRidesDataGetter: state => state.allRidesData,
    allUsersDataGetter: state => state.allUsersData,
    allTextsGetter: state => state.allTexts,
    presentDriverDataGetter: state => state.presentDriverData,
    user: state => state.user,
    loggedInUserData: state => state.loggedInUserData,
    activeRideRequest: state => state.activeRide,
    currentRideDriverGetter: state => state.currentRideDriver
  }
});
