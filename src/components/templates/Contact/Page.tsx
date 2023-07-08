import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ConnectedType } from 'components/pages/Contact/Connected';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import { TextInput as RNTextInput } from 'react-native';
import useAutoFocusInput from 'hooks/useAutoFocusInput';
import Modal from 'components/organisms/Modal';
import Image from 'components/atoms/Image';

export type Props = ConnectedType & {};

const Page: React.FC<Props> = (props) => {
  const autoFocusProps = useAutoFocusInput(true, 500);

  const onCopyUserID = useCallback(() => {
    Clipboard.setStringAsync(props.userID);
  }, [props.userID]);

  const debug = false;

  return (
    <>
      <View style={styles.root}>
        {debug && (
          <>
            <View style={styles.title}>
              <Text color="secondaryLight" size="sm">
                ユーザーID
              </Text>
            </View>
            <View style={styles.userIDText}>
              <TouchableOpacity onPress={onCopyUserID}>
                <Text size="sm">{props.userID}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.title} pt={debug ? 4 : 0} pb={2}>
          <Text color="secondaryLight" size="sm">
            コメント
          </Text>
        </View>
        <RNTextInput
          multiline
          style={styles.inputText}
          autoCapitalize="none"
          onChangeText={props.onChangeText}
          maxLength={300}
          blurOnSubmit={false}
          {...autoFocusProps}
        />
      </View>
      <Modal
        isVisible={props.send}
        title=""
        onClose={props.onClose}
        buttonTitle="戻る"
        onPress={props.onClose}
        height={320}
      >
        <View style={styles.modal}>
          <Image
            source={require('../../../img/common/intro_06.png')}
            width={100}
            height={100}
            contentFit="contain"
          />
          <View pt={4}>
            <Text textAlign="center">送信完了しました！</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    paddingTop: theme().space(4),
  },
  modal: {
    backgroundColor: theme().color.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    paddingVertical: theme().space(1),
    paddingHorizontal: theme().space(3),
  },
  userIDText: {
    backgroundColor: theme().color.background.light,
    paddingVertical: theme().space(3),
    paddingHorizontal: theme().space(3),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.secondary.light,
  },
  inputText: {
    borderColor: theme().color.secondary.light,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: theme().space(2),
    paddingBottom: theme().space(1),
    paddingHorizontal: theme().space(3),
    height: 250,
    color: theme().color.secondary.main,
    backgroundColor: theme().color.background.light,
    lineHeight: 20,
    fontWeight: 'bold',
    textAlignVertical: 'top',
  },
});

export default memo(Page);
