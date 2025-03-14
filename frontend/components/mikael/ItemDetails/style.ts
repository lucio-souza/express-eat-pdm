import { StyleSheet } from "react-native";
import { Palette } from "../../../assets/palette";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;

  overflow: hidden;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 12px;
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
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  color: ${Palette.gray};
`;

export const Price = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-size: 14px;
  color: ${Palette.dark_gray};
`;