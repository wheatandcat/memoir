import Image from "@/components/elements/Image";
import dayjs from "@/lib/dayjs";
import type React from "react";
import { memo } from "react";

type Props = {
  date: string;
};

const icons = [
  require("@/assets/img/icon/icon_cat.png"),
  require("@/assets/img/icon/icon_cup.png"),
  require("@/assets/img/icon/icon_fire.png"),
  require("@/assets/img/icon/icon_light.png"),
  require("@/assets/img/icon/icon_moon.png"),
  require("@/assets/img/icon/icon_paper_airplane.png"),
  require("@/assets/img/icon/icon_penguins.png"),
  require("@/assets/img/icon/icon_plant.png"),
  require("@/assets/img/icon/icon_ship.png"),
  require("@/assets/img/icon/icon_unicorn.png"),
];

const Icon: React.FC<Props> = (props) => {
  const no = dayjs(props.date).day() % 10;

  return (
    <Image source={icons[no]} width={90} height={90} contentFit="contain" />
  );
};

export default memo(Icon);
