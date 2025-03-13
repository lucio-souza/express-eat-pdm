import {Text,TouchableOpacity, StyleSheet } from "react-native";

type props={
    text:string
}

export const ButtonEnviar=({text}:props)=>{
    return(
        <TouchableOpacity style={style.button}>
            <Text style={style.text}>{text}</Text>
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
        padding:10,
        width:"20%",
        height:"8%",
        marginTop:20,
        marginHorizontal:20,
    },
    text:{
        textAlign:"center",
        color:"#0C3950",
        fontSize:16
    }
})