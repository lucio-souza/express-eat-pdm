import { View, Image, Text, StyleSheet,TouchableOpacity } from "react-native";
import { ButtonCadastro } from "../../components/buttons/buttonCadastro";

export const Start=()=>{
    return(
        <View style={style.container}>
            <Image style={style.img} source={require('../../../assets/logo.png')} /> 
            <Text style={style.texto}>BEM-VINDO</Text>
            <ButtonCadastro text={"Cadastro de Cliente"}/>
            <ButtonCadastro text={"Cadastro de Restaurante"}/>
            <TouchableOpacity>
                <Text style={style.textoConta}>Já possui conta? Faça Log In</Text>
                </TouchableOpacity>
        </View>
    )
}

const style=StyleSheet.create({
    container:{
        flexDirection:"column",
        marginVertical:10,
        alignItems:"center"
    },
    img:{
        marginVertical:100
    }, 
    texto:{
        fontSize:40,
        fontWeight:"400"
    },
    textoConta:{
        color:"#0C3950",
        textDecorationLine:"underline",
        marginTop:20
    }
})