import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'config/firebase';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getFirestoreApp = () => {
  return db;
};

const storage = getStorage(app);

export const getFirebaseStorageApp = () => {
  return storage;
};

const auth = getAuth(app);

export const getFirebaseAuthApp = () => {
  return auth;
};
