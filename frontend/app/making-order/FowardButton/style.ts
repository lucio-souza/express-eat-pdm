import styled from "styled-components/native";
import { Palette } from "../../../../assets/palette";

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 12px;

  border-radius: 12px;

  background-color: ${Palette.blue};

  margin: 0px 8px 8px 8px;
`;

export const Label = styled.Text`
  font-family: 'Poppins_600SemiBold';
  font-weight: 500;
  font-size: 16px;
  color: ${Palette.white};
`;