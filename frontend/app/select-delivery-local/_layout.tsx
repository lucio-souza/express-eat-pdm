import { Logo } from "../../components/mikael/Logo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Scroller } from "../../components/mikael/global/Scroller";
import { ImageSelector } from "../../components/mikael/ImageSelector";
import { Container } from "../../components/mikael/global/Container";
import { PriceInput } from "../../components/mikael/PriceInput";
import { TextButton } from "../../components/mikael/TextButton";
import { InputField } from "../../components/mikael/TextField/style";
import { Text } from "react-native";
import { DeliveryLocalSelector } from "../../components/mikael/DeliveryLocalSelector";
import { FowardButton } from "../making-order/FowardButton";
import { useState } from "react";
import { SuccessOrderModal } from "../../components/mikael/modals/SuccessOrderModal";
import { useRouter } from "expo-router";

export function _layout() {
  const router = useRouter()

  const [ modalVisible, setModalVisible ] = useState(false);

  const closeModal = () => {
    setModalVisible(false);

    router.replace('order-page');
  }

  const Content = () => {
    return (
      <Scroller>
        <Container>
          <DeliveryLocalSelector
            type="Casa"
          />
          <DeliveryLocalSelector
            type="Condomínio"
          />
          <DeliveryLocalSelector
            type="Trabalho"
          />
        </Container>
      </Scroller>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <SuccessOrderModal
          visible={modalVisible}
          onClose={closeModal}
        />
        <Container>
          <Logo />
          <Content />
          <FowardButton
            onClick={() => setModalVisible(true)}
          />
        </Container>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}