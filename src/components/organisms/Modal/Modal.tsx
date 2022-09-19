import React from 'react';
import { StyleSheet, ScrollView, Platform, ViewStyle } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import RNModal from 'react-native-modal';
import IconButton from 'components/molecules/IconButton';

export type Props = {
  isVisible: boolean;
  loading?: boolean;
  title: string;
  titleElement?: React.ReactNode;
  buttonTitle?: string;
  disabledButton?: boolean;
  height?: number;
  onClose: () => void;
  onPress?: () => void;
  children: React.ReactNode;
  testID?: string;
};

const Modal: React.FC<Props> = (props) => {
  const style: ViewStyle[] = [styles.root];
  if (props.height) {
    style.push({ height: props.height });
  }

  return (
    <RNModal
      isVisible={props.isVisible}
      onBackdropPress={props.onClose}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      testID={props.testID}
    >
      <View style={style}>
        <View p={3} style={styles.header}>
          <View style={styles.close}>
            <IconButton name="close" onPress={props.onClose} />
          </View>
          <View style={styles.title}>
            {props.titleElement ? (
              <>{props.titleElement}</>
            ) : (
              <View>
                <Text variants="middle" textAlign="center">
                  {props.title}
                </Text>
              </View>
            )}
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always" removeClippedSubviews>
          <View px={3}>{props.children}</View>
        </ScrollView>
        {Boolean(props.buttonTitle) && (
          <View mx={3} mb={3}>
            <Button
              title={props.buttonTitle || ''}
              size="lg"
              onPress={() => props.onPress?.()}
              disabled={props.disabledButton}
              loading={props.loading}
            />
          </View>
        )}
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: theme().color.background.light,
    borderRadius: 30,
    position: 'relative',
    ...Platform.select({
      ios: {
        height: '80%',
      },
      android: {
        height: '100%',
      },
    }),
  },
  header: {
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
  },
  close: {
    position: 'absolute',
    top: theme().space(3),
    left: theme().space(3),
  },
});
