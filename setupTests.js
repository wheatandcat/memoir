import "react-native";
import "react-native-gesture-handler/jestSetup";
import { server } from "@/mocks/server";

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

jest.mock("expo-notifications", () => ({
  ...jest.requireActual("expo-notifications"),
  getAllScheduledNotificationsAsync: () => [],
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("expo-font", () => ({
  ...jest.requireActual("expo-font"),
  loadAsync: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("@/hooks/useSentryBreadcrumb", () => jest.fn());

jest.mock("react-native/Libraries/Linking/Linking", () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({ children }) => children(inset)),
    SafeAreaView: jest.fn().mockImplementation(({ children }) => children),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      ...actualNav.useNavigation().navigation,
      addListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      setOptions: jest.fn(),
    }),

    useRoute: () => ({
      name: "test",
    }),
    useIsFocused: jest.fn(),
  };
});

jest.mock("expo-router", () => {
  const actualRouter = jest.requireActual("expo-router");
  return {
    ...actualRouter,
    useFocusEffect: jest.fn(),
  };
});

jest.mock("expo-linking", () => ({
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
  makeUrl: jest.fn(),
}));

jest.mock("@/lib/firebase", () => {
  return {
    getFirestoreApp: jest.fn(),
    getFirebaseStorageApp: jest.fn(),
    getFirebaseAuthApp: jest.fn(),
  };
});
jest.mock("firebase/storage", () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
  deleteObject: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: () => "MaterialIcons",
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

jest.mock("@/assets/img/common/frame.png");
jest.mock("@/assets/img/common/intro_01.png");
jest.mock("@/assets/img/common/intro_02.png");
jest.mock("@/assets/img/common/intro_03.png");
jest.mock("@/assets/img/common/intro_04.png");
