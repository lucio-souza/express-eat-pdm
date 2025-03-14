import { PriceCell, PriceDetails, PriceLabel, PriceValue, Total, TotalCell } from "../components";

export function PriceDetailsSection() {
  return (
    <PriceDetails>
      <PriceCell>
        <PriceLabel>Subtotal</PriceLabel>
        <PriceValue>R$ 00,00</PriceValue>
      </PriceCell>
      <PriceCell>
        <PriceLabel>Descontos</PriceLabel>
        <PriceValue>R$ 00,00</PriceValue>
      </PriceCell>
      <PriceCell>
        <PriceLabel>Entrega</PriceLabel>
        <PriceValue>R$ 00,00</PriceValue>
      </PriceCell>
      <TotalCell>
        <Total>TOTAL</Total>
        <PriceValue>R$ 00,00</PriceValue>
      </TotalCell>
    </PriceDetails>
  )
}