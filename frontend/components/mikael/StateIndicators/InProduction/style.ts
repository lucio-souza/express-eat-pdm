import { StyleSheet } from "react-native";
import { Palette } from "../../../../assets/palette";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  padding: 8px 16px;

  border-radius: 10px;

  background-color: ${Palette.blue};

`;

export const Leading = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

export const Title = styled.Text`
  font-family: 'Poppins_600SemiBold';
  color: ${Palette.white};
`

export const Trealing = styled.Text`
  font-family: 'Poppins_400Regular';
  color: ${Palette.white};
`