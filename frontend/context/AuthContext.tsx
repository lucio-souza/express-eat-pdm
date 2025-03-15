import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { Href, router } from 'expo-router';

interface IContexto {
    tokenState: string | null;
    logar: (email: string, password: string) => Promise<void>;
    deslogar: () => Promise<void>;
    checkToken: (namePage?: Href) => Promise<void>;
}

export const AuthContext = createContext<IContexto>({
    tokenState: null,
    logar: async () => {},
    deslogar: async () => {},
    checkToken: async () => {},
});

interface IProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);

    
    async function logar(email: string, senha: string) {
        const dados = { email, senha};

        try {
            
            console.log(dados);
            const response = await axios.post('http://192.168.2.108:8080/users/login', dados);
            console.log(response.data);
            if (response.status == 404) {
                console.log('Credenciais inválidas');
            }
            
            
            

            const  token  = response.data as string
            console.log(token);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;

            await AsyncStorage.setItem('auth.token', token);
            setTokenState(token); 
            
            router.push({pathname: '/home',params:{email:email}}); 

        } catch (error:any) {
            console.error('Erro ao fazer login:', error);
            throw new Error(error.response?.data?.message || "Credenciais inválidas");
            
            
        }
    }


    async function deslogar() {
        try {
            setTokenState(null); 
            await AsyncStorage.removeItem('auth.token'); 

            axios.defaults.headers.common.Authorization = null; 
            router.replace('/login'); 

        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }


    async function checkToken(Href?: Href) {
        try {
            const tokenStorage = await AsyncStorage.getItem('auth.token');
            console.log('Token:', tokenStorage);

            if (tokenStorage) {
                axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`; 
                const response = await axios.get("http://192.168.2.108:8080/validate-token", {
                    headers: {
                        Authorization: `Bearer ${tokenStorage}`,
                    },
                });

                if (response.status === 200) {
                    if (!Href){
                        return
                    }
                    router.replace(Href);
                }
            } 
        } catch (error) {
            console.error('Erro ao verificar o token:', error);
            router.replace('/login'); 
        }
    }


    useEffect(() => {
        (async () => {
            try {
                const tokenStorage = await AsyncStorage.getItem('auth.token'); 

                if (tokenStorage) {
                    axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
                    setTokenState(tokenStorage); 
                }
            } catch (error) {
                console.error('Erro ao recuperar o token do AsyncStorage:', error);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ tokenState, logar, deslogar, checkToken }}>
            {children}
        </AuthContext.Provider>
    );
}