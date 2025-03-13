import { StyleSheet } from "react-native";
import { Palette } from "../../../assets/palette";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 230px;

  border-radius: 12px;

  overflow: hidden;

  background-color: ${Palette.light_gray};
`;