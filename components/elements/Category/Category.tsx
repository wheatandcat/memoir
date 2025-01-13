import { memo , type FC} from 'react';
import type { ImageProps } from 'react-native';
import Image from 'components/atoms/Image';
import { icon } from './setting';

type Props = {
  categoryID: number;
  onLoadEnd?: ImageProps['onLoadEnd'];
};

const Category: FC<Props> = (props) => {
  const s = icon(props.categoryID);

  return (
    <Image
      source={s.image}
      width={50}
      height={50}
      onLoadEnd={props.onLoadEnd}
      testID={`category_id_${props.categoryID}`}
    />
  );
};

export default memo(Category);
