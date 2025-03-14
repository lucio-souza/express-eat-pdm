import { StyleSheet, TextInput,View,Text} from "react-native";

type props={
    text:string,
    valor:string,
    SetValor:(valor:string)=>void,
    errorMessage?: string
}

export const Form=({text,valor,SetValor,errorMessage}:props)=>{
    return(
        <View style={style.container}>
        <TextInput
          style={[style.input, errorMessage ? style.inputError : null]}  // Adicionando um estilo condicional se houver erro
          placeholder={text}
          value={valor}
          onChangeText={SetValor}
        />
        {errorMessage && <Text style={style.errorText}>{errorMessage}</Text>}  {/* Exibe a mensagem de erro */}
      </View>
    )
}

const style = StyleSheet.create({
    container: {
      width: '70%', // Adiciona um container para o campo e a mensagem de erro
    },
    input: {
      borderRadius: 30,
      borderWidth: 2,
      height: 45,
      marginVertical: 10,
      fontSize: 15,
      textAlign: 'center',
    },
    inputError: {
      borderColor: 'red',  // Cor de borda vermelha se houver erro
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 5,
    }
  });