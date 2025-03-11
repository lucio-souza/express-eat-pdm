
import { sign } from "jsonwebtoken";
import User from "../model/User";
import { bodyUserType } from "../types/bodyUserType";
import { AutenticateType } from "../types/AutenticateType";
import { hash, compare } from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class UserRepository {
  async getAllUsers() {
    try {
      const usuarios = await User.find();
      return { usuarios, status: 200 };
    } catch (error) {
      return { message: `Erro ao listar usuarios`, status: 400, error };
    }
  }

  async getUserById(id:string){
    try {
      const usuario=await User.findById(id).exec();
      return usuario ? { usuario, status: 200 } : { message: `Usuario inexistente`, status: 404 };
    } catch (error) {
      return { message: `Erro ao listar usuario`, status: 400, error };
    }
  }

  async getUserByEmail(email: string) {
    try {
      const usuario = await User.findOne({ email }).exec();
      return usuario ? { usuario, status: 200 } : { message: `Usuario inexistente`, status: 404 };
    } catch (error) {
      return { message: `Erro ao listar usuario`, status: 400, error };
    }
  }

  async createUser({ nome, email, idade, localizacao, senha, cpf }: bodyUserType) {
    try {
      const senhaCripitografada = await hash(senha, 2);
      const usuario = await User.create({
        nome,
        email,
        idade,
        localizacao,
        senha: senhaCripitografada,
        cpf,
      });
      return { usuario, status: 201 };
    } catch (error) {
      return { message: `Erro ao criar usuario`, status: 400, error };
    }
  }

  async updateUser({ nome, idade, senha, localizacao }: bodyUserType,id: string) {
    try {
        const senhaCripitografada = await hash(senha, 2);
        const usuarioAtualizado = await User.findByIdAndUpdate(id, {
          nome,
          idade,
          senha: senhaCripitografada,
          localizacao,
        },{ new: true });

        if(usuarioAtualizado){
          return { usuarioAtualizado, status: 200 };
        }
        return { message: `Usuario inexistente`, status: 404};
        
    } catch (error) {
      return { message: `Erro ao atualizar usuario`, status: 400, error };
    }
  }

  async deleteUser(id: string) {
    try {
        const usuarioDeletado=await User.findByIdAndDelete(id);
        if(usuarioDeletado){
          const usuarios = await this.getAllUsers();
          return { usuarios, status: 200 };
        }
        return { message: `Usuario inexistente`, status: 404};
    } catch (error) {
      return { message: `Erro ao deletar usuario`, status: 400, error };
    }
  }

  async authenticateUser({ email, senha }: AutenticateType) {
    try {
      const usuario = await User.findOne({ email }).exec();
      console.log(usuario);
      
      if (usuario) {

        const verifyPassword = await compare(senha, usuario.senha);
        
        
        if(!verifyPassword){
            return {message:'Senha incorreta',status:404,error:null};
        }
        const token=sign(
            {
                id:usuario._id
            },
            process.env.TOKEN_KEY as string,
            {
                expiresIn:"12hrs"
            }
        )
        
        return {token,status:201}
      }
      return {message:"Email incorreto",status:404,error:null}

    } catch (error) {
        return {message:"Email ou senha incorreta incorreto",status:404,error}
    }
  }
}

export default new UserRepository();