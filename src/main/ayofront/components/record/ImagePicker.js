import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { usePhotoContext } from "../../store/image_context";

function ImagePicker({ children, onClose }) {
  const uri = "http://213.35.96.167/";

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
      console.log(image.assets[0].uri);
      setPhotoUri(image.assets[0].uri);
      onClose();
      uploadImage(image.assets[0].uri);
    }
  }

  const uploadImage = async (imageUri) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    });

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

export default ImagePicker;
