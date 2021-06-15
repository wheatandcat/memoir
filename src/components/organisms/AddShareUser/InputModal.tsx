import React, { memo, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'components/organisms/Modal';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import InputCode from 'components/molecules/InputCode/InputCode';
import { ConnectedType } from 'components/pages/Setting/AddShareUser/Connected';

export type Props = {
  isVisible: boolean;
  displayName: string;
  onClose: () => void;
} & Pick<ConnectedType, 'onSearchInviteCode' | 'requesting'>;

const InputModal: React.FC<Props> = (props) => {
  const [code, setCode] = useState<string>('');

  const send = props.displayName !== '';

  const onPress = useCallback(() => {
    if (send) {
      props.onClose();
    } else {
      props.onSearchInviteCode(code);
    }
  }, [props, code, send]);

  const disabledButton = useCallback(() => {
    if (send) {
      return false;
    }

    if (props.requesting) {
      return true;
    }

    return code.length < 8;
  }, [props.requesting, code, send]);

  return (
    <Modal
      isVisible={props.isVisible}
      title={send ? '' : '共有メンバー追加'}
      onClose={() => {
        setCode('');
        props.onClose();
      }}
      buttonTitle={send ? 'とじる' : '送信'}
      height={send ? 240 : 320}
      disabledButton={disabledButton()}
      onPress={onPress}
    >
      <View style={styles.root} py={2} px={3}>
        <View style={styles.inner}>
          {props.displayName ? (
            <View style={styles.invite}>
              <Text textAlign="center">
                <Text color="primary">{props.displayName}</Text>{' '}
                さんに共有の申請を{'\n'}送りました
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.invite}>
                <Text>
                  振り返りを共有したいユーザーの{'\n'}
                  招待コードを入力してください
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <InputCode value={code} onChange={setCode} />
              </View>
            </>
          )}
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
