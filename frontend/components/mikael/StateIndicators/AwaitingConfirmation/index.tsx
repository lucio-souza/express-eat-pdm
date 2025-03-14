import { Container, Leading, Title } from "./style";
import { ClockIcon } from "react-native-heroicons/solid";
import { Palette } from "../../../../assets/palette";

export function AwaitingConfirmation() {
  return (
    <Container>
      <Leading>  
        <ClockIcon
          color={Palette.dark_gray}
        />
        <Title>Aguardando confirmação</Title>
      </Leading>
    </Container>
  )
}