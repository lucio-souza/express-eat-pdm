import styled from "styled-components/native";
import { Palette } from "../../../assets/palette";

export const Input = styled.TextInput`
  flex: 1;
  
  font-family: 'Poppins_400Regular';

  width: max-content;

  padding: 2px;

  ::placeholder {
    color: ${Palette.dark_gray};
    font-weight: 600;
  }
`
export const Field =styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  border: 1px solid ${Palette.light_gray};
  border-radius: 12px;

  width: max-content;

  padding: 0px 6px;
`;

export const Container =styled.View`
  flex-direction: row;
  gap: 8px;

  height: 40px;
`;