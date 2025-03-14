import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FooterMenu from '../../components/footerMenu';
import axios from 'axios';
import { router } from 'expo-router';

const Home = () => {

    

    interface Item {
        id: number;
        nome: string;
        valor: number;
        src: string;
        restauranteId: number; // Relacionamento com o restaurante
    }

    interface Restaurante {
        id: number;
        nome: string;
        avaliacao: number;
        price: string;
    }

    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [itens, setItens] = useState<Item[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restaurantsResponse = await axios.get('http://10.3.21.50:8080/restaurantes');
                setRestaurantes(restaurantsResponse.data);

                
                const itemsResponse = await axios.get('http://10.3.21.50:8080/itens');
                setItens(itemsResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    // Função para filtrar os itens de um restaurante específico
    const getItensByRestaurante = (restauranteId: number) => {
        return itens.filter((item) => item.restauranteId === restauranteId);
    };


    

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bem-vindo</Text>

            <Text style={styles.textItem}>Recomendações</Text>

            <View style={styles.itemsContainer}>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante.id} >

                        <View>
                            {getItensByRestaurante(restaurante.id).map((item) => {return(
                                
                                <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => router.push({ pathname: '/item', params: { restauranteId: restaurante.id } })}>
                                    <Image source={{ uri: `http://10.3.21.50:8080/itens/image/${item.src.replace("uploads/","")}` }} style={styles.itemImage} />

                                    <View style={styles.itemCardFlex}>
                                    <Text style={styles.itemCardTitle}>{item.nome}</Text>
                                    
                                    <Text style={styles.itemCardPrice}>R$ {item.valor}</Text>
                                    </View>
                                </TouchableOpacity>
                                )
})}
                        </View>
                    </View>
                ))}
            </View>

            <View>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante.id}>

                        <View  style={styles.itemsContainer}>
                            {getItensByRestaurante(restaurante.id).map((item) => {return(
                                
                                
                                    <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => router.push(`/item`)}>
                                    <Image source={{ uri: `http://192.168.2.108:8080/itens/image/${item.src.replace("uploads/","")}` }} style={styles.itemImage} />

                                    <View style={styles.itemCardFlex}>
                                    <Text style={styles.itemCardTitle}>{item.nome}</Text>
                                    
                                    <Text style={styles.itemCardPrice}>R$ {item.valor}</Text>
                                    </View>
                                    </TouchableOpacity>
                                )
})}
                        </View>
                    </View>
                ))}
            </View>


            
            <View style={styles.res}>
            <Text style={styles.sectionTitle}>Restaurantes</Text>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante.id} style={styles.restaurantContainer}>

                        
                        <TouchableOpacity onPress={() => router.push('/restaurante')}>
                        <Image source={require("../../assets/Mansao.png")}></Image>
                        </TouchableOpacity>
                        <View style={styles.restauranteCard}>
                        <Text style={styles.restaurantName}>{restaurante.nome}</Text>
                        <Text style={styles.restaurantRating}>
                            {restaurante.avaliacao === 0 ? "Restaurante novo" : `${restaurante.avaliacao} ⭐`}
                        </Text>
                        <View  >
                            {getItensByRestaurante(restaurante.id).map((item) => {return(
                                
                                <View key={item.id} style={styles.itemCard}>
                                    
                                    <Text style={styles.itemCardPriceRes}>Menor preço R$ {item.valor}</Text>
                                </View>
                                )
})}
                        </View>
                        </View>


                    </View>
                ))}
            </View>

            <FooterMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 16,
        flexDirection:"column",
    },
    itemTitle: {
        fontSize: 16,
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
        height: 100,
        marginTop: 50,
        borderWidth: 1,
        borderColor:"gray",
        borderRadius: 8,
    },
    itemCard: {
        marginRight: 16,
        width: "100%",
        height: 200,
        flexDirection:"row"
    },
    itemImage: {
        width: "50%",
        height: 100,
        borderRadius: 8,
    },
    itemCardTitle: {
        fontSize: 20,
        marginTop: 12,
        marginLeft: 10,
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
    itemCardFlex:{
        flexDirection:"column"
    },
    res:{
        marginTop:40
    }
});

export default Home;