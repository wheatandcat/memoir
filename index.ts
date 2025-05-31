/**
 * アプリのエントリーポイント
 * Storybook と expo-router を環境変数で切り替える
 */

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
  // Storybook を起動
  require("./.storybook");
} else {
  // 通常アプリ（expo-router）
  require("expo-router/entry");
}
