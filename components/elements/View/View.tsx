import type { FC } from 'react';
import { View as RNView, type ViewStyle, type ViewProps } from 'react-native';
import { type SpaceProps, styleSpace } from 'lib/styledSystem/styleSpace';

type Props = ViewProps & SpaceProps;

const View: FC<Props> = (props) => {
  const style = {
    ...styleSpace(props),
  } as ViewStyle;

  return <RNView {...props} style={[style, props.style]} />;
};

export default View;
