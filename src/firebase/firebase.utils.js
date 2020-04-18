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

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef; 
    
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
