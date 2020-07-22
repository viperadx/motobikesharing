/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import router from "@/router";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    driverData: null,
    ticketData: null,
    userData: null,
    loggedInUserData: null,
    allDriversData: [],
    allRatingsData: [],
    allRidesData: [],
    allTicketsData: [],
    allUsersData: [],
    allTexts: null,
    user: null,
    ticketID: null,
    error: null,
    loading: false,
    presentDriverData: null,
    activeRide: null,
    currentRideDriver: null,
    currentRideClient: null,
    currentDriverRidesHistory: [],
    currentUserRidesHistory: []
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    },
    setSupportTicketID: (state, payload) => {
      state.ticketID = payload;
    },
    setError(state, payload) {
      state.error = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setDriverData(state, payload) {
      state.driverData = payload;
    },
    setTicketData(state, payload) {
      state.ticketData = payload;
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
    setAllTicketsData(state, payload) {
      state.allTicketsData = payload;
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
    },
    setCurrentRideForClient(state, payload) {
      state.currentRideClient = payload;
    },
    setRidesHistoryForDriver(state, payload) {
      state.currentDriverRidesHistory = payload;
    },
    setRidesHistoryForUser(state, payload) {
      state.currentUserRidesHistory = payload;
    }
  },
  actions: {
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(function () {
          commit("setUser", null);
          commit("setloggedInUserData", null);
          router.push({ path: "/" });
          window.location.reload();
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
          commit("setUser", details.user.uid);
          commit('setLoading', false);
          commit('setError', null);
          this.dispatch("readAllRidesDetailsByDriverID", details.user.uid);
          this.dispatch("readAllRidesDetailsByUserID", details.user.uid);
          firebase
            .database()
            .ref("/Users/" + details.user.uid)
            .on(
              "value",
              snap => {
                commit("setloggedInUserData", snap.val());
              },
              function (error) {
                console.log("Error: " + error.message);
              }
            )
          firebase
            .database()
            .ref("/Drivers/" + details.user.uid)
            .on(
              "value",
              snap => {
                commit("savePresentDriverData", snap.val());
              },
              function (error) {
                console.log("Error: " + error.message);
              }
            );

          // router.push({ path: "/home" });
        })
        .catch(error => {
          window.alert(error.message);
          commit('setError', error.message)
          commit('setLoading', false)
        });
    },
    AuthChange({ commit }) {
      firebase.auth().onAuthStateChanged(details => {
        if (details) {
          commit("setUser", details.uid);
          this.dispatch("readAllRidesDetailsByDriverID", details.uid);
          this.dispatch("readAllRidesDetailsByUserID", details.uid);
          router.push("/account");
          firebase
            .database()
            .ref("Users/" + details.uid)
            .on(
              "value",
              snap => {
                commit("setloggedInUserData", snap.val());
              },
              function (error) {
                console.log("Error: " + error.message);
              }
            );
        } else {
          commit("setUser", null);
        }
      });
    },
    signUpClient({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(details => {
          commit("setUser", details.user.uid);
          this.dispatch("readAllRidesDetailsByDriverID", details.user.uid);
          this.dispatch("readAllRidesDetailsByUserID", details.user.uid);
          firebase
            .database()
            .ref("/Users/" + details.user.uid)
            .set({
              lastName: payload.lastname,
              firstName: payload.firstname,
              location: payload.location,
              birthDate: payload.bday,
              email: payload.email,
              admin: false,
              phone: payload.phone,
              creditCard: payload.creditcard,
              gender: payload.gender
            });
        })
        .catch(error => {
          window.alert(error);
          commit('setError', error.message);
          commit('setLoading', false);
        });
    },
    signUpDriver({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(details => {
          commit("setUser", details.user.uid);
          this.dispatch("readAllRidesDetailsByDriverID", details.user.uid);
          this.dispatch("readAllRidesDetailsByUserID", details.user.uid);
          let day = new Date();
          let dayWrapper = moment(day);
          let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
          firebase
            .database()
            .ref("/Users/" + details.user.uid)
            .set({
              lastName: payload.lastname,
              firstName: payload.firstname,
              location: payload.location,
              birthDate: payload.bday,
              email: payload.email,
              admin: false,
              phone: payload.phone,
              creditCard: payload.creditcard,
              gender: payload.gender,
              expireDateID: null,
              expireDateITP: null,
              expireDateInsurance: null,
              expireDateLicense: null,
              expireDateRCA: null,
              idDriver: details.user.uid
            });
          firebase
            .database()
            .ref("/Drivers/" + details.user.uid)
            .set({
              expireDateID: payload.expiredateid,
              expireDateITP: payload.expiredateitp,
              expireDateInsurance: payload.expiredateinsurance,
              expireDateLicense: payload.expiredatelicense,
              expireDateRCA: payload.expiredaterca,
              idUser: details.user.uid,
              driverIsConnected: "false",
              checkStatus: "pending",
              createdDate: fullString,
              totalPaymentsMade: 0,
            });
          let newDirectory = details.user.uid
          let fileNameSelfie = "Selfie" + payload.imageSelfie.name.slice(payload.imageSelfie.name.lastIndexOf('.'))
          let fileNameID = "ID" + payload.imageID.name.slice(payload.imageID.name.lastIndexOf('.'))
          let fileNameITP = "ITP" + payload.imageITP.name.slice(payload.imageITP.name.lastIndexOf('.'))
          let fileNameRCA = "RCA" + payload.imageRCA.name.slice(payload.imageRCA.name.lastIndexOf('.'))
          let fileNameInsurance = "Insurance" + payload.imageInsurance.name.slice(payload.imageInsurance.name.lastIndexOf('.'))
          let fileNameLicense = "License" + payload.imageLicense.name.slice(payload.imageLicense.name.lastIndexOf('.'))
          let fullPathSelfie = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameSelfie}`).put(payload.imageSelfie)
          let fullPathID = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameID}`).put(payload.imageID)
          let fullPathITP = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameITP}`).put(payload.imageITP)
          let fullPathRCA = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameRCA}`).put(payload.imageRCA)
          let fullPathInsurance = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameInsurance}`).put(payload.imageInsurance)
          let fullPathLicense = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameLicense}`).put(payload.imageLicense)
          fullPathSelfie.on('state_changed', snapshot => {
            let percentageSelfie = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueSelfie = percentageSelfie;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueSelfie = 100;
              fullPathSelfie.snapshot.ref.getDownloadURL().then((downloadURLSelfie) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageSelfieURL: downloadURLSelfie
                  })
              })
            }
          );
          fullPathID.on('state_changed', snapshot => {
            let percentageID = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueID = percentageID;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueID = 100;
              fullPathID.snapshot.ref.getDownloadURL().then((downloadURLID) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageIDURL: downloadURLID
                  })
              })
            });
          fullPathITP.on('state_changed', snapshot => {
            let percentageITP = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueITP = percentageITP;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueITP = 100;
              fullPathITP.snapshot.ref.getDownloadURL().then((downloadURLITP) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageITPURL: downloadURLITP
                  })
              })
            });
          fullPathRCA.on('state_changed', snapshot => {
            let percentageRCA = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueRCA = percentageRCA;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueRCA = 100;
              fullPathRCA.snapshot.ref.getDownloadURL().then((downloadURLRCA) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageRCAURL: downloadURLRCA
                  })
              })
            });
          fullPathInsurance.on('state_changed', snapshot => {
            let percentageInsurance = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueInsurance = percentageInsurance;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueInsurance = 100;
              fullPathInsurance.snapshot.ref.getDownloadURL().then((downloadURLInsurance) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageInsuranceURL: downloadURLInsurance
                  })
              })
            });
          fullPathLicense.on('state_changed', snapshot => {
            let percentageLicense = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueLicense = percentageLicense;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueLicense = 100;
              fullPathLicense.snapshot.ref.getDownloadURL().then((downloadURLLicense) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageLicenseURL: downloadURLLicense
                  })
              })
            });
        })
        .catch(error => {
          window.alert(error);
        });
      router.push({ path: "/account" });
    },
    supportRequest({ commit }, payload) {
      let day = new Date();
      let dayWrapper = moment(day);
      let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
      let supportFileName = "(" + fullString + ")" + " " + payload.filenameSupport;
      let ticketID;
      firebase
        .database()
        .ref("Tickets/")
        .push(payload)
        .then((res) => {
          ticketID = res.key;
          commit("setSupportTicketID", res.key);
          firebase
            .database()
            .ref("Tickets/" + ticketID)
            .update({
              ticketID: res.key,
              createdDate: fullString
            });
        })
        .catch((error) => {
          console.log(error);
        });
      //TODO tre sa gasesc cum sa schimb numele folderului din Tickets in id ul generat
      if (payload.supportFile) {
        let fullPathSupportFile = firebase
          .storage()
          .ref(`Tickets/${payload.userID}/${supportFileName}`)
          .put(payload.supportFile);
        fullPathSupportFile.on(
          "state_changed",
          (snapshot) => {
            let percentageSupportFile =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueSupportFile = percentageSupportFile;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValueSupportFile = 100;
            fullPathSupportFile.snapshot.ref
              .getDownloadURL()
              .then((downloadURLSupportFile) => {
                firebase
                  .database()
                  .ref("/Tickets/" + ticketID)
                  .update({
                    supportFileURL: downloadURLSupportFile,
                  });
              });
          }
        )
      }
      window.alert("Your request has been submitted.");
      router.push({ path: "account" });
    },
    becomeDriver({ commit }, payload) {
      commit("setUser", payload.userID);
      this.dispatch("readAllRidesDetailsByDriverID", payload.userID);
      this.dispatch("readAllRidesDetailsByUserID", payload.userID);
      let day = new Date();
      let dayWrapper = moment(day);
      let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
      firebase
        .database()
        .ref("/Users/" + payload.userID)
        .update({ idDriver: payload.userID })
        .then(() => {
          firebase
            .database()
            .ref("/Drivers/" + payload.userID)
            .set({
              expireDateID: payload.expiredateid,
              expireDateITP: payload.expiredateitp,
              expireDateInsurance: payload.expiredateinsurance,
              expireDateLicense: payload.expiredatelicense,
              expireDateRCA: payload.expiredaterca,
              idUser: payload.userID,
              driverIsConnected: "false",
              checkStatus: "pending",
              createdDate: fullString,
              totalPaymentsMade: 0,
            });
          let newDirectory = payload.userID
          let fileNameSelfie = "Selfie" + payload.imageSelfie.name.slice(payload.imageSelfie.name.lastIndexOf('.'))
          let fileNameID = "ID" + payload.imageID.name.slice(payload.imageID.name.lastIndexOf('.'))
          let fileNameITP = "ITP" + payload.imageITP.name.slice(payload.imageITP.name.lastIndexOf('.'))
          let fileNameRCA = "RCA" + payload.imageRCA.name.slice(payload.imageRCA.name.lastIndexOf('.'))
          let fileNameInsurance = "Insurance" + payload.imageInsurance.name.slice(payload.imageInsurance.name.lastIndexOf('.'))
          let fileNameLicense = "License" + payload.imageLicense.name.slice(payload.imageLicense.name.lastIndexOf('.'))
          let fullPathSelfie = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameSelfie}`).put(payload.imageSelfie)
          let fullPathID = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameID}`).put(payload.imageID)
          let fullPathITP = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameITP}`).put(payload.imageITP)
          let fullPathRCA = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameRCA}`).put(payload.imageRCA)
          let fullPathInsurance = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameInsurance}`).put(payload.imageInsurance)
          let fullPathLicense = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameLicense}`).put(payload.imageLicense)
          fullPathSelfie.on('state_changed', snapshot => {
            let percentageSelfie = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueSelfie = percentageSelfie;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueSelfie = 100;
              fullPathSelfie.snapshot.ref.getDownloadURL().then((downloadURLSelfie) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageSelfieURL: downloadURLSelfie
                  })
              })
            }
          );
          fullPathID.on('state_changed', snapshot => {
            let percentageID = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueID = percentageID;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueID = 100;
              fullPathID.snapshot.ref.getDownloadURL().then((downloadURLID) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageIDURL: downloadURLID
                  })
              })
            });
          fullPathITP.on('state_changed', snapshot => {
            let percentageITP = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueITP = percentageITP;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueITP = 100;
              fullPathITP.snapshot.ref.getDownloadURL().then((downloadURLITP) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageITPURL: downloadURLITP
                  })
              })
            });
          fullPathRCA.on('state_changed', snapshot => {
            let percentageRCA = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueRCA = percentageRCA;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueRCA = 100;
              fullPathRCA.snapshot.ref.getDownloadURL().then((downloadURLRCA) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageRCAURL: downloadURLRCA
                  })
              })
            });
          fullPathInsurance.on('state_changed', snapshot => {
            let percentageInsurance = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueInsurance = percentageInsurance;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueInsurance = 100;
              fullPathInsurance.snapshot.ref.getDownloadURL().then((downloadURLInsurance) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageInsuranceURL: downloadURLInsurance
                  })
              })
            });
          fullPathLicense.on('state_changed', snapshot => {
            let percentageLicense = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueLicense = percentageLicense;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueLicense = 100;
              fullPathLicense.snapshot.ref.getDownloadURL().then((downloadURLLicense) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageLicenseURL: downloadURLLicense
                  })
              })
            });
        })
        .catch(error => {
          window.alert(error);
        });
      router.push({ path: "/account" });
    },
    readDriverDataByDriverID({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload)
        .on("value", snap => {
          commit("setDriverData", snap.val());
        });
    },
    readTicketDataByTicketID({ commit }, payload) {
      firebase
        .database()
        .ref("/Tickets/" + payload)
        .on("value", snap => {
          commit("setTicketData", snap.val());
        });
    },
    updateCheckStatus({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload.userID)
        .update({
          checkStatus: payload.checkStatus
        })
        .then
      firebase
        .database()
        .ref("/Drivers/" + payload.userID)
        .on("value", snap => {
          commit("setDriverData", snap.val());
        });
      router.push({ path: "/admin" });
    },
    updateTicketStatus({ commit }, payload) {
      firebase
        .database()
        .ref("/Tickets/" + payload.ticketID)
        .update({
          ticketStatus: payload.ticketStatus
        })
        .then
      firebase
        .database()
        .ref("/Tickets/" + payload.ticketID)
        .on("value", snap => {
          commit("setTicketData", snap.val());
        });
      router.push({ path: "/admin" });
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
    readAllTicketsDetails({ commit }) {
      firebase
        .database()
        .ref("/Tickets/")
        .on("value", snap => {
          let data = [];
          let keys = Object.keys(snap.val());
          keys.forEach(item => {
            data.push(snap.val()[item]);
          });
          commit("setAllTicketsData", data);
        });
    },
    readAllRidesDetails({ commit }) {
      firebase
        .database()
        .ref("/Rides/")
        .on("value", snap => {
          const myObj = snap.val();
          var rides = [];
          const keysRides = Object.keys(snap.val());
          keysRides.forEach(key => {
            const ride = myObj[key];
            rides.push(ride);
          });
          commit("setAllRidesData", rides);
        });
    },
    readAllRidesDetailsByDriverID({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/")
        .on("value", snap => {
          const myObj = snap.val();
          var rides = [];
          const keysRides = Object.keys(snap.val());
          keysRides.forEach(key => {
            if (myObj[key].idDriver === payload) {
              rides.push(myObj[key]);
            }
          });
          commit("setRidesHistoryForDriver", rides);
        });
    },
    readAllRidesDetailsByUserID({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/")
        .on("value", snap => {
          const myObj = snap.val();
          var rides = [];
          const keysRides = Object.keys(snap.val());
          keysRides.forEach(key => {
            if (myObj[key].clientId === payload) {
              rides.push(myObj[key]);
            }
          });
          commit("setRidesHistoryForUser", rides);
        });
    },
    activeRideRequest({ commit }, payload) {
      if (payload) {
        firebase
          .database()
          .ref("/Rides/" + payload)
          .on("value", snap => {
            commit("setActiveRideRequest", snap.val());
            const values = snap.val();
            values.rideId = snap.key;
            commit("setCurrentRideForClient", values);
          });
      } else {
        commit("setActiveRideRequest", null);
      }
    },

    acceptRide({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "driver on route",
          idDriver: payload.idDriver,
          driverFullName: payload.driverFullName,
          phoneDriver: payload.phoneDriver
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
    cancelRideClient({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "ride cancelled by client"
        })
        .then(() => {
          firebase
            .database()
            .ref("/Rides/" + payload.ride.rideId)
            .on("value", snap => {
              commit("setCurrentRideForClient", snap.val());
            });
          commit("setCurrentRideForClient", null);
          commit("setActiveRideRequest", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    driverDidntShow({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "driver didn't show"
        })
        .then(() => {
          firebase
            .database()
            .ref("/Drivers/" + payload.ride.idDriver)
            .update({
              driverIsConnected: "false",
              pageRefresh: "yes",
            });
          commit("setCurrentRideForClient", null);
          commit("setCurrentRideForDriver", null);
          commit("setActiveRideRequest", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancelRideDriver({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "client didnt show"
        })
        .then(() => {
          firebase
            .database()
            .ref("/Rides/" + payload.ride.rideId)
            .on("value", snap => {
              commit("setCurrentRideForDriver", snap.val());
            });
          commit("setCurrentRideForDriver", null);
          commit("setCurrentRideForClient", null);
        })
        .catch(err => {
          console.log(err);
        });
    },
    driverArrived({ commit }, payload) {
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
    updateAccountDetails({ commit }, payload) {
      firebase
        .database()
        .ref("/Users/" + payload.userID)
        .update({
          lastName: payload.lastName,
          firstName: payload.firstName,
          location: payload.location,
          phone: payload.phone,
        })
        .then(() => {
          firebase
            .database()
            .ref("/Users/" + payload.userID)
            .on("value", snap => {
              commit("setloggedInUserData", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateBankDetails({ commit }, payload) {
      firebase
        .database()
        .ref("/Users/" + payload.userID)
        .update({
          creditCard: payload.creditCard,
        })
        .then(() => {
          firebase
            .database()
            .ref("/Users/" + payload.userID)
            .on("value", snap => {
              commit("setloggedInUserData", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateIDDetails({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload.userID)
        .update({
          expireDateID: payload.expireDateID,
        })
        .then(() => {
          let day = new Date();
          let dayWrapper = moment(day);
          let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
          let newDirectory = payload.userID
          let fileNameID = "ID" + payload.imageID.name.slice(payload.imageID.name.lastIndexOf('.'))
          let fullPathID = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameID}`).put(payload.imageID)
          fullPathID.on('state_changed', snapshot => {
            let percentageID = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueID = percentageID;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueID = 100;
              fullPathID.snapshot.ref.getDownloadURL().then((downloadURLID) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageIDURL: downloadURLID
                  })
              })
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("/Drivers/" + payload.userID)
            .on("value", snap => {
              commit("savePresentDriverData", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateITPDetails({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload.userID)
        .update({
          expireDateITP: payload.expireDateITP,
        })
        .then(() => {
          let day = new Date();
          let dayWrapper = moment(day);
          let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
          let newDirectory = payload.userID
          let fileNameITP = "ITP" + payload.imageITP.name.slice(payload.imageITP.name.lastIndexOf('.'))
          let fullPathITP = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameITP}`).put(payload.imageITP)
          fullPathITP.on('state_changed', snapshot => {
            let percentageITP = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueITP = percentageITP;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueITP = 100;
              fullPathITP.snapshot.ref.getDownloadURL().then((downloadURLITP) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageITPURL: downloadURLITP
                  })
              })
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("/Drivers/" + payload.userID)
            .on("value", snap => {
              commit("savePresentDriverData", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateLicenseDetails({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload.userID)
        .update({
          expireDateLicense: payload.expireDateLicense,
        })
        .then(() => {
          let day = new Date();
          let dayWrapper = moment(day);
          let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
          let newDirectory = payload.userID
          let fileNameLicense = "License" + payload.imageLicense.name.slice(payload.imageLicense.name.lastIndexOf('.'))
          let fullPathLicense = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameLicense}`).put(payload.imageLicense)
          fullPathLicense.on('state_changed', snapshot => {
            let percentageLicense = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueLicense = percentageLicense;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueLicense = 100;
              fullPathLicense.snapshot.ref.getDownloadURL().then((downloadURLLicense) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageLicenseURL: downloadURLLicense
                  })
              })
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("/Drivers/" + payload.userID)
            .on("value", snap => {
              commit("savePresentDriverData", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateRCADetails({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload.userID)
        .update({
          expireDateRCA: payload.expireDateRCA,
        })
        .then(() => {
          let day = new Date();
          let dayWrapper = moment(day);
          let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
          let newDirectory = payload.userID
          let fileNameRCA = "RCA" + payload.imageRCA.name.slice(payload.imageRCA.name.lastIndexOf('.'))
          let fullPathRCA = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameRCA}`).put(payload.imageRCA)
          fullPathRCA.on('state_changed', snapshot => {
            let percentageRCA = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueRCA = percentageRCA;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueRCA = 100;
              fullPathRCA.snapshot.ref.getDownloadURL().then((downloadURLRCA) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageRCAURL: downloadURLRCA
                  })
              })
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("/Drivers/" + payload.userID)
            .on("value", snap => {
              commit("savePresentDriverData", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateInsuranceDetails({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload.userID)
        .update({
          expireDateInsurance: payload.expireDateInsurance,
        })
        .then(() => {
          let day = new Date();
          let dayWrapper = moment(day);
          let fullString = dayWrapper.format("YYYY-MM-DD HH:MM");
          let newDirectory = payload.userID
          let fileNameInsurance = "Insurance" + payload.imageInsurance.name.slice(payload.imageInsurance.name.lastIndexOf('.'))
          let fullPathInsurance = firebase.storage().ref(`Drivers/${newDirectory}/${fullString}/${fileNameInsurance}`).put(payload.imageInsurance)
          fullPathInsurance.on('state_changed', snapshot => {
            let percentageInsurance = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadValueInsurance = percentageInsurance;
          }, error => { console.log(error.message) },
            () => {
              this.uploadValueInsurance = 100;
              fullPathInsurance.snapshot.ref.getDownloadURL().then((downloadURLInsurance) => {
                firebase.database().ref("/Drivers/" + newDirectory)
                  .update({
                    imageInsuranceURL: downloadURLInsurance
                  })
              })
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("/Drivers/" + payload.userID)
            .on("value", snap => {
              commit("savePresentDriverData", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateVehicleDocuments({ commit }, payload) {
      firebase
        .database()
        .ref("/Drivers/" + payload.userID)
        .update({
          expireDateID: payload.expireDateID,
          expireDateITP: payload.expireDateITP,
          expireDateRCA: payload.expireDateRCA,
          expireDateLicense: payload.expireDateLicense,
          expireDateInsurance: payload.expireDateInsurance,
        })
        .then(() => {
          firebase
            .database()
            .ref("/Drivers/" + payload.userID)
            .on("value", snap => {
              commit("savePresentDriverData", snap.val());
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateAuthenticationDetails({ commit }, payload) {
      firebase
        .database()
        .ref("/Users/" + payload.userID)
      firebase.auth().signInWithEmailAndPassword(payload.oldEmail, payload.oldPassword).then(function () {
        if (payload.password !== null) {
          firebase.auth().currentUser.updatePassword(payload.password).then(function () {
            console.log("Parola a fost schimbată")
          }).catch(function (error) {
            console.log(error.message)
          })
        }
        if (payload.email !== null) {
          firebase.auth().currentUser.updateEmail(payload.email).then(function () {
            console.log('Emailul a fost schimbat')
          }).catch(function (error) {
            console.log(error.message)
          })
          firebase
            .database()
            .ref("/Users/" + payload.userID)
            .update({
              email: payload.email
            })
            .then(() => {
              firebase
                .database()
                .ref("/Users/" + payload.userID)
                .on("value", snap => {
                  commit("setloggedInUserData", snap.val());
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
    },
    ratingForClientPopup({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "client dropped at destination",
          ratingForClient: "waiting the driver to rate client"
        })
        .then(() => {
          firebase
            .database()
            .ref("/Rides/" + payload.ride.rideId)
            .on("value", snap => {
              commit("setCurrentRideForDriver", snap.val());
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("/UsersDestinationsHistory/" + payload.ride.clientId + "/" + payload.ride.rideId)
            .set({
              userFinishPoint: payload.ride.userFinishPoint,
              price: payload.ride.price,
              timeStampFull: payload.ride.timeStampFull,
              timeStampComplete: payload.ride.timeStampComplete,
              timeStampDay: payload.ride.timeStampDay,
              timeStampMonth: payload.ride.timeStampMonth,
              timeStampYear: payload.ride.timeStampYear,
              ratingForClient: "waiting the driver to rate client",
              timeStampYearMonth: payload.ride.timeStampYearMonth
            })
        })
        .then(() => {
          firebase
            .database()
            .ref("/DriversRidesHistory/" + payload.ride.idDriver + "/" + payload.ride.rideId)
            .set({
              userFinishPoint: payload.ride.userFinishPoint,
              earning: payload.ride.earningDriver,
              timeStampFull: payload.ride.timeStampFull,
              timeStampComplete: payload.ride.timeStampComplete,
              timeStampDay: payload.ride.timeStampDay,
              timeStampMonth: payload.ride.timeStampMonth,
              timeStampYear: payload.ride.timeStampYear,
              ratingForDriver: "no input at the moment",
              timeStampYearMonth: payload.ride.timeStampYearMonth
            })
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendRatingForDriver({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          ratingForDriver: payload.ratingForDriver
        })
        .then(() => {
          firebase
            .database()
            .ref("/DriversRidesHistory/" + payload.ride.idDriver + "/" + payload.ride.rideId)
            .update({
              ratingForDriver: payload.ratingForDriver
            })
            .then(() => {
              firebase
                .database()
                .ref("/Rides/" + payload.ride.rideId)
                .on("value", snap => {
                  commit("setCurrentRideForClient", snap.val());
                });
              commit("setCurrentRideForClient", null);
            })
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendRatingForDriverFromHistory({ commit }, payload) { //aici as putea sa pun dispatch in loc de commit sa mai scap de niste buguri
      firebase
        .database()
        .ref("/Rides/" + payload.id)
        .update({
          ratingForDriver: payload.ratingForDriver
        })
        .then(() => {
          firebase
            .database()
            .ref("/DriversRidesHistory/" + payload.idDriver + "/" + payload.id)
            .update({
              ratingForDriver: payload.ratingForDriver
            });
          commit("setCurrentRideForClient", null)
        })
        .catch(err => {
          console.log(err);
        });
    },

    finishRide({ commit }, payload) {
      firebase
        .database()
        .ref("/Rides/" + payload.ride.rideId)
        .update({
          status: "ride finished",
          ratingForClient: payload.ratingForClient
        })
        .then(() => {
          firebase
            .database()
            .ref("/UsersDestinationsHistory/" + payload.ride.clientId + "/" + payload.ride.rideId)
            .update({
              ratingForClient: payload.ratingForClient
            })
            .then(() => {
              firebase
                .database()
                .ref("/Rides/" + payload.ride.rideId)
                .on("value", snap => {
                  commit("setCurrentRideForDriver", snap.val());
                });
              commit("setCurrentRideForDriver", null);
            })
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
        .ref("/Drivers/" + payload)
        .on("value", snap => {
          commit("savePresentDriverData", snap.val());
        });

    }
  },
  getters: {
    driverDataGetter: state => state.driverData,
    ticketDataGetter: state => state.ticketData,
    userDataGetter: state => state.userData,
    allDriversDataGetter: state => state.allDriversData,
    ticketIDGetter: state => state.ticketID,
    allRatingsDataGetter: state => state.allRatingsData,
    allRidesDataGetter: state => state.allRidesData,
    allTicketsDataGetter: state => state.allTicketsData,
    allUsersDataGetter: state => state.allUsersData,
    allTextsGetter: state => state.allTexts,
    presentDriverDataGetter: state => state.presentDriverData,
    user: state => state.user,
    loggedInUserData: state => state.loggedInUserData,
    activeRideRequest: state => state.activeRide,
    currentRideDriverGetter: state => state.currentRideDriver,
    currentRideClientGetter: state => state.currentRideClient,
    currentDriverRidesHistoryGetter: state => state.currentDriverRidesHistory,
    currentUserRidesHistoryGetter: state => state.currentUserRidesHistory
  }
});
