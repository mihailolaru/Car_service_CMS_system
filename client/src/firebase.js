/** The code was refactored according to the new firebase compact style: <https://firebase.google.com/docs/web/modular-upgrade> */
//import * as firebase from "firebase";

import { initializeApp } from "firebase/app";
import { getAuth, /*GoogleAuthProvider*/ } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIRE_BASE_DB_URL,
    projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
    measurementId: process.env.REACT_APP_FIRE_BASE_MEASUREMENT_ID,
    region: "europe-west1"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

// export
export const auth = getAuth( firebaseApp );
//export const auth = firebase.auth();
//export const googleAuthProvider = new GoogleAuthProvider();
