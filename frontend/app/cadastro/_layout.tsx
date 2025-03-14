import { View, Image, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema } from "../../schemas/validation";
import { Form } from "../../components/form";
import { ButtonEnviar } from "../../components/buttons/buttonSalvar";
import { useRouter } from "expo-router";
import z from "zod"
import axios from "axios";
import Mapa from "../../components/mapa";

const Cadastro = () => {

  const router = useRouter();

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -6.8970,
    longitude: -38.5570,
  });

  type cadastroData = z.infer<typeof cadastroSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cadastroSchema),
  });

  const onSubmit = async (data:cadastroData) => {
    const { nome,email, senha,cpf,idade } = data;
    
    try {
      await axios.post("http://192.168.2.108:8080/users", {
        nome:nome,
        email:email,
        senha:senha,
        idade:idade,
        cpf:cpf,
        localizacao: {
            type: "Point",
            coordinates: [selectedLocation.latitude, selectedLocation.longitude], // Envia a localização selecionada
          },
      });
      router.push("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };
  
  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <View style={style.container}>
      <Image style={style.img} source={require("../../assets/logo.png")} />
      <Text style={style.texto}>Cadastro Cliente</Text>

      <Controller
        control={control}
        name="nome"
        render={({ field: { value, onChange } }) => (
          <Form
            valor={value}
            SetValor={onChange}
            text="Digite Seu Nome"
            errorMessage={errors.nome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <Form
            valor={value}
            SetValor={onChange}
            text="Digite Seu Email"
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { value, onChange } }) => (
          <Form
            valor={value}
            SetValor={onChange}
            text="Digite Sua Senha"
            errorMessage={errors.senha?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { value, onChange } }) => (
          <Form
            valor={value}
            SetValor={onChange}
            text="Digite Seu CPF"
            errorMessage={errors.cpf?.message}
          />
        )}
      />

<Controller
        control={control}
        name="idade"
        render={({ field: { value, onChange } }) => (
          <Form
            valor={value ? String(value) : ''}
            SetValor={(val) => onChange(Number(val))}
            text="Digite Sua idade"
            errorMessage={errors.idade?.message}
          />
        )}
      />
      <Mapa
        initialLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
      />

      <ButtonEnviar Press={handleSubmit(onSubmit)} text="Cadastrar" />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 10,
    alignItems: "center",
  },
  img: {
    marginVertical: 10,
  },
  texto: {
    fontSize: 40,
    fontWeight: "400",
    marginBottom: 20,
  }
});

export default Cadastro;
