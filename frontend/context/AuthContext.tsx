import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { Href, router } from 'expo-router';

interface IContexto {
    tokenState: string | null;
    email: string | null;
    logar: (email: string, password: string) => Promise<void>;
    deslogar: () => Promise<void>;
    checkToken: (namePage?: Href) => Promise<void>;
}

export const AuthContext = createContext<IContexto | undefined>(undefined);

interface IProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    async function logar(email: string, senha: string) {
        const dados = { email, senha };

        try {
            console.log(dados);
            const response = await axios.post('http://192.168.2.108:8080/users/login', dados);
            console.log(response.data);
            if (response.status == 404) {
                console.log('Credenciais inválidas');
            }

            const token = response.data as string;
            console.log(token);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;

            // Salvar o token e o email no AsyncStorage
            await AsyncStorage.setItem('auth.token', token);
            await AsyncStorage.setItem('auth.email', email); // Armazenar o email
            setTokenState(token);
            setEmail(email); // Atualizar o email no estado

            router.replace( '/home');
        } catch (error: any) {
            console.error('Erro ao fazer login:', error);
            throw new Error(error.response?.data?.message || "Credenciais inválidas");
        }
    }

    async function deslogar() {
        try {
            setTokenState(null);
            setEmail(null); // Limpar o email
            await AsyncStorage.removeItem('auth.token');
            await AsyncStorage.removeItem('auth.email'); // Remover o email
            axios.defaults.headers.common.Authorization = null;
            router.replace('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    async function checkToken(Href?: Href) {
        try {
            const tokenStorage = await AsyncStorage.getItem('auth.token');
            const emailStorage = await AsyncStorage.getItem('auth.email'); // Buscar o email também
            console.log('Token:', tokenStorage);

            if (tokenStorage && emailStorage) {
                axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
                const response = await axios.get("http://192.168.2.108:8080/validate-token", {
                    headers: {
                        Authorization: `Bearer ${tokenStorage}`,
                    },
                });

                if (response.status === 200) {
                    if (!Href) {
                        return;
                    }
                    setEmail(emailStorage); // Definir o email no estado
                    router.replace(Href);
                }
            }
        } catch (error) {
            console.error('Erro ao verificar o token:', error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const tokenStorage = await AsyncStorage.getItem('auth.token');
                const emailStorage = await AsyncStorage.getItem('auth.email'); // Buscar o email do AsyncStorage

                if (tokenStorage && emailStorage) {
                    axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
                    setTokenState(tokenStorage);
                    setEmail(emailStorage); // Definir o email no estado
                }
            } catch (error) {
                console.error('Erro ao recuperar o token do AsyncStorage:', error);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ tokenState, email, logar, deslogar, checkToken }}>
            {children}
        </AuthContext.Provider>
    );
}
