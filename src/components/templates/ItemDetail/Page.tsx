import React, { memo } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import View from 'components/atoms/View';
import CardDetail from 'components/organisms/CardDetail/CardDetail';
import InputDateWrap from 'components/organisms/InputDateWrap/InputDateWrap';
import theme from 'config/theme';

type Props = {
  date: string;
  onChangeDate: (date: string) => void;
};

const Page: React.FC<Props> = (props) => {
  return (
    <InputDateWrap
      date={props.date}
      onChangeDate={props.onChangeDate}
      firstItem
    >
      <ScrollView>
        <View style={styles.inner}>
          <CardDetail title="本を読んだ" />
        </View>
      </ScrollView>
    </InputDateWrap>
  );
};

export default memo(Page);

const styles = StyleSheet.create({
  inner: {
    height: '100%',
    marginHorizontal: theme().space(3),
    marginVertical: theme().space(4),
  },
});
