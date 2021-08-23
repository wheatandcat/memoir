import firebase from 'lib/system/firebase';
import { firebaseConfig } from 'config/firebase';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const getFireStore = () => {
  return db;
};
