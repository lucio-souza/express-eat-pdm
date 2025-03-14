import { Image, Pressable, View } from "react-native";
import { Container } from "./style";
import { CameraIcon } from "react-native-heroicons/solid";
import { Palette } from "../../../assets/palette";
import { useState } from "react";
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";

export function ImageSelector(
  props: {
    source?: string
  }
) {
  const [ path, setPath ] = useState('');

  async function pickImage () {
    console.log('PICKING IMAGES');
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permita o acesso as fotos.');
      await pickImage();
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      setPath(result.assets[0].uri);
      console.log(path);
    }
  };

  return (
    <Pressable onPress={() => pickImage()}>
      <Container>
      {props.source === undefined
        ? <CameraIcon color={Palette.dark_gray} size={42}/>
        : <Image source={{
          uri: props.source
        }}/>
      }
    </Container>
    </Pressable>
  )
}