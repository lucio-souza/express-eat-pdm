import { Container, Leading, Title, Trealing } from "./style";
import { Palette } from "../../../../assets/palette";
import { TruckIcon } from "react-native-heroicons/solid";

export function OutForDelivery() {
  return (
    <Container>
      <Leading>  
        <TruckIcon
          color={Palette.white}
        />
        <Title>Saiu para entrega</Title>
      </Leading>
      <Trealing>00:00 hrs</Trealing>
    </Container>
  )
}