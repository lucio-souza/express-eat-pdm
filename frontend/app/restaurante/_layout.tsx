import FooterMenu from "../../components/footerMenu";
import { View,Text,TouchableOpacity } from "react-native";
import {  } from "expo-router";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState,useEffect } from "react";
import axios from "axios";
import { router } from "expo-router";



const Restaurante = () => {

    interface Restaurante {
        _id: string;
        nome: string;
        avaliacao: number;
    }

    interface Item {
        _id: string;
        nome: string;
        valor: number;
        src: string;
        idRestaurante: string; 
    }


    const { id } = useLocalSearchParams();
    

    const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
    const [itens, setItens] = useState<Item[]>([]);


    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://192.168.2.108:8080/restaurantes/search/${id}`);
                setRestaurante(response.data);
                console.log(response.data);

                const itemsResponse = await axios.get('http://192.168.2.108:8080/itens');
                setItens(itemsResponse.data);


                
            } catch (error) {
                console.error('Erro ao buscar restaurante:', error);
            }
        };
        if (id) {
            fetch();
        }
    }, [id]);

    const getItensByRestaurante = (idRestaurante: string) => {
        return itens.filter((item) => item.idRestaurante === idRestaurante).slice(0, 1);
    };

    
    return (
        <View style={{height: "100%"}}>
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/logo.png")}></Image>
            <Text style={styles.texto} >Restaurante {restaurante?.nome} </Text>
        </View>
        <View style={styles.resContainer}>
            <Image style={styles.imagem} source={require("../../assets/16233540.png") }></Image>
            <Text style={styles.textoAvaliação}>Avaliação ⭐{restaurante?.avaliacao}</Text>
        </View>
        <View style={styles.itemsContainer}>
                {restaurante && getItensByRestaurante(restaurante._id).map((item) => (
                    <TouchableOpacity key={item._id} style={styles.itemCard} onPress={() => router.push(`/item`)}>
                        <Image source={{ uri: `http://192.168.2.108:8080/itens/image/uploads/${item.src.replace("uploads/", "")}` }} style={styles.itemImage} />
                        <View>
                            <Text style={styles.itemCardTitle}>{item.nome}</Text>
                            <Text style={styles.itemCardPrice}>R$ {item.valor}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <FooterMenu />
              </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        paddingRight: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoAvaliação:{
        marginTop: 10,
        fontSize: 20,
        color: '#000000',
    },
    texto:{
        fontSize: 20,
        color: '#000000',
        marginLeft: 60,
    },
    resContainer: {
        height: 200,
        flexDirection:"column",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderColor:"gray",
        borderRadius: 8,
    },
    itemsContainer: {
        flexDirection:"column",
        height: 250,
        marginTop: 40,

    },
    itemCard: {
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#C6D8D3',
        borderRadius: 8,
        width: "100%",
        height: 100,
        flexDirection:"row"
    },
    itemImage: {
        width: "50%",
        height: 100,
        borderRadius: 8,
    },
    itemCardTitle: {
        fontSize: 18,
        marginLeft: 10,
        marginTop: 12,
        marginBottom: 10,
    },
    itemCardPrice: {
        fontSize: 16,
        marginLeft: 10,
        color: '#C6D8D3',
    },
    imagem:{
        width: 200,
        height: 165
    },
    logo:{
        width: 100,
        height: 100
    }
});

export default Restaurante;