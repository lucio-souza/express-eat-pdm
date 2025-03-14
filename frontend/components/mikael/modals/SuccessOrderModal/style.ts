import { StyleSheet } from "react-native";
import { Palette } from "../../../../assets/palette";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: rgba(0,0,0,0.5);
`;

export const Content = styled.View`
  align-items: center;
  gap: 12px;

  padding: 12px;

  height: 35%;
  width: 80%;

  border-radius: 12px;
  background-color: ${Palette.white};
`

export const Close = styled.View`
  flex-direction: row;
  justify-content: flex-end;

  width: 100%;
`

export const Title = styled.Text`
  font-family: 'Poppins_600SemiBold';
  color: ${Palette.blue};
`