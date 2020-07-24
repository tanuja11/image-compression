import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6jSsJOl1LZtr7ZEbqslc_c3310x8Rnb4",
    authDomain: "iitsshop.firebaseapp.com",
    databaseURL: "https://iitsshop.firebaseio.com",
    projectId: "iitsshop",
    storageBucket: "iitsshop.appspot.com",
    messagingSenderId: "106319932325",
    appId: "1:106319932325:web:0445a3563a53882186564c",
    measurementId: "G-1SBTQW1DSG"
  };

  //firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage();
  export { storage, firebase as default };
