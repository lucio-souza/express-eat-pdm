import { View, Image, Text, StyleSheet,TouchableOpacity } from "react-native";
import { Form } from "../../components/form";
import { useState } from "react";
import { ButtonEnviar } from "../../components/buttons/buttonSalvar";

const Login=()=>{

    const [email,setEmail]=useState("");
    const [senha,setSenha]=useState("");
    
    return(
        <View style={style.container}>
            <Image style={style.img} source={require('../../assets/logo.png')} /> 
            <Text style={style.texto}>Login</Text>

            <Form valor={email} SetValor={setEmail} text="Digite Seu Email"/>
            <Form valor={senha} SetValor={setSenha} text="Digite Sua Senha"/>

                       
                <ButtonEnviar text={"Enviar"}/>
            <TouchableOpacity>
                <Text style={style.textoConta}>Faça o Cadastro como cliente</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={style.textoConta}>Faça o Cadastro Como Restaurante</Text>
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
        fontWeight:"400",
        marginBottom:20
    },
    textoConta:{
        color:"#0C3950",
        textDecorationLine:"underline",
        marginTop:30
    },
    button:{
        width:"100%",
        backgroundColor:"black",
        height:"7%",
        alignItems:"center",
        flexDirection:"row",
    }
})

export default Login;