import useIsFirstRender from "@/hooks/useIsFirstRender";
import dayjs from "@/lib/dayjs";
import { getItem, setItem, storageKey } from "@/lib/storage";
import { useCallback, useEffect, useState } from "react";

export type State = {
  dayOfWeek: number;
  hours: number;
  minutes: number;
  notification: boolean;
};

const initialState = (): State => ({
  dayOfWeek: dayjs().day(),
  hours: dayjs().hour(),
  minutes: dayjs().minute(),
  notification: false,
});

const useMemoirNotificationSetting = () => {
  const isFirstRender = useIsFirstRender();
  const [state, setState] = useState<State>(initialState());
  const [loading, setLoading] = useState(true);

  const setSetting = useCallback(async () => {
    const setting = await getItem(storageKey.MEMOIR_NOTIFICATION_KEY);
    if (setting) {
      const json = JSON.parse(setting);

      const item: State = {
        dayOfWeek: json.dayOfWeek ?? state.dayOfWeek,
        hours: json.hours ?? state.hours,
        minutes: json.minutes ?? state.minutes,
        notification: json.notification ?? state.notification,
      };

      setState(item);
    }

    setLoading(false);
  }, [state]);

  useEffect(() => {
    if (!isFirstRender) return;

    setSetting();
  }, [isFirstRender, setSetting]);

  const onSave = useCallback(async (item: State) => {
    return await setItem(
      storageKey.MEMOIR_NOTIFICATION_KEY,
      JSON.stringify(item),
    );
  }, []);

  return {
    ...state,
    loading,
    onSave,
  };
};

export default useMemoirNotificationSetting;
