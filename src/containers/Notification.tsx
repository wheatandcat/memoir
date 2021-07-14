import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, {
  memo,
  useRef,
  useContext,
  useCallback,
  createContext,
} from 'react';
import { Platform, Alert } from 'react-native';
import {
  useCreatePushTokenMutation,
  CreatePushTokenMutationVariables,
} from 'queries/api/index';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

export type ContextProps = Partial<{
  onPermissionRequest: (callback: () => void) => Promise<boolean>;
}>;

type Props = {};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Notification: React.FC<Props> = memo((props) => {
  const requestCallback = useRef<() => void>(() => {});

  const [createPushTokenMutation] = useCreatePushTokenMutation({
    onCompleted() {
      requestCallback.current();
    },
  });

  const onPermissionRequest = useCallback(
    async (callback: () => void) => {
      requestCallback.current = callback;

      let token;

      if (!Constants.isDevice) {
        Alert.alert('端末から実行してくだださい');
        return false;
      }

      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return false;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const variables: CreatePushTokenMutationVariables = {
        input: {
          token,
          deviceID: `${(Device.modelName || '').split(' ').join('')}-${String(
            Device.osInternalBuildId || ''
          )
            .split(' ')
            .join('')}`,
        },
      };

      createPushTokenMutation({
        variables,
      });

      return true;
    },
    [createPushTokenMutation]
  );

  return <Provider value={{ onPermissionRequest }}>{props.children}</Provider>;
});

export default Notification;

export const useNotification = () => useContext(Context);
export const Consumer = Context.Consumer;
