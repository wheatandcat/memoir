import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { useItemQuery } from 'queries/api/index';
import Plain from './Plain';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  itemID: string;
  date: string;
  onChangeDate: (date: string) => void;
};

export type ConnectedType = {
  date: string;
  onChangeDate: (date: string) => void;
};

const Connected: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  const { loading, data, error } = useItemQuery({
    variables: {
      id: props.itemID,
    },
  });

  const onChangeDate = useCallback(
    (date: string) => {
      const formatDate = dayjs(props.date).format('YYYY-MM-DD');
      if (formatDate !== date) {
        props.onChangeDate(date);
        navigation.goBack();
      }
    },
    [props, navigation]
  );

  return (
    <Plain
      data={data}
      loading={loading}
      error={error}
      date={dayjs(props.date).format('YYYY-MM-DD')}
      onChangeDate={onChangeDate}
    />
  );
};

export default memo(Connected);
