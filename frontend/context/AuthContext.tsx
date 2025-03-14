import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { Href, router } from 'expo-router';

interface IContexto {
    tokenState: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkToken: (namePage?: Href) => Promise<void>;
}

export const AuthContext = createContext<IContexto>({
    tokenState: null,
    login: async () => {},
    logout: async () => {},
    checkToken: async () => {},
});

interface IProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);

    // Função para fazer login
    async function login(email: string, password: string) {
        const dados = { email, password };

        try {
            const response = await axios.post('/users/login', dados);

            if (response.data.error) {
                throw new Error('Credenciais inválidas');
            }

            const { token } = response.data as { token: string, name: string };
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;

            await AsyncStorage.setItem('token', token); // Armazena o token no AsyncStorage
            setTokenState(token); // Atualiza o estado do token
            router.replace('/home'); // Redireciona para a tela inicial

        } catch (error) {
            throw error; // Lança o erro para ser tratado no componente
        }
    }

    // Função para fazer logout
    async function logout() {
        try {
            setTokenState(null); // Remove o token do estado
            await AsyncStorage.removeItem('token'); // Remove o token do AsyncStorage

            axios.defaults.headers.common.Authorization = null; // Remove o token do cabeçalho do axios
            router.replace('/login'); // Redireciona para a tela de login

        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    // Função para verificar o token
    async function checkToken(namePage?: Href) {
        try {
            const tokenStorage = await AsyncStorage.getItem('token'); // Recupera o token do AsyncStorage

            if (tokenStorage) {
                axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`; // Define o token no cabeçalho do axios

                // Verifica se o token é válido
                const response = await axios.get("/", {
                    headers: {
                        Authorization: `Bearer ${tokenStorage}`,
                    },
                });

                if (response.status === 200) {
                    setTokenState(tokenStorage); // Atualiza o estado do token

                    // Redireciona para a página especificada (se fornecida)
                    if (namePage) {
                        router.replace(namePage);
                    }
                }
            } else {
                // Se não houver token, redireciona para a tela de login
                router.replace('/login');
            }
        } catch (error) {
            console.error('Erro ao verificar o token:', error);
            router.replace('/login'); // Redireciona para a tela de login em caso de erro
        }
    }

    // Efeito para carregar o token ao inicializar o app
    useEffect(() => {
        (async () => {
            try {
                const tokenStorage = await AsyncStorage.getItem('token'); // Recupera o token do AsyncStorage

                if (tokenStorage) {
                    axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`; // Define o token no cabeçalho do axios
                    setTokenState(tokenStorage); // Atualiza o estado do token
                }
            } catch (error) {
                console.error('Erro ao recuperar o token do AsyncStorage:', error);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ tokenState, login, logout, checkToken }}>
            {children}
        </AuthContext.Provider>
    );
}