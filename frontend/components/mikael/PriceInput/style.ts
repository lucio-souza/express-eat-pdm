import styled from "styled-components/native";
import { Palette } from "../../../assets/palette";

export const InputField = styled.TextInput`
  ;
  
  background-color: '#FF5555';

  ::placeholder {
    color: ${Palette.dark_gray};
    font-weight: 600;
    width: 100%;
  }
`;

export const Container = styled.View`
  ;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  border: 1px solid ${Palette.light_gray};
  border-radius: 12px;

  background-color: ${Palette.input_background};

  padding: 4px 18px;
`;

export const Text = styled.Text`
  ;
  color: ${Palette.gray};
  
  border-left: 2px solid ${Palette.light_gray};
  padding-left: 4px;
`
