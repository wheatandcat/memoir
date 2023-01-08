import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import DateInput from 'components/organisms/DateInput/DateInput';
import theme from 'config/theme';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';

type Props = {
  date: string;
  isItemDetail?: boolean;
  onChangeDate: (date: string) => void;
  children?: React.ReactNode;
};

const InputDateWrap: React.FC<Props> = (props) => {
  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={theme().color.primary.main}
        style="light"
      />
      <View style={styles.root}>
        <DateInput
          date={props.date}
          onChange={props.onChangeDate}
          isItemDetail={props.isItemDetail}
        />
        {props.children}
      </View>
    </>
  );
};

export default memo<React.FC<Props>>(InputDateWrap);

const styles = StyleSheet.create({
  root: {
    height: '100%',
    position: 'relative',
  },
});
