import { View, Image, Text, StyleSheet,TouchableOpacity } from "react-native";
import { ButtonCadastro } from "../../components/buttons/buttonCadastro";
import { router } from "expo-router";

const Start=()=>{

    function mudar(){
            router.replace("/login");
    }

 
    
    return(
        <View style={style.container}>
            <Image style={style.img} source={require('../../assets/logo.png')} /> 
            <Text style={style.texto}>BEM-VINDO</Text>
            <ButtonCadastro text={"Cadastro de Cliente"} Onchange={mudar}/>
            <ButtonCadastro text={"Cadastro de Restaurante"} Onchange={mudar}/>
            <TouchableOpacity >
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

export default Start;