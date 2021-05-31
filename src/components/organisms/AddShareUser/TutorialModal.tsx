import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'components/organisms/Modal';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';

export type Props = {
  isVisible: boolean;
  onClose: () => void;
  onPress: () => void;
};

const TutorialModal: React.FC<Props> = (props) => {
  return (
    <Modal
      isVisible={props.isVisible}
      title="招待コードを作成する"
      onClose={props.onClose}
      buttonTitle="招待コードを作成する"
      onPress={props.onPress}
      height={320}
    >
      <View style={styles.root}>
        <Text>ここにテキストを挿入する</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
  },
});

export default memo(TutorialModal);
