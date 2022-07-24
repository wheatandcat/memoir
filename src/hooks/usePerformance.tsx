import { useRef, useCallback, useEffect } from 'react';
import dayjs from 'lib/dayjs';

const TRACE_EVENT_VIEW_MEMOIR = 'trace_view_memoir';
const TRACE_EVENT_VIEW_HOME_CHANGE_DATE = 'trace_view_home_change_date';

export const traceEvent = {
  TRACE_EVENT_VIEW_MEMOIR,
  TRACE_EVENT_VIEW_HOME_CHANGE_DATE,
};

type valueof<T> = T[keyof T];
type TraceEventKeys = valueof<typeof traceEvent>;

type Props = {
  traceName: TraceEventKeys;
};

type TraceItem = {
  time: number;
};

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
    if (traceItemRef.current.time > 0) {
      console.log(
        `[action:${props.traceName}] time:${traceItemRef.current.time}ms,renderCount:${traceCountRef.current}`
      );
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
