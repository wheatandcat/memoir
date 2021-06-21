import React, { memo, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'components/organisms/Modal';
import View from 'components/atoms/View';
import theme from 'config/theme';
import { ConnectedType } from 'components/pages/Setting/AddShareUser/Connected';
import Input from './InputModal/Input';
import Sent from './InputModal/Sent';
import Confirm from './InputModal/Confirm';

export type Props = {
  isVisible: boolean;
  isConfirm?: boolean;
  confirmUser?: {
    displayName: string;
    image: string;
  } | null;
  displayName: string;
  onClose: () => void;
} & Pick<
  ConnectedType,
  'onSearchInviteCode' | 'requesting' | 'onCreateRelationshipRequest'
>;

const InputModal: React.FC<Props> = (props) => {
  const [code, setCode] = useState<string>('');

  const send = props.displayName !== '';

  const onPress = useCallback(() => {
    if (send) {
      setCode('');
      props.onClose();
    } else {
      props.onCreateRelationshipRequest(code);
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

  const buttonTitle = useCallback(() => {
    if (send) {
      return 'とじる';
    }

    if (props.isConfirm) {
      return undefined;
    }

    return '送信';
  }, [send, props.isConfirm]);

  const height = useCallback(() => {
    if (send) {
      return 240;
    }

    return 320;
  }, [send]);

  const title = useCallback(() => {
    if (send || props.isConfirm) {
      return '';
    }

    return '共有メンバー追加';
  }, [send, props.isConfirm]);

  return (
    <Modal
      isVisible={props.isVisible}
      title={title()}
      onClose={() => {
        setCode('');
        props.onClose();
      }}
      buttonTitle={buttonTitle()}
      height={height()}
      disabledButton={disabledButton()}
      onPress={onPress}
    >
      <View style={styles.root} py={2} px={3}>
        <View style={styles.inner}>
          {(() => {
            if (props.displayName) {
              return <Sent displayName={props.displayName} />;
            } else if (props.isConfirm) {
              return (
                <Confirm
                  displayName={props.confirmUser?.displayName || ''}
                  image={props.confirmUser?.image || ''}
                  requesting={props.requesting}
                  onNG={() => {
                    setCode('');
                    props.onClose();
                  }}
                  onOK={() => props.onSearchInviteCode(code)}
                />
              );
            }

            return <Input code={code} onChange={setCode} />;
          })()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 320,
  },
});

export default memo(InputModal);
