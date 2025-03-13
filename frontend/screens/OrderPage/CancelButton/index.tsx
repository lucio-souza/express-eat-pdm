import { TrashIcon } from "react-native-heroicons/solid"
import { Button, Label } from "./style"
import { Palette } from "../../../../assets/palette"

export function CancelButton(
  props: {
    onClick: Function,
  }
) {
  return (
    <Button
      onPress={props.onClick}
    >
      <TrashIcon color={Palette.white}/>
      <Label>Cancelar</Label>
    </Button>
  )
}