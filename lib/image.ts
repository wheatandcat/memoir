import { getFirebaseStorageApp } from "@/lib/firebase";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const uploadImageAsync = async (
  uri: string,
  fileName: string,
): Promise<string> => {
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (e) => {
      console.log("image upload error:", e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
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
    { compress: 0, format: ImageManipulator.SaveFormat.PNG },
  );

  const fileInfo = await FileSystem.getInfoAsync(result.uri, { size: true });

  const size = fileInfo.exists ? fileInfo.size : 0;

  console.log("file-size:", size);

  return result.uri;
};
