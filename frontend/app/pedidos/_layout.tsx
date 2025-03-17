import { View, Text, Image, StyleSheet,FlatList } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import FooterMenu from "../../components/footerMenu";

const Pedidos = () => {
    const { email } = useAuth();

    interface Pedido {
        _id: string;
        itens: Item[];
        descricao: string;
        statusEntrega: string;
        statusPagamento: string;
        usuario: string;
        preco: number;
    }

    interface Item {
        _id: string;
        idItem: { 
            _id: string;
            nome: string;
            valor: number;
        };
        quantidade: number;
    }

    interface User {
        _id: string;
    }

    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [user, setUser] = useState<User | null>(null);

    // Busca o usuário pelo e-mail
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://192.168.2.108:8080/users/${email}`);
                setUser(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };
        if (email) {
            fetchUser();
        }
    }, [email]);

    // Busca os pedidos do usuário
    useEffect(() => {
        const fetchPedidos = async () => {
            if (!user?._id) return;

            try {
                const pedidosResponse = await axios.get(`http://192.168.2.108:8080/pedidos/${user._id}`);
                setPedidos(pedidosResponse.data);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
            }
        };

        if (user) {
            fetchPedidos();
        }
    }, [user]);

    return (
        <View style={{height:"100%"}}>
            <View style={{ flexDirection: "row" }}>
                <Image source={require("../../assets/logo.png")} />
                <Text style={styles.text}>Meus Pedidos</Text>
            </View>
            <FlatList
                data={pedidos}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.pedidoCard}>
                        <Text style={styles.pedidoDescricao}>Descrição {item.descricao}</Text>
                        <Text style={styles.pedidoPreco}>Preço total: R${item.preco}</Text>
                        <Text style={styles.pedidoStatus}>
                            Status: {item.statusEntrega} | Pagamento: {item.statusPagamento}
                        </Text>
                        <View style={styles.itensContainer}>
                            {item.itens.map((item) => (
                                <View key={item._id} style={styles.itemCard}>
                                    <Text style={styles.itemNome}>{item.idItem.nome}</Text>
                                    <Text style={styles.itemQuantidade}>Quantidade: {item.quantidade}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            />
            <FooterMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "bold",
        left: 20,
        top: 40,
    },
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    pedidoCard: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    pedidoDescricao: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    pedidoPreco: {
        fontSize: 16,
        color: "#e74c3c",
        marginVertical: 5,
    },
    pedidoStatus: {
        fontSize: 14,
        color: "#7f8c8d",
    },
    itensContainer: {
        marginTop: 10,
    },
    itemCard: {
        marginBottom: 10,
    },
    itemNome: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    itemQuantidade: {
        fontSize: 14,
        color: "#7f8c8d",
    },
});

export default Pedidos;
