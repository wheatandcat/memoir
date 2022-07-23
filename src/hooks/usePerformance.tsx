import { useRef, useCallback } from 'react';
import dayjs from 'lib/dayjs';

const TRACE_EVENT_VIEW_MEMOIR = 'trace_view_memoir';

export const traceEvent = {
  TRACE_EVENT_VIEW_MEMOIR,
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

  const onOutPutTraceData = useCallback(async () => {
    if (traceItemRef.current.time > 0) {
      console.log(
        `action:${props.traceName} = time:${traceItemRef.current.time}ms`
      );
    }
  }, [props.traceName]);

  const onStartTrace = useCallback(
    async (timeout: number) => {
      startRef.current = Number(dayjs().valueOf());

      if (timeout) {
        setTimeout(onOutPutTraceData, timeout);
      }
    },
    [onOutPutTraceData]
  );

  const onEndTrace = useCallback(async (_?: any) => {
    const time = Number(dayjs().valueOf()) - startRef.current;

    const ti: TraceItem = {
      time,
    };
    traceItemRef.current = ti;
  }, []);

  return { onStartTrace, onEndTrace };
};

export default usePerformance;
