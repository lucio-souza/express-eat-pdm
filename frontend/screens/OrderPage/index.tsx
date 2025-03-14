import { Logo } from "../../components/mikael/Logo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Scroller } from "../../components/mikael/global/Scroller";
import { Container } from "../../components/mikael/global/Container";
import { OrderDetails } from "../../components/mikael/OrderDetails";
import { SectionHeader, Title } from "./components";
import { ItemDetails } from "../../components/mikael/ItemDetails";
import { AwaitingConfirmation } from "../../components/mikael/StateIndicators/AwaitingConfirmation";
import { PriceDetailsSection } from "./PriceDetailsSection";
import { DeliveryLocalItem } from "../../components/mikael/DeliveryLocalItem";
import { CancelButton } from "./CancelButton";

export function OrderPage() {
  // const navigator = useNavigation();

  const Content = () => {
    return (
      <Scroller>
        <Container>
          <SectionHeader>
            <Title>Pedido</Title>
          </SectionHeader>
          <OrderDetails/>
          <AwaitingConfirmation/>
          <SectionHeader>
            <Title>Itens</Title>
          </SectionHeader>
          <ItemDetails/>
          <ItemDetails/>
          <ItemDetails/>
          <ItemDetails/>
          <PriceDetailsSection/>
          <SectionHeader>
            <Title>Local de entrega</Title>
          </SectionHeader>
          <DeliveryLocalItem
            type="Casa"
          />
        </Container>
      </Scroller>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Container>
          <Logo />
          <Content />
          <CancelButton 
            onClick={() => console.log('CANCELORDER')}
          />
        </Container>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}