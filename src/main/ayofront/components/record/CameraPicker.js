import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { Alert, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { usePhotoContext } from "../../store/image_context";

function CameraPicker({ children, onClose }) {
  const { debuggerHost } = Constants.manifest2.extra.expoGo;
  const uri = `http://${debuggerHost.split(":").shift()}:8080`;

  const { setPhotoUri } = usePhotoContext();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.canceled) {
      setPhotoUri(image.assets[0].uri);
      onClose();
      uploadImage(image.assets[0].uri, "user1");
    }
  }

  const uploadImage = async (imageUri, userId) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    });

    formData.append("userId", userId);

    try {
      const response = await fetch(uri + "/api/file/upload-image", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <TouchableOpacity onPress={takeImageHandler}>{children}</TouchableOpacity>
  );
}

export default CameraPicker;
