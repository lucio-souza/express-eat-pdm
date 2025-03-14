import { Image, Pressable, View } from "react-native";
import { Container } from "./style";
import { CameraIcon } from "react-native-heroicons/solid";
import { Palette } from "../../../assets/palette";
import { useState } from "react";
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";

export function ImageViewer(
  props: {
    source?: string
  }
) {
  return (
    <Container>
      {props.source === undefined
        ? <CameraIcon color={Palette.dark_gray} size={36}/>
        : <Image source={{
          uri: props.source
        }}/>
      }
    </Container>
  )
}