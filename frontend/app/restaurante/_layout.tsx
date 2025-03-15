import FooterMenu from "../../components/footerMenu";
import { View,Text } from "react-native";
import {  } from "expo-router";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState,useEffect } from "react";
import axios from "axios";


const Restaurante = () => {

    interface Restaurante {
        _id: string;
        nome: string;
    }

    const { id } = useLocalSearchParams();
    console.log(id,"deu cero");
    

    const [restaurante, setRestaurante] = useState<Restaurante | null>(null);


    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://192.168.2.108:8080/restaurantes/search/${id}`);
                setRestaurante(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.error('Erro ao buscar restaurante:', error);
            }
        };
        if (id) {
            fetch();
        }
    }, [id]);

    
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/logo.png")}></Image>
            <Text >Restaurante ID:{restaurante?.nome} </Text>
            <FooterMenu />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 160,
        height: 2200,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Restaurante;