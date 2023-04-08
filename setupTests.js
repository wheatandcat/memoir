// see https://airbnb.io/enzyme/docs/guides/react-native.html#example-configuration-for-jest

import 'react-native';
import 'react-native-gesture-handler/jestSetup';
import { server } from 'mocks/server';

beforeAll(() => {
  jest.useFakeTimers();
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  jest.useRealTimers();
});

jest.mock('expo-notifications', () => ({
  ...jest.requireActual('expo-notifications'),
  getAllScheduledNotificationsAsync: () => [],
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  loadAsync: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('hooks/useSentryBreadcrumb', () => jest.fn());

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      ...actualNav.useNavigation().navigation,
      addListener: jest.fn(),
      removeEventListener: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      name: 'test',
    }),
    useFocusEffect: jest.fn(),
    useIsFocused: jest.fn(),
  };
});

jest.mock('lib/firebase', () => {
  return {
    getFirestoreApp: jest.fn(),
    getFirebaseStorageApp: jest.fn(),
    getFirebaseAuthApp: jest.fn(),
  };
});
