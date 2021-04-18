import * as firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCuBkivp73HSKTZNGJTqwfaoTbVjnxwOlE",
    authDomain: "info-hub-15aed.firebaseapp.com",
    databaseURL: "https://info-hub-15aed-default-rtdb.firebaseio.com",
    projectId: "info-hub-15aed",
    storageBucket: "info-hub-15aed.appspot.com",
    messagingSenderId: "31761258958",
    appId: "1:31761258958:web:c2a9f481862abccc74339f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();