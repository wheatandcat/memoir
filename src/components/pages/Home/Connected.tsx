import React, { memo, useCallback } from 'react';
import TemplateHome from 'components/templates/Home/Page.tsx';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { useRecoilValue } from 'recoil';
import { userIDState } from 'store/selectors';
import { Props as IndexProps } from './';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = IndexProps & {
  openSettingModal: boolean;
  onCloseSettingModal: () => void;
};

export type ConnectedType = {
  onAddItem: () => void;
};

const Connected: React.FC<Props> = (props) => {
  const userID = useRecoilValue(userIDState);

  const onAddItem = useCallback(() => {
    console.log(userID);
  }, [userID]);

  const onChangeDate = useCallback(() => {}, []);

  const onItem = useCallback(() => {
    props.navigation.navigate('ItemDetail');
  }, [props.navigation]);

  const onMemoir = useCallback(() => {
    props.navigation.navigate('Memoir');
  }, [props.navigation]);

  return (
    <TemplateHome
      date={dayjs().format('YYYY-MM-DD')}
      openSettingModal={props.openSettingModal}
      onAddItem={onAddItem}
      onChangeDate={onChangeDate}
      onCloseSettingModal={props.onCloseSettingModal}
      onItem={onItem}
      onMemoir={onMemoir}
    />
  );
};

export default memo(Connected);
