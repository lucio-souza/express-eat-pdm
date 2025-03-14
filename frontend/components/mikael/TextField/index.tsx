import { MutableRefObject } from "react";
import { Palette } from "../../../assets/palette";
import { InputField } from "./style";

export function TextField(
  props: {
    placeholder: string,
    height?: number,
    onChange: ()=>{}
  }
) {
  return (
    <InputField 
      placeholder={props.placeholder}
      $height={props.height}
      onChangeText={props.onChange}
    />
  )
}