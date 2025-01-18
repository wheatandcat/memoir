import { type FC, memo } from "react";
import Connected from "./Connected";

type Props = {
  onFinish: () => void;
};

const IntroIntro: FC<Props> = (props) => {
  return <Connected onFinish={props.onFinish} />;
};

export default memo(IntroIntro);
