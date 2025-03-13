import { Container, InputField, Text } from "./style";

export function PriceInput() {
  return (
    <Container>
      <InputField
        placeholder='Preço'
      />
      <Text>R$</Text>
    </Container>
  )
}