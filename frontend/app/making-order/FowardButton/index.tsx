import { Button, Label } from "./style"

export function FowardButton(
  props: {
    onClick: Function,
  }
) {
  return (
    <Button
      onPress={props.onClick}
    >
      <Label>Avançar</Label>
      <Label>R$ 00.00</Label>
    </Button>
  )
}