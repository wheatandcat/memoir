import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'config/firebase';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

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
