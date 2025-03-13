import { StyleSheet, TextInput} from "react-native";

type props={
    text:string,
    valor:string,
    SetValor:(valor:string)=>void
}

export const Form=({text,valor,SetValor}:props)=>{
    return(
        <TextInput style={style.input} placeholder={text} value={valor} onChangeText={SetValor}/>
    )
}

const style=StyleSheet.create({
    input:{
        borderRadius:30,
        borderWidth:2,
        width:"70%",
        height:45,
        marginVertical:10,
        fontSize:15,
        textAlign:"center"

    }
})