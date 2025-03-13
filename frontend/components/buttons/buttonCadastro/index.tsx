import { View,Text,TouchableOpacity, StyleSheet } from "react-native";

type props={
    text:string,
    Onchange:()=>void
}

export const ButtonCadastro=({text,Onchange}:props)=>{
    return(
        <TouchableOpacity style={style.button} onPress={Onchange}>
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
        width:"70%",
        height:"7%",
        borderColor:"#0C3950",
        borderWidth:2,
        marginVertical:20,
        shadowColor:"black",
        shadowOpacity:0.9,
        shadowOffset:{width: 100, height: 100 },
        shadowRadius: 0,
        elevation:10
    },
    text:{
        textAlign:"center",
        color:"#0C3950",
        fontSize:16
    }

})