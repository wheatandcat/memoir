import firebase from 'lib/system/firebase';
import 'lib/firebase';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

export const uploadImageAsync = async (
  uri: string,
  fileName: string
): Promise<string> => {
  console.log('uri:', uri);

  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(fileName);
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
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
