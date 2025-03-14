import styled from "styled-components/native";
import { Palette } from "../../../assets/Palette";

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 12px;

  border-radius: 12px;

  background-color: ${Palette.red};

  margin: 0px 8px 8px 8px;
`;

export const Label = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-weight: 500;
  font-size: 16px;
  color: ${Palette.white};
`;