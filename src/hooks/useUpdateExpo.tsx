import { useCallback } from 'react';
import { Alert } from 'react-native';
import * as Updates from 'expo-updates';
import { getItem, setItem, storageKey } from 'lib/storage';

const dialog = () => {
  Alert.alert(
    '最新版が利用可能です',
    'アプリを再起動して今すぐ更新しますか?',
    [
      {
        text: 'このバージョンはスキップ',
        onPress: async () => {
          await setItem(storageKey.UPDATES_SKIPPED_KEY, 'true');
        },
        style: 'cancel',
      },
      {
        text: 'はい',
        onPress: () => {
          Updates.reloadAsync();
        },
      },
      { text: 'いいえ', onPress: () => {}, style: 'cancel' },
    ],
    { cancelable: false }
  );
};

const useUpdateExpo = () => {
  const onUpdateApp = useCallback(async () => {
    const update = await Updates.checkForUpdateAsync();
    if (!update.isAvailable) {
      return;
    }
    const cachedReleaseId = await getItem(storageKey.UPDATES_RELEASE_KEY);
    const hasSkipped = await getItem(storageKey.UPDATES_SKIPPED_KEY);

    if (update?.manifest?.id === cachedReleaseId) {
      //最新のものがキャッシュされているとき
      if (hasSkipped === 'true') {
        return; //前回「このバージョンをスキップ」を押したときはここに来る。何もせずに終了。
      } else {
        dialog();
      }
      Updates.reloadAsync();
    } else {
      //最新のものがキャッシュされていないとき
      await Updates.fetchUpdateAsync();
      if (update?.manifest?.id) {
        await setItem(
          storageKey.UPDATES_RELEASE_KEY,
          update?.manifest?.id || ''
        );
        await setItem(storageKey.UPDATES_SKIPPED_KEY, 'false');
      }
    }
  }, []);

  return {
    onUpdateApp,
  };
};

export default useUpdateExpo;
