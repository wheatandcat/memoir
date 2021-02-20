import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import DateInput from 'components/organisms/DateInput/DateInput';
import { LinearGradient } from 'expo-linear-gradient';
import theme from 'config/theme';

type Props = {
  date: string;
  onChangeDate: (date: string) => void;
};

const InputDateWrap: React.FC<Props> = (props) => {
  return (
    <LinearGradient
      colors={[theme().color.gradation[0], theme().color.gradation[1]]}
      style={styles.root}
    >
      <DateInput date={props.date} onChange={props.onChangeDate} />
      {props.children}
    </LinearGradient>
  );
};

export default memo<React.FC<Props>>(InputDateWrap);

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
});
