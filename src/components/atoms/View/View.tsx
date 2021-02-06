import React from 'react';
import { View as RNView, ViewStyle, ViewProps } from 'react-native';
import { SpaceProps, styleSpace } from 'lib/styledSystem/styleSpace';

type Props = ViewProps & SpaceProps;

const View: React.FC<Props> = (props) => {
  const style = {
    ...styleSpace(props),
  } as ViewStyle;

  return <RNView {...props} style={[style, props.style]} />;
};

export default View;
