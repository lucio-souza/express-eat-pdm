import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import FooterMenu from "../../components/footerMenu";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import axios from "axios";

const Avaliacoes = () => {
    interface Avaliacao {
        _id: string;
        idUser: string;
        nomeUsuario: string;
        nota: number;
    }

    interface Restaurante {
        _id: string;
        nome: string;
        avaliacao: number;
    }

    const { id } = useLocalSearchParams();
    const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]); // Estado para avaliações (array)

    // Buscar dados do restaurante
    useEffect(() => {
        const fetchRestaurante = async () => {
            try {
                const response = await axios.get(`http://192.168.2.108:8080/restaurantes/search/${id}`);
                setRestaurante(response.data);
                console.log("Restaurante:", response.data);  // Log da resposta
            } catch (error) {
                console.error("Erro ao buscar restaurante:", error);
            }
        };

        if (id) {
            fetchRestaurante();
        }
    }, [id]);

    // Buscar avaliações
    useEffect(() => {
        const fetchAvaliacoes = async () => {
            try {
                const response = await axios.get(`http://192.168.2.108:8080/restaurantes/avaliacoes/${id}`);
                setAvaliacoes(response.data);
                console.log("Avaliações:", response.data);  // Log da resposta
            } catch (error) {
                console.error("Erro ao buscar avaliações:", error);
            }
        };

        if (id) {
            fetchAvaliacoes();
        }
    }, [id]);

    console.log("Avaliacoes no estado:", avaliacoes); 

        const renderEstrelas = (nota: number) => {
            const estrelas = [];
            for (let i = 0; i < 5; i++) {
                estrelas.push(i < nota ? "⭐" : "☆");
            }
            return estrelas.join(" ");
        };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
                <Text style={styles.restauranteNome}>
                    {restaurante ? restaurante.nome : "Carregando restaurante..."}
                </Text>
            </View>

            <Text style={styles.title}>Avaliações</Text>

            <FlatList
                data={avaliacoes}
                keyExtractor={(item) => item._id}  // Usando _id como chave única
                renderItem={({ item }) => (
                    <View style={styles.avaliacaoItem}>
                        <Text style={styles.avaliacaoCliente}>Cliente: {item.nomeUsuario}</Text>
                        <Text style={styles.avaliacaoNota}>Nota: {item.nota}</Text>
                        <Text style={styles.estrelas}>{renderEstrelas(item.nota)}</Text>
                    </View>
                )}
            />
            <FooterMenu />
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    restauranteNome: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    avaliacaoItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    avaliacaoCliente: {
        fontSize: 16,
        fontWeight: "600",
        color: "#444",
    },
    avaliacaoNota: {
        fontSize: 14,
        color: "#888",
    },
    estrelas: {
        fontSize: 18,
        color: "#f1c40f", // Cor dourada das estrelas
        marginTop: 5,
    },
});

export default Avaliacoes;
