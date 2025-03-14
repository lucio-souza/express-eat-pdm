import { ReactNode } from "react"
import { Button, Label } from "./style"

export function IconButton(
  props: {
    icon: ReactNode,
    label?: string,
    fill?: boolean,
    onClick: Function,
  }
) {
  return (
    <Button
      fill={props.fill}
      onPress={props.onClick}
    >
      {props.icon}
      {props.label ? <Label>{props.label}</Label> : null}
    </Button>
  )
}