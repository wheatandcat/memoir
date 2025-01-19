import { Alert } from "react-native";

export const mockFn = (msg?: string) => (): any => {
  Alert.alert(msg ?? "テスト");
};
