import { memo, type FC, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import DateInput from '@/components/layouts/DateInput/DateInput';
import theme from 'config/theme';
import FocusAwareStatusBar from '@/components/layouts/FocusAwareStatusBar';

type Props = {
  date: string;
  isItemDetail?: boolean;
  onChangeDate: (date: string) => void;
  children?: ReactNode;
};

const InputDateWrap: FC<Props> = (props) => {
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

export default memo<FC<Props>>(InputDateWrap);

const styles = StyleSheet.create({
  root: {
    height: '100%',
    position: 'relative',
  },
});
