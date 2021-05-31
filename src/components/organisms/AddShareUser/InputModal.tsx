import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'components/organisms/Modal';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import InputCode from 'components/molecules/InputCode/InputCode';

export type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const InputModal: React.FC<Props> = (props) => {
  const [code, setCode] = useState<string>('');

  return (
    <Modal
      isVisible={props.isVisible}
      title="共有メンバー追加"
      onClose={props.onClose}
      buttonTitle="確認"
      height={320}
      disabledButton={code.length < 8}
    >
      <View style={styles.root} py={2} px={3}>
        <View style={styles.inner}>
          <View style={styles.invite}>
            <Text>
              タスクを共有したいユーザーの{'\n'}招待コードを入力してください
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <InputCode value={code} onChange={setCode} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
  },
  inner: {
    width: 320,
  },
  invite: {
    alignItems: 'center',
    paddingTop: theme().space(3),
    paddingBottom: theme().space(2),
  },
  inputContainer: {
    marginLeft: theme().space(3),
    marginTop: theme().space(4),
    width: 280,
  },
});

export default memo(InputModal);
