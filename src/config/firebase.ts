import Constants from 'expo-constants';

export const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.FIRE_BASE_API_KEY,
  authDomain: Constants.manifest?.extra?.FIRE_BASE_AUTH_DOMAIN,
  projectId: Constants.manifest?.extra?.FIRE_BASE_PROJECT_ID,
  storageBucket: Constants.manifest?.extra?.FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest?.extra?.FIRE_BASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest?.extra?.FIRE_BASE_APP_ID,
  measurementId: Constants.manifest?.extra?.FIRE_BASE_MEASUREMENT_ID,
};
