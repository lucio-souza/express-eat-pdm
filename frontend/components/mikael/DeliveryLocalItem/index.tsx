import { Image, Pressable, View } from "react-native";
import { Container, Content, Details, Subtitle, Title } from "./style";
import { CameraIcon, CheckCircleIcon, HomeIcon } from "react-native-heroicons/solid";
import { Palette } from "../../../assets/palette";
import { useState } from "react";
import { requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import { ImageViewer } from "../ImageViwer";

export function DeliveryLocalItem(
  props: {
    type: string
  }
) {
  return (
    <Container>
      <Content>
        <HomeIcon color={Palette.gray}/>
        <Details>
          <Title>{props.type}</Title>
          <Subtitle>R. XXXXXX, n° 000</Subtitle>
          <Subtitle>Bairro XXXXXX</Subtitle>
          <Subtitle>Cidade - EE</Subtitle>
        </Details>
      </Content>
    </Container>
  )
}