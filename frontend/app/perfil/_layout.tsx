import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from '../../hooks/useAuth'; // Acessando o contexto
import FooterMenu from '../../components/footerMenu';
import axios from 'axios';
import { ButtonEnviar } from '../../components/buttons/buttonSalvar';
import { router } from 'expo-router';

const Perfil = () => {
  interface User {
    _id: string;
    nome: string;
    email: string;
    cpf: string;
    localizacao: {
      type: 'Point';
      coordinates: [number, number];
    };
  }

  const { email, deslogar,tokenState } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  function redirect() {
    router.push('/editar');
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (email) {
        try {
          const response = await axios.get(`http://192.168.2.108:8080/users/${email}`);
          setUser(response.data);
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      }
    };

    fetchUser();
  }, [email]);

  const Remover=async()=>{
    try {
      console.log(user?._id);
      
      await axios.delete(`http://192.168.2.108:8080/users/${user?._id}`,
        { headers: { Authorization: `Bearer ${tokenState}` }}
      )
      alert("Conta Apagada com sucesso");
      deslogar()
      
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>
      <Text style={styles.subheader}>Informações básicas</Text>
      <Image style={styles.imagem} source={require("../../assets/perfil.png")}></Image>

      <View style={styles.infoContainer}>
        <View style={styles.espaco}>
        <Text style={styles.infoText}>Usuario: <Text style={styles.infoValue}>{user?.nome}</Text></Text>
        </View>
        <View style={styles.espaco}>
        <Text style={styles.infoText}>Email: <Text style={styles.infoValue}>{user?.email}</Text></Text>
        </View>
        <View style={styles.espaco}>
        <Text style={styles.infoText}>CPF: <Text style={styles.infoValue}>{user?.cpf}</Text></Text>
        </View>
      </View>

      <ButtonEnviar text={"Apagar conta"} Press={Remover}/>

      <View style={styles.containerButton}>

      

      <ButtonEnviar text={"editar"} Press={redirect}/>

      <ButtonEnviar text={"sair"} Press={deslogar}/>
      </View>

      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
    espaco:{
        marginVertical:10
    },
    imagem:{
        width:100,
        height:100
    },
  containerButton:{
    flexDirection:"row",
    height:600,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 20,
    fontWeight: '500',
    color: '#555',
    marginBottom: 20,
  },
  infoContainer: {
    marginVertical:50,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#444',
  },
  infoValue: {
    fontWeight: 'bold',
    color: '#2C9C7B', // Cor verde para valores
  },
  button: {
    marginVertical: 10,
  },
});

export default Perfil;
