import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ConnectedType } from 'components/pages/Contact/Connected';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import { TextInput as RNTextInput } from 'react-native';
import Button from 'components/atoms/Button';

export type Props = ConnectedType & {};

const Page: React.FC<Props> = (props) => {
  const [text, setText] = useState('');

  const onCopyUserID = useCallback(() => {
    Clipboard.setString(props.userID);
  }, [props.userID]);

  return (
    <View style={styles.root}>
      {true && (
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

      <View style={styles.title} pt={4} pb={2}>
        <Text color="secondaryLight" size="sm">
          コメント
        </Text>
      </View>
      <RNTextInput
        multiline
        style={styles.inputText}
        autoCapitalize="none"
        onChangeText={setText}
        maxLength={300}
        autoFocus
      />

      <View mx={2} style={styles.button}>
        <Button
          title="送信する"
          width={120}
          disabled={text.length === 0 || props.loading}
          loading={props.loading}
          onPress={() => props.onContact(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    paddingTop: theme().space(4),
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
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme().space(4),
  },
});

export default memo(Page);
