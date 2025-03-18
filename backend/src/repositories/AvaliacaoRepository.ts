import Avaliacao from "../model/Avaliação";
import { AvaliacaoType } from "../types/AvaliacaoType";
import RestauranteRepository from "./RestauranteRepository";
import UserRepository from "./UserRepository";
import User from "../model/User";
import calculoAvaliaçãoRestaurante from "../middlewares/calculoAvaliacaoRestaurante";

class AvaliacaoRepository{
    async userAvaliationRestaurante({idUser,idRestaurante,nota}:AvaliacaoType){
        try{
            const verifyUser=await UserRepository.getUserById(idUser);
            if(!verifyUser.usuario){
                return {message:'usuario inexistente',status:verifyUser.status}
            }

            const verifyRestaurante=await RestauranteRepository.getRestauranteById(idRestaurante);
            if(!verifyRestaurante.restaurante){
                return {message:verifyRestaurante.message,status:verifyUser.status}
            }

            const avaliacao=await Avaliacao.create({
              idUser,
              idRestaurante,
              nota
            })
            
            await calculoAvaliaçãoRestaurante(nota,idRestaurante);

            return {avaliacao,status:201}
        }catch(error){
            return {message:"error ao criar avaliacao",status:400,error}
        }
      }

    async getAvaliationsByIdRestaurante(idRestaurante:string){
        try {
          const avaliacoes = await Avaliacao.find({ idRestaurante }).exec();
          
          const avaliacoesNameUser= [];

          for (const avaliacao of avaliacoes) {
            const usuario = await User.findById(avaliacao.idUser);
            avaliacoesNameUser.push({
              _id:avaliacao._id,
              idUser:avaliacao.idUser,
              nomeUsuario: usuario?.nome, 
              nota: avaliacao.nota
            });
          }
            return {avaliacoesNameUser,status:200}
        }catch (error) {
          return {message:"error ao listar avaliacões",status:400,error}
        }
    }
}

export default new AvaliacaoRepository();