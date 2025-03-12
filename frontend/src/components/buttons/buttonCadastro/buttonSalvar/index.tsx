import {Text,TouchableOpacity, StyleSheet } from "react-native";

export const ButtonEnviar=()=>{
    return(
        <TouchableOpacity style={style.button}>
            <Text style={style.text}>Enviar</Text>
        </TouchableOpacity>
    )
}

const style=  StyleSheet.create({
    button:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#8FCFEE",
        borderRadius:30,
        width:"20%",
        height:"7%",
        marginTop:20
    },
    text:{
        textAlign:"center",
        color:"#0C3950",
        fontSize:16
    }

})