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

  export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const collectionRef = firestore.collection(collectionKey);
  
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
  
    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
  
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
  
    //console.log(transformedCollection);
     return transformedCollection.reduce((accumulator, collection) => {
       accumulator[collection.title.toLowerCase()] = collection;
       return accumulator;
     }, {});
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;
