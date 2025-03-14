import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import FooterMenu from '../../components/footerMenu';
import axios from 'axios';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca a lista de restaurantes
                const restaurantsResponse = await axios.get('http://192.168.2.108:8080/restaurantes');
                setRestaurantes(restaurantsResponse.data);

                // Busca a lista de itens
                const itemsResponse = await axios.get('http://192.168.2.108:8080/itens');
                setItens(itemsResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false); // Finaliza o carregamento
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
            <ScrollView style={styles.itemsContainer}>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante.id} style={styles.itemsContainer}>

                        <ScrollView  style={styles.itemsContainer}>
                            {getItensByRestaurante(restaurante.id).map((item) => {return(
                                
                                <View key={item.id} style={styles.itemCard}>
                                    <Image source={{ uri: `http://192.168.2.108:8080/itens/image/${item.src.replace("uploads/","")}` }} style={styles.itemImage} />

                                    <Text style={styles.itemCardTitle}>{item.nome}</Text>
                                    
                                    <Text style={styles.itemCardPrice}>R$ {item.valor}</Text>
                                </View>
                                )
})}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>

            <ScrollView>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante.id}>

                        <ScrollView  style={styles.itemsContainer}>
                            {getItensByRestaurante(restaurante.id).map((item) => {return(
                                
                                <View key={item.id} style={styles.itemCard}>
                                    <Image source={{ uri: `http://192.168.2.108:8080/itens/image/${item.src.replace("uploads/","")}` }} style={styles.itemImage} />

                                    <Text style={styles.itemCardTitle}>{item.nome}</Text>
                                    
                                    <Text style={styles.itemCardPrice}>R$ {item.valor}</Text>
                                </View>
                                )
})}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>


            <Text style={styles.sectionTitle}>Restaurantes</Text>
            <ScrollView>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante.id} style={styles.restaurantContainer}>
                        <Image source={require("../../assets/Mansao.png")}></Image>
                        <Text style={styles.restaurantName}>{restaurante.nome}</Text>
                        <Text style={styles.restaurantRating}>
                            {restaurante.avaliacao === 0 ? "Restaurante novo" : `${restaurante.avaliacao} ⭐`}
                        </Text>
                        <ScrollView  style={styles.itemsContainer}>
                            {getItensByRestaurante(restaurante.id).map((item) => {return(
                                
                                <View key={item.id} style={styles.itemCard}>
                                    
                                    <Text style={styles.itemCardPrice}>Menor preço R$ {item.valor}</Text>
                                </View>
                                )
})}
                        </ScrollView>
                    </View>
                ))}
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
        color: 'gray',
    },
    restaurantContainer: {
        marginBottom: 24,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    restaurantRating: {
        fontSize: 16,
        marginTop: 4,
        color: 'orange',
    },
    itemsContainer: {
        flexDirection:"column",
        marginTop: 8,
    },
    itemCard: {
        marginRight: 16,
        width: "100%",
        height: 200,
    },
    itemImage: {
        width: "50%",
        height: 100,
        borderRadius: 8,
    },
    itemCardTitle: {
        fontSize: 20,
        marginTop: 12,
    },
    itemCardPrice: {
        fontSize: 16,
        color: 'gray',
    },
    textItem:{
        fontSize: 20
    }
});

export default Home;