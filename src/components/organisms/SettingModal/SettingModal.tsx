import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import Modal from 'components/organisms/Modal';
import Divider from 'components/atoms/Divider';
import Constants from 'expo-constants';
import theme from 'config/theme';
import Debug from 'components/organisms/Debug/Debug';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const SettingModal: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  const onLicence = useCallback(() => {
    props.onClose();

    navigation.navigate('SettingLicence');
  }, [navigation, props]);

  return (
    <Modal isVisible={props.isVisible} title="設定" onClose={props.onClose}>
      <View style={styles.root} p={3} pt={4}>
        <TouchableOpacity style={styles.menuText}>
          <View>
            <Text>アカウント設定</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText}>
          <View>
            <Text>ふりかえり日時を変更する</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText}>
          <View>
            <Text>過去のmemoir一覧</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText}>
          <View>
            <Text>規約</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        <TouchableOpacity style={styles.menuText} onPress={onLicence}>
          <View>
            <Text>著作権</Text>
          </View>
        </TouchableOpacity>
        <Divider my={3} />
        {!Constants.isDevice && <Debug />}
      </View>
    </Modal>
  );
};

export default memo(SettingModal);

const styles = StyleSheet.create({
  root: {},
  menuText: {
    paddingLeft: theme().space(2),
  },
});
