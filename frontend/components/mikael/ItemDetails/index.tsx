import { Container, Content, Details, Price, Subtitle, Title } from "./style";
import { ImageViewer } from "../ImageViwer";
import { IconButton } from "../IconButton";
import { TrashIcon } from "react-native-heroicons/solid";
import { Palette } from "../../../assets/palette";

export function ItemDetails(
  props: {
    source?: string,
    withRemoveBtn?: boolean
  }
) {
  return (
    <Container>
      <Content>
        {props.withRemoveBtn === true
          ? <IconButton
            icon={<TrashIcon color={Palette.red} size={20}/>}
            onClick={() => { console.log('REMOVE ITEM');}}
          />
          : null
        }
        <ImageViewer/>
        <Details>
          <Title>item-name</Title>
          <Subtitle>00x</Subtitle>
        </Details>
      </Content>
      <Price>R$ 00,00</Price>
    </Container>
  )
}