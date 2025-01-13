import { useEffect, useRef } from 'react';

const useIsFirstRender = () => {
  const ref = useRef(true);
  useEffect(() => {
    ref.current = false;
  }, []);

  return ref.current;
};

export default useIsFirstRender;
