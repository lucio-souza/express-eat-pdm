import { Request,Response } from "express";
import ItemRepository from "../repositories/ItemRepository";
import { stringify } from "querystring";


class ItemController {

    async listAll(req:Request,res:Response){
        const result = await ItemRepository.getAll();
        result.status===200
        ? res.status(200).json(result.itens)
        : res.status(400).json({message:result.message,erro:result.error})
    }

    async getItemById(req:Request,res:Response){
        const id = req.params.id
        const result = await ItemRepository.getItemById(id);
        result.status===200
        ? res.status(200).json(result.item)
        : res.status(404).json({message:result.message,erro:result.error})
    }

    async createItem(req:Request,res:Response){
        const {descricao,nome,valor,quantidade,idRestaurante} = req.body;
        const result = await ItemRepository.createItem({descricao,nome,valor,quantidade,idRestaurante})
        result.status===201
        ? res.status(200).json(result.item)
        : res.status(400).json({message:result.message,erro:result.error})
    }

    async deleteItem(req:Request,res:Response){
        const id = req.params.id
        const result = await ItemRepository.deleteItem(id)
        result.status===200
        ? res.status(200).json(result.itens)
        : res.status(result.status).json({message:result.message,erro:result.error})

    }
    async deleteAllItens(req:Request,res:Response){
        const id = req.params.id;
        const result = await ItemRepository.deleteAllItens(id)
        result.status===200
        ? res.status(200).json(result.itens)
        : res.status(result.status).json({message:result.message,erro:result.error})
    }

    async updateItem(req:Request,res:Response){
        const id = req.params.id
        const {descricao,nome,valor,quantidade} = req.body;
        const src = req.file?.path
        const result = await ItemRepository.editItem({descricao,nome,valor,quantidade},id)

        result.status===200
        ? res.status(200).json(result.itemEditado)
        : res.status(result.status).json({message:result.message,erro:result.error})
    }

    




    async uploadImage(req:Request,res:Response) {
        const id = req.params.id
        const src = req.file?.path
        if(src){
            const result = await ItemRepository.setImage(id,src)   
            result.status===200
            ? res.status(200).json(result.itemEditado)
            : res.status(result.status).json({message:result.message,erro:result.error})
        } else {
            res.status(404).json({message:"a requisição não contém imagem"})
        }
    }

}

export	default new ItemController()