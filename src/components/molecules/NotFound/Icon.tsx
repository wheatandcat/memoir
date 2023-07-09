import React, { memo } from 'react';
import Image from 'components/atoms/Image';
import dayjs from 'lib/dayjs';

type Props = {
  date: string;
};

const icons = [
  require('../../../img/icon/icon_cat.png'),
  require('../../../img/icon/icon_cup.png'),
  require('../../../img/icon/icon_fire.png'),
  require('../../../img/icon/icon_light.png'),
  require('../../../img/icon/icon_moon.png'),
  require('../../../img/icon/icon_paper_airplane.png'),
  require('../../../img/icon/icon_penguins.png'),
  require('../../../img/icon/icon_plant.png'),
  require('../../../img/icon/icon_ship.png'),
  require('../../../img/icon/icon_unicorn.png'),
];

const Icon: React.FC<Props> = (props) => {
  const no = dayjs(props.date).day() % 10;

  return (
    <Image source={icons[no]} width={90} height={90} contentFit="contain" />
  );
};

export default memo(Icon);
