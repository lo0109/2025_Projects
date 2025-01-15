import { Platform, View, StyleSheet } from "react-native";
import { Image, ImageSource } from "expo-image";
import ImageViewer from "@/components/imageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

const PlaceholderImage = require("../../assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickEmoji, setPickEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  const [permissionResponse, requestPermissions] =
    MediaLibrary.usePermissions();
  const imageRef = useRef(null);

  useEffect(() => {
    if (permissionResponse?.granted) {
      requestPermissions();
    }
  }),
    [];
  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
      result.assets
        ? (setSelectedImage(result.assets[0].uri), setShowAppOptions(true))
        : undefined;
      result.canceled ? alert("Upload Canceled") : undefined;
    } catch (e) {
      console.log(e);
    }
  };
  const onReset = () => {
    setShowAppOptions(false);
  };
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onSaveImageAsync = async () => {
    if (Platform.OS === "web") {
      try {
        const dataUrl = imageRef.current
          ? await domtoimage.toJpeg(imageRef.current, {
              quality: 1,
              width: 400,
              height: 500,
            })
          : "";

        let link = document.createElement("a");
        link.download = "createdBySiu.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
    try {
      const localUri = await captureRef(imageRef, { height: 300, quality: 1 });
      await MediaLibrary.saveToLibraryAsync(localUri);
      console.log(localUri);
      localUri ? alert("Image saved successfully") : alert("Failed to save");
    } catch (e) {
      console.log(e);
    }
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} ref={imageRef} collapsable={false}>
        <ImageViewer imgSource={selectedImage || PlaceholderImage} />
        {pickEmoji && <EmojiSticker imageSize={40} stickerSource={pickEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon="refresh"
              label="Reset"
              onPress={onReset}
            ></IconButton>
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1 / 3,
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
