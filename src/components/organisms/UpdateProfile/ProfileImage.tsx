import React, { memo, useState, useCallback } from 'react';
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {
  useActionSheet,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';
import { resizeImage } from 'lib/image';
import UserImage from 'components/molecules/User/Image';

export type Props = {
  image: string | null;
  onChangeImage: (uri: string) => void;
};

const ProfileImage: React.FC<Props> = (props) => {
  const [image, setImage] = useState<string | null>(props.image);
  const { showActionSheetWithOptions } = useActionSheet();

  const pickImageLibrary = useCallback(async () => {
    const mediaLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibrary.status !== 'granted') {
      Alert.alert('memoirアプリのカメラのアクセス許可をONにしてください');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      allowMultipleSelection: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = await resizeImage(result.uri);
      props.onChangeImage(uri);
      setImage(uri);
    }
  }, [props]);

  const pickImageCamera = useCallback(async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    if (camera.status !== 'granted') {
      Alert.alert('memoirアプリのカメラのアクセス許可をONにしてください');
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = await resizeImage(result.uri);
      props.onChangeImage(uri);
      setImage(uri);
    }
  }, [props]);

  const onUpdateImage = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: ['ライブラリから選択', '写真を撮る', 'キャンセル'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          pickImageLibrary();
        } else if (buttonIndex === 1) {
          pickImageCamera();
        }
      }
    );
  }, [showActionSheetWithOptions, pickImageLibrary, pickImageCamera]);

  return (
    <View style={styles.root}>
      <View mt={5}>
        <TouchableOpacity onPress={onUpdateImage}>
          <UserImage image={image} />
        </TouchableOpacity>
        <View my={3}>
          <TouchableOpacity onPress={onUpdateImage}>
            <Text textAlign="center" size="sm">
              写真を変更
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    alignItems: 'center',
  },
});

export default connectActionSheet(memo(ProfileImage));
