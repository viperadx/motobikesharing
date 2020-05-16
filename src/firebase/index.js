/* eslint-disable no-console */
import * as firebase from "firebase";
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBS-6ewLr8i9EX5F1t4g88NWaJDOSru7vE",
  authDomain: "motobikesharing.firebaseapp.com",
  databaseURL: "https://motobikesharing.firebaseio.com",
  projectId: "motobikesharing",
  storageBucket: "motobikesharing.appspot.com",
  messagingSenderId: "468751017668",
  appId: "1:468751017668:web:dd5da87ea8efa0e9098b91",
  measurementId: "G-0XV26KFTBF"
};

export default firebase.initializeApp(firebaseConfig);
