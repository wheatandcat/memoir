// see https://airbnb.io/enzyme/docs/guides/react-native.html#example-configuration-for-jest

import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import 'react-native-gesture-handler/jestSetup';
import { server } from 'mocks/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigation: jest.fn(),
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
