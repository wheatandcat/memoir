import React, { memo } from 'react';
import Image from 'components/atoms/Image';
import { icon } from './setting';

type Props = {
  categoryID: number;
};

const Category: React.FC<Props> = (props) => {
  const s = icon(props.categoryID);

  return <Image source={s.image} width={50} height={50} />;
};

export default memo(Category);
