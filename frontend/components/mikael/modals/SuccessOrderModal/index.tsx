import { Modal, Text, View } from "react-native";
import { Close, Container, Content, Title } from "./style";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { Palette } from "../../../../assets/palette";
import { XMarkIcon } from "react-native-heroicons/solid";
import { IconButton } from "../../IconButton";

export function SuccessOrderModal(
  props: {
    visible: boolean,
    onClose: Function
  }
) {
  return (
    <Modal
      visible={props.visible}
      transparent
      animationType="none"
    >
      <Container>
        <Content>
          <Close>
            <IconButton
              icon={<XMarkIcon color={Palette.gray}/>}
              onClick={() => props.onClose()}
            />
          </Close>
            
          <CheckCircleIcon
            color={Palette.blue}
            size={76}
          />
          <Title>Pedido realizado com sucesso!</Title>
        </Content>
      </Container>
    </Modal>
  )
}