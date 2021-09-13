import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD-bRjwAgdFP-pkDutiq7fGQzABPzexmJw",
    authDomain: "spotify-clone-57c28.firebaseapp.com",
    projectId: "spotify-clone-57c28",
    storageBucket: "spotify-clone-57c28.appspot.com",
    messagingSenderId: "332499013536",
    appId: "1:332499013536:web:f1038791a396b539311ec5",
    measurementId: "G-YVHTZPZ8E2"
  };
  const firebase = Firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

export { firebase, db };