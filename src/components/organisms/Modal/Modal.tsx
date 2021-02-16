import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import RNModal from 'react-native-modal';
import IconButton from 'components/molecules/IconButton';

type Props = {
  isVisible: boolean;
  title: string;
  buttonTitle?: string;
  disabledButton?: boolean;
  onClose: () => void;
  onPress?: () => void;
};

const Modal: React.FC<Props> = (props) => {
  return (
    <RNModal
      isVisible={props.isVisible}
      onBackdropPress={props.onClose}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
    >
      <View style={styles.root}>
        <View p={3} style={styles.header}>
          <View style={styles.close}>
            <IconButton name="close" onPress={props.onClose} />
          </View>
          <View>
            <Text variants="middle" textAlign="center">
              {props.title}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View px={3}>{props.children}</View>
        </ScrollView>
        {Boolean(props.buttonTitle) && (
          <View mx={3} mb={3}>
            <Button
              title={props.buttonTitle || ''}
              size="lg"
              onPress={() => props.onPress?.()}
              disabled={props.disabledButton}
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
    height: '80%',
    backgroundColor: theme().color.background.light,
    borderRadius: 30,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: theme().space(3),
    left: theme().space(3),
  },
});
