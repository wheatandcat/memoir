import { getFirebaseStorageApp } from 'lib/firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

export const uploadImageAsync = async (
  uri: string,
  fileName: string
): Promise<string> => {
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log('image upload error:', e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const storageRef = ref(getFirebaseStorageApp(), fileName);
  const snapshot = await uploadBytes(storageRef, blob);

  blob.close();

  return await getDownloadURL(snapshot.ref);
};

export const deleteImageAsync = async (uri: string) => {
  const desertRef = ref(getFirebaseStorageApp(), uri);

  await deleteObject(desertRef);
};

export const resizeImage = async (uri: string): Promise<string> => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [
      {
        resize: {
          width: 500,
        },
      },
    ],
    { compress: 0, format: ImageManipulator.SaveFormat.PNG }
  );

  const fileInfo = await FileSystem.getInfoAsync(result.uri);
  console.log('file-size:', fileInfo.size);

  return result.uri;
};
