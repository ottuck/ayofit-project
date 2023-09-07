import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import { usePhotoContext } from "../../store/image_context";

function ImagePicker({ children, onClose }) {
  const { setPhotoUri } = usePhotoContext();
  const [libraryPermissionInformation, requestLibraryPermission] =
    useMediaLibraryPermissions();

  async function verifyPermissions() {
    if (libraryPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestLibraryPermission();

      return permissionResponse.granted;
    }

    if (libraryPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant library permissions to use this app."
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
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
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

export default ImagePicker;
