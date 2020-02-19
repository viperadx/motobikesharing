/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import firebase from "@/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    driverData: null,
    userData: null,
    allDriversData: [],
    allRatingsData: [],
    allRidesData: [],
    allUsersData: [],
    allTexts: null,
    presentDriverData: null
  },
  mutations: {
    setDriverData(state, payload) {
      state.driverData = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
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
    }
  },
  actions: {
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
          commit("setAllRidesData", snap.val());
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
    presentDriverDataGetter: state => state.presentDriverData
  }
});
