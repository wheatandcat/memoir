import AsyncStorage from '@react-native-async-storage/async-storage';

// ログイン前のユーザーID
const USER_ID_KEY = 'USER_ID' as const;
// ログイン後のAuth UID
const AUTH_UID_KEY = 'AUTH_UID' as const;
// Auth id token
const AUTH_ID_TOKEN_KEY = 'AUTH_ID_TOKEN' as const;
// Auth id tokenの期限
const AUTH_ID_TOKEN_EXPIRATION_KEY = 'AUTH_ID_TOKEN_EXPIRATION' as const;
// 振り返りの設定
const MEMOIR_NOTIFICATION_KEY = 'MEMOIR_NOTIFICATION_KEY' as const;
// OTA updateのリリース
const UPDATES_RELEASE_KEY = 'RELEASE_KEY' as const;
// OTA updateのリリーススキップ
const UPDATES_SKIPPED_KEY = 'SKIPPED_KEY' as const;

export const storageKey = {
  USER_ID_KEY,
  AUTH_UID_KEY,
  AUTH_ID_TOKEN_KEY,
  AUTH_ID_TOKEN_EXPIRATION_KEY,
  MEMOIR_NOTIFICATION_KEY,
  UPDATES_RELEASE_KEY,
  UPDATES_SKIPPED_KEY,
} as const;

type StorageKey = typeof storageKey;
type StorageKeys = keyof StorageKey;
type StorageValues = StorageKey[StorageKeys];

export const getItem = async (key: StorageValues): Promise<string | null> => {
  try {
    const item = await AsyncStorage.getItem(key);

    return item;
  } catch {
    return null;
  }
};

export const setItem = async (
  key: StorageValues,
  data: string
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, data);

    return true;
  } catch {
    return false;
  }
};

export const removeItem = async (key: StorageValues): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch {
    return false;
  }
};
