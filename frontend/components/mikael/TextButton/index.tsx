import { Button, Label } from "./style"

export function TextButton(
  props: {
    label: string,
    onClick: Function,
  }
) {
  return (
    <Button
      onPress={props.onClick}
    >
      <Label>{props.label}</Label>
    </Button>
  )
}