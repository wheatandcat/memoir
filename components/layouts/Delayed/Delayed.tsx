import useSafeState from "@/hooks/useSafeState";
import useUnmountRef from "@/hooks/useUnmountRef";
import type React from "react";
import { useEffect } from "react";
import type { ReactNode } from "react";

type Props = {
  delayCount: number;
  delayThreshold?: number;
  children: ReactNode;
};

const Delayed: React.FC<Props> = (props) => {
  const unmountRef = useUnmountRef();
  const [visible, setVisible] = useSafeState(unmountRef, false);

  useEffect(() => {
    if (props.delayThreshold && props.delayCount < props.delayThreshold) {
      typeof setVisible === "function" && setVisible(true);
    } else {
      setTimeout(
        () => {
          if (!unmountRef.current) {
            typeof setVisible === "function" && setVisible(true);
          }
        },
        (props.delayCount - (props.delayThreshold || 0)) * 50,
      );
    }
    return () => {
      typeof setVisible === "function" && setVisible(false);
    };
  }, [unmountRef, setVisible, props.delayCount, props.delayThreshold]);

  return <>{visible && props.children}</>;
};

export default Delayed;
