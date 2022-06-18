//import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { getAuth, updatePassword, sendEmailVerification } from "firebase/auth";
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAAJapfXKCM6x5YLGmaqMBJA2gcojId4Cg",
    authDomain: "pleb-solver.firebaseapp.com",
    databaseURL: "https://pleb-solver.firebaseio.com",
    projectId: "pleb-solver",
    storageBucket: "pleb-solver.appspot.com",
    messagingSenderId: "497971511058",
    appId: "1:497971511058:web:9f840bc50690009d74bdcb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth ,storage,updatePassword,getAuth, sendEmailVerification}