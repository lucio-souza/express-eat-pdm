import { Container, Leading, Title, Trealing } from "./style";
import { Palette } from "../../../../assets/palette";
import { CheckCircleIcon } from "react-native-heroicons/solid";

export function Confirmed() {
  return (
    <Container>
      <Leading>  
        <CheckCircleIcon
          color={Palette.white}
        />
        <Title>Confirmado</Title>
      </Leading>
      <Trealing>00:00 hrs</Trealing>
    </Container>
  )
}