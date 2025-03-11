import { Request,Response } from "express";
import RestauranteRepository from "../repositories/RestauranteRepository";
import AvaliacaoRepository from "../repositories/AvaliacaoRepository";

class restauranteController{
    async listAll(req:Request,res:Response){
        const result=await RestauranteRepository.getAll();
        result.status===200
        ? res.status(200).json(result.restaurantes)
        : res.status(400).json({message:result.message,erro:result.error})
    }

    async registerRestaurante(req:Request,res:Response){
        const {nome,email,localizacao,senha,cnpj}=req.body
        const result=await RestauranteRepository.createRestaurante({nome,email,localizacao,senha,cnpj});

        result.status===201
        ? res.status(200).json(result.restaurante)
        : res.status(400).json({message:result.message,erro:result.error})
    }

    async authenticateRestaurante(req:Request,res:Response){
        const {email,senha}=req.body;
        const result=await RestauranteRepository.authenticateRestaurante({email,senha});

        result.status===201
        ? res.status(200).json(result.token)
        : res.status(400).json({message:result.message,erro:result.error})
    }

    async eraseRestaurante(req:Request,res:Response){
        const id=req.ID;
        
        const result=await RestauranteRepository.deleteRestaurante(id);

        result.status===200
        ? res.status(200).json(result.restaurantes)
        : res.status(result.status).json({message:result.message,erro:result.error})
    }

    async editRestaurante(req:Request,res:Response){
        const id=req.ID;
        const {nome,senha,localizacao}=req.body;
        const result=await RestauranteRepository.editRestaurante({nome,senha,localizacao},id)
        
        result.status===200
        ? res.status(200).json(result.restauranteEditado)
        : res.status(result.status).json({message:result.message,erro:result.error})
    }

    async listAllAvaliacoes(req:Request,res:Response){
        const id=req.headers['id'] as string;

        const result = await AvaliacaoRepository.getAvaliationsByIdRestaurante(id);

        result.status===200
        ? res.status(200).json(result.avaliacoesNameUser)
        : res.status(result.status).json({message:result.message,erro:result.error})
    }
}
export default new restauranteController();