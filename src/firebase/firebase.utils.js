import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCtKww2UDtvYpNrYdEHqk4WWYqrRKFNM0M",
    authDomain: "crwn-db-c6225.firebaseapp.com",
    databaseURL: "https://crwn-db-c6225.firebaseio.com",
    projectId: "crwn-db-c6225",
    storageBucket: "crwn-db-c6225.appspot.com",
    messagingSenderId: "315787023106",
    appId: "1:315787023106:web:b7abff4dfbc43b9856281b",
    measurementId: "G-827JSHL4PM"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
