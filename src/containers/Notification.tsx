import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {
  memo,
  useEffect,
  useRef,
  useContext,
  useCallback,
  createContext,
} from 'react';
import { Platform, Alert } from 'react-native';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

export type ContextProps = Partial<{
  onPermissionRequest: () => Promise<boolean>;
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
  const notificationListener = useRef<
    ReturnType<typeof Notifications.addNotificationReceivedListener>
  >();
  const responseListener = useRef<
    ReturnType<typeof Notifications.addNotificationResponseReceivedListener>
  >();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification: Notifications.Notification) => {
        const data = notification.request.content.data;

        console.log(data);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const onPermissionRequest = useCallback(async () => {
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

    return true;
  }, []);

  return <Provider value={{ onPermissionRequest }}>{props.children}</Provider>;
});

export default Notification;

export const useNotification = () => useContext(Context);
export const Consumer = Context.Consumer;
