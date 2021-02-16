import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Modal from 'components/organisms/Modal';
import TextInput from 'components/atoms/TextInput';
import Categories from 'components/organisms/Categories';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  isVisible: boolean;
  date: string;
  onClose: () => void;
  onCategory: () => void;
};

const AddItemModal: React.FC<Props> = (props) => {
  return (
    <Modal
      isVisible={props.isVisible}
      title={dayjs(props.date).format('YYYY.MM.DD / ddd')}
      onClose={props.onClose}
    >
      <View style={styles.root} p={1} px={3}>
        <TextInput placeholder="終了したタスク" />
        <View py={2}>
          <Categories onPress={props.onCategory} />
        </View>
      </View>
    </Modal>
  );
};

export default memo(AddItemModal);

const styles = StyleSheet.create({
  root: {},
});
