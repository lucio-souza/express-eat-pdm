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

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bem-vindo</Text>

            <Text style={styles.sectionTitle}>Melhores avaliações</Text>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>Pizza M de pepperoni</Text>
                <Text style={styles.itemPrice}>R$ 25,00</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>Açai 500ml + 6 complementos</Text>
                <Text style={styles.itemPrice}>R$ 20,00</Text>
            </View>

            <Text style={styles.sectionTitle}>Restaurantes</Text>
            <ScrollView>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante.id} style={styles.restaurantContainer}>
                        <Text style={styles.restaurantName}>{restaurante.nome}</Text>
                        <Text style={styles.restaurantRating}>
                            {restaurante.avaliacao === 0 ? "Restaurante novo" : `${restaurante.avaliacao} ⭐`}
                        </Text>

                        {/* Lista de itens do restaurante */}
                        <ScrollView horizontal style={styles.itemsContainer}>
                            {getItensByRestaurante(restaurante.id).map((item) => (
                                <View key={item.id} style={styles.itemCard}>
                                    <Image
                                        source={{ uri: item.src }}
                                        style={styles.itemImage}
                                    />
                                    <Text style={styles.itemCardTitle}>{item.nome}</Text>
                                    <Text style={styles.itemCardPrice}>R$ {item.valor}</Text>
                                </View>
                            ))}
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
        marginTop: 8,
    },
    itemCard: {
        marginRight: 16,
        width: 150,
    },
    itemImage: {
        width: 150,
        height: 100,
        borderRadius: 8,
    },
    itemCardTitle: {
        fontSize: 14,
        marginTop: 8,
    },
    itemCardPrice: {
        fontSize: 14,
        color: 'gray',
    },
});

export default Home;