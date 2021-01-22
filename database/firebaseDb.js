import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDfynI5InLna2BWU61LkZo-P-7jsy_L52U",
    authDomain: "notes-ips-c681a.firebaseapp.com",
    databaseURL: "https://notes-ips-c681a.firebaseio.com",
    projectId: "notes-ips-c681a",
    storageBucket: "notes-ips-c681a.appspot.com",
    messagingSenderId: "775560270522",
    appId: "1:000000000000000:web:000000000000000"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;