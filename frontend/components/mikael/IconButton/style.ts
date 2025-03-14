import styled from "styled-components/native";
import { Palette } from "../../../assets/palette";

export const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 8px;
  
  border-radius: 12px;

  padding: 6px;

  align-items: center;
  justify-content: center;

  background-color: ${ (props) => props.fill === true ? Palette.blue : 'none' };

  cursor: pointer;
`;

export const Label = styled.Text`
  font-family: 'Poppins_600SemiBold';
  color: ${Palette.red};
`;