import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FooterMenu from '../../components/footerMenu';
import axios from 'axios';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';


const Home = () => {

    interface Item {
        _id: string;
        nome: string;
        valor: number;
        src: string;
        idRestaurante: string; 
    }

    interface Restaurante {
        _id: string;
        nome: string;
        avaliacao: number;
        price: string;
    }
    interface User {
        id: string;
        nome: string;
        email: string;
    }

    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [itens, setItens] = useState<Item[]>([]);
    const [user, setUser] = useState<User | null>(null);

    const { email} = useLocalSearchParams();



    useEffect(() => {
        const fetch=async()=>{
            try {
                const response = await axios.get(`http://192.168.2.108:8080/users/${email}`);
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
            }
        const fetchData = async () => {
            try {
                const restaurantsResponse = await axios.get('http://192.168.2.108:8080/restaurantes');
                setRestaurantes(restaurantsResponse.data);

                
                const itemsResponse = await axios.get('http://192.168.2.108:8080/itens');
                setItens(itemsResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        if (email) {
            fetch();
        }
        fetchData();
    }, [email]);

    const getItensByRestaurante = (idRestaurante: string) => {
        return itens.filter((item) => item.idRestaurante === idRestaurante).slice(0, 1);
    };


    

    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.welcomeText}>Bem-vindo, {user ? user.nome : 'Visitante'}</Text>

            <Text style={styles.textItem}>Recomendações</Text>

            <View style={styles.itemsContainer}>
            {restaurantes.map((restaurante) => (
    <View key={restaurante._id} style={styles.itemContainer}>
        {getItensByRestaurante(restaurante._id).map((item) => (
            
            
            <TouchableOpacity key={item._id} style={styles.itemCard} onPress={() => router.push(`/item`)}>
                <Image source={{ uri: `http://192.168.2.108:8080/itens/image/uploads/${item.src.replace("uploads/","")}` }} style={styles.itemImage} />
                <View >
                    <Text style={styles.itemCardTitle}>{item.nome}</Text>
                    <Text style={styles.itemCardPrice}>R$ {item.valor}</Text>
                </View>
            </TouchableOpacity>
        ))}
    </View>
))}
            </View>
            <ScrollView style={styles.res}>
            <Text style={styles.sectionTitle}>Restaurantes</Text>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante._id} style={styles.restaurantContainer}>

                        
                        <TouchableOpacity onPress={() =>{
                         router.push({ pathname: '/restaurante',params: { id: restaurante._id } })}}>  
                        <Image style={styles.imagem} source={require("../../assets/16233540.png")}></Image>
                        </TouchableOpacity>
                        <View style={styles.restauranteCard}>
                        <Text style={styles.restaurantName}>{restaurante.nome}</Text>
                        <Text style={styles.restaurantRating}>
                            {restaurante.avaliacao === 0 ? "Restaurante novo" : `${restaurante.avaliacao} ⭐`}
                        </Text>
                        <View  >
                            {getItensByRestaurante(restaurante._id).map((item) => {return(
                                
                                <View key={item._id} style={styles.itemCard}>
                                    
                                    <Text style={styles.itemCardPriceRes}>Menor preço R$ {item.valor}</Text>
                                </View>
                                )
})}
                        </View>
                        </View>


                    </View>
                ))}
            </ScrollView>
            </ScrollView>

            <FooterMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    itemContainer: {
        height: 100,
        flexDirection:"column",
        borderWidth: 1,
        marginBottom: 30,
        borderColor:"gray",
        borderRadius: 8,
    },
    itemPrice: {
        fontSize: 14,
        color: '#C6D8D3',
    },
    restaurantContainer: {
        marginBottom: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
        height: 167,
        borderWidth: 1,
        borderColor:"gray",
        borderRadius: 8,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    restaurantRating: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
        color: 'orange',
    },
    itemsContainer: {
        flexDirection:"column",
        height: 250,
        marginTop: 40,

    },
    itemCard: {
        marginRight: 16,
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
    itemCardPriceRes: {
        fontSize: 16,
        
        color: '#C6D8D3',
    },
    itemCardPrice: {
        fontSize: 16,
        marginLeft: 10,
        color: '#C6D8D3',
    },
    textItem:{
        fontSize: 20
    },
    restauranteCard:{
        marginHorizontal: 30,
        marginVertical: 10,
    },
    res:{
        marginTop:40
    },
    imagem:{
        width: 200,
        height: 165
    }
});

export default Home;