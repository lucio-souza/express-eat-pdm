import { StyleSheet } from "react-native";
import { Palette } from "../../../../assets/palette";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  padding: 8px 16px;

  border-radius: 10px;

  background-color: ${Palette.light_gray};

`;

export const Leading = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

export const Title = styled.Text`
  font-family: 'Poppins_600SemiBold';
  color: ${Palette.dark_gray};
`

export const Trealing = styled.Text`
  font-family: 'Poppins_400Regular';
  color: ${Palette.white};
`