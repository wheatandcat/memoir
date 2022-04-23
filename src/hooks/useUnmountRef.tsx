import { useRef, useEffect } from 'react';

const useUnmountRef = () => {
  const unmountRef = useRef(false);
  useEffect(
    () => () => {
      unmountRef.current = true;
    },
    []
  );
  return unmountRef;
};

export default useUnmountRef;
