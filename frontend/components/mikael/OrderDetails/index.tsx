import { Image, Pressable, View } from "react-native";
import { Container, Details, Subtitle, Title } from "./style";
import { CameraIcon } from "react-native-heroicons/solid";
import { Palette } from "../../../assets/palette";
import { useState } from "react";
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { ImageViewer } from "../ImageViwer";

export function OrderDetails(
  props: {
    source?: string
  }
) {
  return (
    <Container>
      <ImageViewer/>
      <Details>
        <Title>restaurant-name</Title>
        <Subtitle>Pedido 0000 • dd/mm ás 00:00</Subtitle>
      </Details>
    </Container>
  )
}