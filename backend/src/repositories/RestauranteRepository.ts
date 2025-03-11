import Restaurante from "../model/Restaurante";
import { AutenticateType } from "../types/AutenticateType";
import { bodyRestauranteType } from "../types/bodyRestauranteType";
import { hash,compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class RestauranteRepository{
    async getAll(){
        try {
            const restaurantes=await Restaurante.find();
            return {restaurantes,status:200}
        } catch (error) {
            return {message:"erro ao listar restaurantes",status:400,error}
        }
    }

    async getRestauranteByEmail(email:string){
        try {
            const restaurante=await Restaurante.findOne({ email }).exec();
            return restaurante? { restaurante, status: 200 } : { message: `Restaurante inexistente`, status: 404 };
        } catch (error) {
            return {message:"erro ao listar restaurante",status:404,error}
        }
    }

    async getRestauranteById(id:string){
        try {
            const restaurante=await Restaurante.findById(id).exec()
            return restaurante? { restaurante, status: 200 } : { message: `Restaurante inexistente`, status: 404 };
        } catch (error) {
            return {message:"erro ao listar restaurante",status:404,error}
        }
    }

    async createRestaurante({nome,email,senha,localizacao,cnpj}:bodyRestauranteType){
        try {
            const senhaCripitografada=await hash(senha,2);
            const restaurante=await Restaurante.create({
                nome,
                email,
                senha:senhaCripitografada,
                cnpj,
                localizacao
            })

            return {restaurante,status:201}
        } catch (error) {
            return {message:"erro ao criar restaurante",status:400,error}
        }
    }

    async authenticateRestaurante({email,senha}:AutenticateType){
        try {
            const data=await this.getRestauranteByEmail(email);
            if(data.restaurante){
                const restaurante =data.restaurante;
                const verifysenha=await compare(senha,restaurante.senha)

                if(!verifysenha){
                    return {message:"senha incorreta",status:404};
                }

                const token=sign(
                    {id:restaurante._id},
                    process.env.TOKEN_KEY as string,
                    {expiresIn:"12hrs"}
                )     

                return {token,status:201}   
            }
            return {message:'Email incorreto',status:404}
        } catch (error) {
            return {message:"erro ao criar token",status:400,error}
        }
    }

    async deleteRestaurante(id:string){
        try{
        const restauranteDeletado=await Restaurante.findByIdAndDelete(id);
        if(restauranteDeletado){
            const restaurantes=await this.getAll();
            return {restaurantes,status:restaurantes.status}
        }
        return {message:'Restaurante Inexistente',status:404}
        }catch(error){
            return {message:'erro ao deletar restaurante',status:400,error}
        }
    }

    async editRestaurante({nome,senha,localizacao}:bodyRestauranteType,id:string){
        try {
            const senhaCripitografada=await hash(senha,2);
            const restauranteEditado=await Restaurante.findByIdAndUpdate(id,{
                nome,
                senha:senhaCripitografada,
                localizacao
                },
                {new:true}
            );

            if(restauranteEditado){
                return {restauranteEditado,status:200}
            }
            return {message:'Restaurante Inexistente',status:404}
        } catch (error) {
            return {message:'erro ao editar restaurante',status:400,error}
        }
    }
}
export default new RestauranteRepository();