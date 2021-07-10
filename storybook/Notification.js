import * as Notifications from 'expo-notifications';
import React, { memo, useContext, useCallback, createContext } from 'react';

export const Context = createContext({});
const { Provider } = Context;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Notification = memo((props) => {
  const onPermissionRequest = useCallback(async () => {
    return true;
  }, []);

  return <Provider value={{ onPermissionRequest }}>{props.children}</Provider>;
});

export default Notification;

export const useNotification = () => useContext(Context);
export const Consumer = Context.Consumer;
