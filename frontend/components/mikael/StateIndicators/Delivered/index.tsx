import { Container, Leading, Title, Trealing } from "./style";
import { Palette } from "../../../../assets/palette";
import { FlagIcon } from "react-native-heroicons/solid";

export function Delivered() {
  return (
    <Container>
      <Leading>  
        <FlagIcon
          color={Palette.white}
        />
        <Title>Entregue</Title>
      </Leading>
      <Trealing>00:00 hrs</Trealing>
    </Container>
  )
}