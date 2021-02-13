import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import RNModal from 'react-native-modal';
import IconButton from 'components/molecules/IconButton';

type Props = {
  isVisible: boolean;
  title: string;
  onClose: () => void;
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
