import { useRef, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import dayjs from 'lib/dayjs';
import Constants from 'expo-constants';

const TRACE_EVENT_VIEW_MEMOIR = 'trace_view_memoir';
const TRACE_EVENT_VIEW_HOME_CHANGE_DATE = 'trace_view_home_change_date';

export const traceEvent = {
  TRACE_EVENT_VIEW_MEMOIR,
  TRACE_EVENT_VIEW_HOME_CHANGE_DATE,
} as const;

type valueof<T> = T[keyof T];
type TraceEventKeys = valueof<typeof traceEvent>;

type Props = {
  traceName: TraceEventKeys;
};

type TraceItem = {
  time: number;
};

const alertConfig = {
  [TRACE_EVENT_VIEW_MEMOIR]: {
    ...Platform.select({
      ios: {
        time: 2000,
        renderCount: 18,
      },
      android: {
        time: 2000,
        renderCount: 18,
      },
    }),
  },
  [TRACE_EVENT_VIEW_HOME_CHANGE_DATE]: {
    ...Platform.select({
      ios: {
        time: 1600,
        renderCount: 15,
      },
      android: {
        time: 1600,
        renderCount: 15,
      },
    }),
  },
};

const red = '\u001b[31m';
const green = '\u001b[32m';
const reset = '\x1b[0m';

const usePerformance = (props: Props) => {
  const startRef = useRef<number>(Number(dayjs().valueOf()));
  const traceItemRef = useRef<TraceItem>({ time: 0 });
  const traceCountRef = useRef<number>(0);
  const traceTimeoutIdRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (traceTimeoutIdRef.current) {
        clearTimeout(traceTimeoutIdRef.current);
      }
    };
  }, []);

  const onOutPutTraceData = useCallback(async () => {
    if (Constants.expoConfig?.extra?.APP_ENV !== 'review') {
      return;
    }

    if (traceItemRef.current.time > 0) {
      const text = `[action:${props.traceName}] time:${traceItemRef.current.time}ms,renderCount:${traceCountRef.current}`;
      console.log(green + text + reset);

      const c = alertConfig[props.traceName];
      if (!c) {
        return;
      }

      const renderCount = c.renderCount || 0;
      const time = c.time || 0;

      // ローカル環境のみ警告を出力
      if (
        traceCountRef.current > renderCount ||
        (time > 0 && traceItemRef.current.time > time)
      ) {
        console.log(
          `${red}☠️: [action:${props.traceName}]がalertConfigの想定より処理が重くなっているので確認お願いします${reset}`
        );
      }
    }
  }, [props.traceName]);

  const onStartTrace = useCallback(
    async (timeout: number) => {
      startRef.current = Number(dayjs().valueOf());
      traceCountRef.current = 0;

      if (timeout) {
        if (traceTimeoutIdRef.current) {
          clearTimeout(traceTimeoutIdRef.current);
        }
        traceTimeoutIdRef.current = setTimeout(onOutPutTraceData, timeout);
      }
    },
    [onOutPutTraceData]
  );

  const onEndTrace = useCallback(async (_?: any) => {
    const time = Number(dayjs().valueOf()) - startRef.current;
    traceCountRef.current += 1;

    const ti: TraceItem = {
      time,
    };
    traceItemRef.current = ti;
  }, []);

  return { onStartTrace, onEndTrace };
};

export default usePerformance;
