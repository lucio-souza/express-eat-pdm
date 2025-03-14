import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import FooterMenu from '../../components/footerMenu';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
    interface Restaurante {
        id: number;
        nome: string;
        avaliacao: number;
        price: string;
    }

    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [nomeUsuario, setNomeUsuario] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const { tokenState, checkToken } = useAuth(); // Acessa o token e a função checkToken

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Verifica se o token é válido
                await checkToken('/home');

                if (tokenState) {
                    console.log('Token:', tokenState); // Log do token para depuração

                    // Faz a requisição para buscar o nome do usuário
                    const userResponse = await axios.get(`http://192.168.2.108:8080/users/me`, {
                        headers: { Authorization: `Bearer ${tokenState}` },
                    });
                    setNomeUsuario(userResponse.data.nome);

                    // Faz a requisição para buscar os restaurantes
                    const restaurantsResponse = await axios.get('http://192.168.2.108:8080/restaurantes', {
                        headers: { Authorization: `Bearer ${tokenState}` },
                    });
                    setRestaurantes(restaurantsResponse.data);
                } else {
                    console.error('Token não está disponível');
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tokenState, checkToken]); // Adiciona tokenState e checkToken como dependências

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bem vindo, {nomeUsuario || 'Usuário'}</Text>

            <Text style={styles.sectionTitle}>Melhores avaliações</Text>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>Pizza M de peperoni</Text>
                <Text style={styles.itemPrice}>R$ 25,00</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>Açai 500ml + 6 com...</Text>
                <Text style={styles.itemPrice}>R$ 20,00</Text>
            </View>

            <Text style={styles.sectionTitle}>Restaurantes</Text>
            <ScrollView>
                {restaurantes.map((restaurante) => (
                    <View key={restaurante.id} style={styles.restaurantContainer}>
                        <Text style={styles.restaurantName}>{restaurante.nome}</Text>
                        <Text style={styles.restaurantRating}>
                            {restaurante.avaliacao === 0 ? "Restaurante novo" : restaurante.avaliacao}
                        </Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    restaurantName: {
        fontSize: 16,
        flex: 1,
    },
    restaurantRating: {
        fontSize: 16,
        marginRight: 8,
    },
});

export default Home;