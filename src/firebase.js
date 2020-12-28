import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyD-A5zNxSB7HG5M_vb4fASxp6DLoba7WIA",
        authDomain: "to-do-list-c966f.firebaseapp.com",
        databaseURL: "https://to-do-list-c966f.firebaseio.com",
        projectId: "to-do-list-c966f",
        storageBucket: "to-do-list-c966f.appspot.com",
        messagingSenderId: "755696964843",
        appId: "1:755696964843:web:8786278a60dc87b2905aae",
        measurementId: "G-RN8V6T4RDT"
   
});

const db = firebaseApp.firestore();

export default db;