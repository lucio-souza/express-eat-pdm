import AvaliacaoRepository from "../repositories/AvaliacaoRepository";
import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";

class UserController {
  async listAllUsers(req: Request, res: Response) {
    const data = await UserRepository.getAllUsers();

    data.status === 200
      ? res.status(200).json(data.usuarios)
      : res.status(data.status).json({ message: data.message, erro: data.error });
  }

  async listUserById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await UserRepository.getUserById(id);
    data.status === 200
    ? res.status(200).json(data.usuario)
    : res.status(data.status).json({ message: data.message, erro: data.error });
  }

  async listUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const data = await UserRepository.getUserByEmail(email);

    data.status === 200
      ? res.status(200).json(data.usuario)
      : res.status(data.status).json({ message: data.message, erro: data.error });
  }

  async registerUser(req: Request, res: Response) {
    const { nome, email, idade, localizacao, senha, cpf } = req.body;
    console.log(nome,email,idade,localizacao,email,senha);
    
    const result = await UserRepository.createUser({nome,email,idade,localizacao,senha,cpf,});

    result.status === 201
      ? res.status(201).json(result.usuario)
      : res.status(result.status).json({ message: result.message, erro: result.error });
  }

  async editUser(req: Request, res: Response) {
    const { nome, idade, localizacao, senha } = req.body;
    const  id  = req.ID;

    const result = await UserRepository.updateUser({ nome, idade, localizacao, senha },id);

    result.status === 200
      ? res.status(200).json(result.usuarioAtualizado)
      : res.status(result.status).json({ message: result.message, erro: result.error });
  }

  async eraseUser(req: Request, res: Response) {
    const id=req.ID;
    const result = await UserRepository.deleteUser(id);

    result.status === 200
      ? res.status(200).json(result.usuarios)
      : res.status(400).json({ message: result.message, erro: result.error });
  }

  async authenticateUser(req:Request,res:Response){
    const {email,senha}=req.body;
    const result=await UserRepository.authenticateUser({email,senha});

    result.status===201 
    ? res.status(201).json(result.token)
    : res.status(404).json({message:result.message,erro:result.error})
  }
  
  async createAvaliation(req:Request,res:Response){
    const idRestaurante=req.headers['idrestaurante'] as string;
    const {nota}=req.body;
    const idUser=req.ID;

    const result=await AvaliacaoRepository.userAvaliationRestaurante({idUser,idRestaurante,nota});

    result.status===201 
    ? res.status(201).json(result.avaliacao)
    : res.status(404).json({message:result.message,erro:result.error})
  }
}
export default new UserController();