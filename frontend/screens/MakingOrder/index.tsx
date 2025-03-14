import { Logo } from "../../components/mikael/Logo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Scroller } from "../../components/mikael/global/Scroller";
import { Container } from "../../components/mikael/global/Container";
import { OrderDetails } from "../../components/mikael/OrderDetails";
import { IconButton } from "../../components/mikael/IconButton";
import { TrashIcon } from "react-native-heroicons/solid";
import { Palette } from "../../assets/Palette"; 
import { TextButton } from "../../components/mikael/TextButton";
import { SectionHeader, Title } from "./components";
import { ItemDetails } from "../../components/mikael/ItemDetails";
import { PriceDetailsSection } from "./PriceDetailsSection";
import { CupomField } from "../../components/mikael/CupomField";
import { FowardButton } from "./FowardButton";


export function MakingOrder() {
  // const navigator = useNavigation();

  const Content = () => {
    return (
      <Scroller>
        <Container>
          <SectionHeader>
            <Title>Pedido</Title>
            <IconButton
              icon={<TrashIcon color={Palette.red}/>}
              label="Cancelar"
              onClick={() => { console.log('CANCEL ORDER');}}
            />
          </SectionHeader>
          <OrderDetails/>
          <SectionHeader>
            <Title>Itens</Title>
          </SectionHeader>
          <ItemDetails
            withRemoveBtn={true}
          />
          <ItemDetails
            withRemoveBtn={true}
          />
          <ItemDetails
            withRemoveBtn={true}
          />
          <ItemDetails
            withRemoveBtn={true}
          />
          <PriceDetailsSection/>
          <CupomField/>
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
          <FowardButton
            onClick={() => {
              console.log('GO TO SELECT_HOME')
              // navigator.navigate()
            }}
          />
        </Container>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}