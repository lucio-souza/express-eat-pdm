import { StyleSheet } from "react-native";
import { Palette } from "../../../assets/palette";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  padding: 8px;

  border: 1px solid ${Palette.gray};
  border-radius: 10px;

  overflow: hidden;

  background-color: ${Palette.input_background};
`;

export const Details = styled.View`
  display: flex;

`;

export const Title = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 14px;
  color: ${Palette.black};
`;

export const Subtitle = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 14px;
  color: ${Palette.gray};
`;