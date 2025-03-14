import { Container, Leading, Title, Trealing } from "./style";
import { Palette } from "../../../../assets/palette";
import { BeakerIcon, CheckCircleIcon } from "react-native-heroicons/solid";

export function InProduction() {
  return (
    <Container>
      <Leading>  
        <BeakerIcon
          color={Palette.white}
        />
        <Title>Em Produção</Title>
      </Leading>
      <Trealing>00:00 hrs</Trealing>
    </Container>
  )
}