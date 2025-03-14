import { PlusIcon, TicketIcon } from "react-native-heroicons/solid";
import { Container, Field, Input } from "./style";
import { Palette } from "../../../assets/palette";
import { IconButton } from "../IconButton";

export function CupomField(
) {
  return (
    <Container>
      <Field>
        <TicketIcon color={Palette.gray}/>
        <Input 
          placeholder='Cupom'
        />
      </Field>
      <IconButton
        icon={<PlusIcon color={Palette.white}/>}
        fill={true}
        onClick={() => { console.log('ADDED TICKET')}}
      />
    </Container>
  )
}