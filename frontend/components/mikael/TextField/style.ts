import styled from "styled-components/native";
import { Palette } from "../../../assets/palette";

export const InputField = styled.TextInput`
  border: 1px solid ${Palette.light_gray};
  border-radius: 12px;

  padding: 9px 18px;

  ::placeholder {
    color: ${Palette.dark_gray};
    font-weight: 600;
  }
`