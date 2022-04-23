import { useState, useCallback, MutableRefObject } from 'react';

const useSafeState = (unmountRef: unknown, defaultValue: unknown) => {
  const [state, changeState] = useState(defaultValue);
  const wrapChangeState = useCallback(
    (v: boolean) => {
      const ref = unmountRef as MutableRefObject<boolean>;
      if (!ref.current) {
        changeState(v);
      }
    },
    [changeState, unmountRef]
  );

  return [state, wrapChangeState];
};

export default useSafeState;
