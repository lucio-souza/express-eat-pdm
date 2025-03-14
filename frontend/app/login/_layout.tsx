import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { loginSchema } from "../../schemas/validation";
import { useForm, Controller } from "react-hook-form";
import { Form } from "../../components/form";
import z from "zod"
import { ButtonEnviar } from "../../components/buttons/buttonSalvar";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {

    type LoginData = z.infer<typeof loginSchema>;

    const { login } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter();


    const OnSubmit = async (data: LoginData) => {
        const { email, senha } = data;

        try {
            await login(email, senha);
            router.replace('/home');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

  function redirect(){
    router.replace("/cadastro")
  }

  return (
    <View style={style.container}>
      <Image style={style.img} source={require('../../assets/logo.png')} /> 
      <Text style={style.texto}>Login</Text>

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

      
      <ButtonEnviar text={"Enviar"} Press={handleSubmit(OnSubmit)} />

      <TouchableOpacity onPress={redirect}>
        <Text style={style.textoConta}>Faça o Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 10,
    alignItems: "center"
  },
  img: {
    marginVertical: 100
  }, 
  texto: {
    fontSize: 40,
    fontWeight: "400",
    marginBottom: 20
  },
  textoConta: {
    color: "#0C3950",
    textDecorationLine: "underline",
    marginTop: 30
  },
  button: {
    width: "100%",
    backgroundColor: "black",
    height: "7%",
    alignItems: "center",
    flexDirection: "row",
  }
});

export default Login;
