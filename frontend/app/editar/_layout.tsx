import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import Mapa from "../../components/mapa";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { ButtonEnviar } from "../../components/buttons/buttonSalvar";

const Editar = () => {
  interface User {
    _id: string;
    nome: string;
    idade: number;
    localizacao: {
      type: "Point";
      coordinates: [number, number];
    };
  }

  const { email, tokenState } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: -6.8691,
     longitude: -38.5661
  });

  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [senha, setSenha] = useState("");

  // Busca os dados do usuário ao carregar a tela
  useEffect(() => {
    const fetchUser = async () => {
      if (email) {
        try {
          const response = await axios.get(`http://192.168.2.108:8080/users/${email}`);
          setUser(response.data);
          const userLatitude = response.data.localizacao.coordinates[1];
          const userLongitude = response.data.localizacao.coordinates[0];

          setSelectedLocation({
            latitude: userLatitude,
            longitude: userLongitude,
          });

          // Preenche os estados com os dados do usuário
          setNome(response.data.nome);
          setIdade(String(response.data.idade)); // Converte para string para o TextInput
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      }
    };
    fetchUser();
  }, [email]);

  // Função para validar os dados do formulário
  const validateForm = () => {
    if (!nome || !idade || !senha) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return false;
    }

    if (isNaN(Number(idade))) {
      Alert.alert("Erro", "Idade deve ser um número.");
      return false;
    }

    if (senha.length < 4) {
      Alert.alert("Erro", "A senha deve ter pelo menos 4 caracteres.");
      return false;
    }

    return true;
  };

  // Função para enviar os dados
  const onSubmit = async () => {
    if (!validateForm()) return;


    if(user && tokenState){
      try {
        const userUpdate = await axios.put(`http://192.168.2.108:8080/users/${user?._id}`,
          {      
            nome:nome,
            idade: Number(idade),
            senha:senha,
            localizacao: {
              type: "Point",
              coordinates: [selectedLocation?.longitude, selectedLocation?.latitude],
            }},{ headers: { Authorization: `Bearer ${tokenState}` } }
        );
        console.log("Usuário atualizado com sucesso", userUpdate.data);
        Alert.alert("Dados atualizados com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        Alert.alert("Erro", "Não foi possível atualizar os dados.");
      }
    }

  };

  function redirect(){
    router.replace('/perfil')
  }

  if (selectedLocation === null) {
    return <Text>Carregando localização...</Text>;
  }

  return (
    <View style={style.container}>

      <Text style={style.texto}>Atualize Seus Dados</Text>

      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        style={style.input}
      />
      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
        style={style.input}
      />
      <TextInput
        value={idade}
        onChangeText={setIdade}
        placeholder="Digite sua idade"
        keyboardType="numeric"
        style={style.input}
      />

<View style={style.mapa}>
    <Mapa
      initialLocation={selectedLocation}
      onLocationSelect={setSelectedLocation}
    />
</View>
      <View style={style.containerButtons}>
      <ButtonEnviar text="Atualizar" Press={onSubmit} />
      <ButtonEnviar text="Voltar" Press={redirect} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    padding: 16,
    alignItems:"center"
  },
  mapa:{
    height:150,
    width:350,
    alignItems:"center",
    marginBottom:30
  },
  texto:{
    fontSize:20,
    marginBottom:30
  },
  containerButtons:{
    flexDirection:'row',
    height:600
  },
  input: {
    borderWidth: 1,
    width:"100%",
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 8,
    marginBottom: 50,
  },
});

export default Editar;