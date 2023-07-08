import Constants from 'expo-constants';

export const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIRE_BASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIRE_BASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.FIRE_BASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIRE_BASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIRE_BASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.FIRE_BASE_MEASUREMENT_ID,
};
