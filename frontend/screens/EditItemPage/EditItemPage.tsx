import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Scroller } from "../../components/mikael/global/Scroller";
import { Container } from "../../components/mikael/global/Container";
import { ImageSelector } from "../../components/mikael/ImageSelector";
import { InputField } from "../../components/mikael/TextField/style";
import { PriceInput } from "../../components/mikael/PriceInput";
import { TextButton } from "../../components/mikael/TextButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../../components/mikael/Logo";


export function EditItemPage() {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ price, setPrice ] = useState(0);

  function save() {
    const newItem = {
      name: name,
      description: description,
      price: price
    }

    console.log(newItem);
    console.log('SAVE NEW INFOS ABOUT ITEM');
  
  }

  const Content = () => {
    return (
      <Scroller>
        <Container>
          <ImageSelector />
          <InputField
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <InputField
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            height={96}
          />
          <PriceInput/>
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
          <TextButton
            label="Salvar"
            onClick={save}
          />
        </Container>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}