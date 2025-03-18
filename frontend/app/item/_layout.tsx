import FooterMenu from "../../components/footerMenu";
import { View,Text,TouchableOpacity } from "react-native";
import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState,useEffect } from "react";
import axios from "axios";
import { router } from "expo-router";
import { ButtonEnviar } from "../../components/buttons/buttonSalvar";
import { useAuth } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

const Item=()=>{

    interface Item {
        _id: string;
        nome: string;
        valor: number;
        src: string;
        idRestaurante: string; 
        quantidade:number;
    }
    interface Restaurante{
        _id:string;
         nome:string
    }
    interface Pedido{
        itens:Item;
        descricao:string,
        usuario:string
    }
    interface User {
        _id: string;
        email: string;
    }

    const {email}=useAuth();

    const { id } = useLocalSearchParams();

    const [itens, setItens] = useState<Item>();
    const [restaurante,setRestaurante]=useState<Restaurante>();
    const [quant,setQuant]=useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [mensagemErro, setMensagemErro] = useState("");

    function somar() {
        setQuant((prev) => {
            if (prev >= (itens?.quantidade ?? 0)) {
                setMensagemErro("Quantidade máxima atingida");
                return prev;
            }
            
            return prev + 1;
        });
    }

    function subtrair() {
        setQuant((prev) => (prev > 0 ? prev - 1 : prev));
        setMensagemErro(""); 
    }
    

    useEffect(() => {
        const fetch = async () => {
            try {

                const itemsResponse = await axios.get(`http://192.168.2.108:8080/itens/search/${id}`);
                setItens(itemsResponse.data);
                console.log(itemsResponse.data);

                const response = await axios.get(`http://192.168.2.108:8080/users/${email}`);
                setUser(response.data);
                
            } catch (error) {
                console.error('Erro ao buscar item:', error);
            }
        };

        if (id) {
            fetch();
        }
    }, [id]);

        async function fetchPedido(){
            try {
                const itemsResponse = await axios.post(`http://192.168.2.108:8080/pedidos`,{
                    itens: [{ 
                        idItem: itens?._id, 
                        quantidade: quant 
                    }],
                    usuario:user?._id,
                    descricao:"pedido feito"
            });
            console.log(itemsResponse.data);
            router.push({pathname:'/restaurante',params:{id:itens?.idRestaurante}})
            alert("pedido realizado com sucesso")
            
            } catch (error) {
                console.log("deu errado",error);
            }
        }

    useEffect(() => {
        const fetchRestaurante = async () => {
          if (itens?.idRestaurante) { 
            try {
              const restauranteResponse = await axios.get(`http://192.168.2.108:8080/restaurantes/search/${itens.idRestaurante}`);
              setRestaurante(restauranteResponse.data);
            } catch (error) {
              console.log("Erro ao buscar restaurante", error);
            }
          }
        };
    
        fetchRestaurante();
      }, [itens?.idRestaurante]);

      function handleRedirect(){
        router.push({pathname:'/restaurante',params:{id:itens?.idRestaurante}})
      }
    return(
        <View>
            <Image source={require("../../assets/logo.png")}></Image>

            <View style={style.container}>
                <Image style={style.img} source={{uri:`http://192.168.2.108:8080/itens/image/uploads/${itens?.src.replace('uploads/',"")}`}}></Image>
                <Text style={style.textoItem}>{itens?.nome}</Text>
                <Text style={style.textoRes}>Restaurante {restaurante?.nome}</Text>
                <Text style={style.itemPreco}>Preco R$ {itens?.valor}</Text>
            </View>
            
            <View>
            <View>
                <Text style={style.textoItem}>Valor Final: R$ {itens ? (itens.valor * quant).toFixed(2) : "0.00"}</Text>
                
            </View>
            </View>
            <View >
            {mensagemErro !== "" && <Text style={style.erro}>{mensagemErro}</Text>}
            <View style={style.buttons}>
                <Text style={style.quant}>Quantidade</Text>
                <ButtonEnviar text="-" Press={subtrair}/>
                <Text style={style.quant}>{quant}</Text>
                <ButtonEnviar text="+" Press={somar}/>
                </View>
            </View>
            



            <View style={style.buttonSalvar}>
                
                <ButtonEnviar text="Adicionar" Press={fetchPedido} />
                <ButtonEnviar text="Cancelar" Press={handleRedirect} />
            </View>
        </View>
    )
}
const style=StyleSheet.create({

    container:{
        marginTop:20,
        marginHorizontal:30,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        borderWidth:1,
        borderRadius:25,
        height:310,
        paddingLeft:10
    },
    itemPreco:{
        marginTop:15,
        fontSize:20
    },
    buttons:{
        width:200,
        height:500,
        flexDirection:"row",
        paddingLeft:40,
    },
    buttonSalvar:{
        marginTop:-600,
        flexDirection:"row",
        alignItems:"center",
        height:600
    },
    img:{
        width:350,
        borderRadius:20,
        height:150,
        backgroundColor:"black",
        marginLeft:-10
    },
    textoItem:{
        marginVertical:20,
        fontSize:30,
        fontWeight:"bold",
        textAlign:"center"
    },
    textoRes:{
        fontSize:20,
        fontWeight:"500",
        color:"gray"
    },
    quant:{
        marginTop:20,
        fontSize:26
    },
    erro: {
        marginTop:0,
        color: "red",
        fontSize: 16,
        textAlign: "center"
    }

})
export default Item;