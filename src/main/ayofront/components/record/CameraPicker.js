import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { Alert, TouchableOpacity } from "react-native";
import { usePhotoContext } from "../../store/image_context";

function CameraPicker({ children, onClose }) {
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
    }
  }

  return (
    <TouchableOpacity onPress={takeImageHandler}>{children}</TouchableOpacity>
  );
}

export default CameraPicker;
