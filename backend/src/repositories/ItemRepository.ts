import Item from "../model/Item"
import { bodyItemType } from "../types/bodyItemType"

class ItemRepository{

    async getAll(){
        try {
            const itens= await Item.find();
            return {itens,status:200}
        } catch (error) {
            return {message:"erro ao listar itens",status:400,error}
        }
    }

    async getItemById(_id:string){
        try {
            const item = await Item.findOne({_id})
            return item ? {item,status:200} : { message: `Item inexistente`, status: 404 };
        } catch (error) {
            return {message:"erro ao localizar item",status:404,error}
        }
    }

    async createItem({descricao,nome,valor,quantidade,idRestaurante}:bodyItemType){

        try {
            const item = await Item.create({
                descricao,
                nome,
                valor,
                quantidade,
                idRestaurante
            }
        )
            return {item,status:201}
        } catch (error) {
            return {message:"erro ao criar item",status:400,error}
        }
    }

    async deleteItem(id:string){
        try {
            const itemDeletado = await Item.findByIdAndDelete(id)
            if(itemDeletado){
                const itens = await this.getAll()
                return {itens, status:itens.status}
            }
            return {message:'Item não encontrado',status:404}
        } catch (error) {
            return {message:'erro ao excluir item.',status:400,error}
        }
    }

    async deleteAllItens(idRestauranteParaExclusão:string){
        try {
            const itens = await Item.deleteMany({idRestaurante:idRestauranteParaExclusão})
            if (itens.deletedCount){
             return {itens, status:200}
            }
            return {message:"Não há itens para serem deletados",status:404}
        } catch (error) {
            return {message:'erro ao excluir todos os itens.',status:400,error}
        }
    }

    async editItem({descricao,nome,valor,quantidade}:bodyItemType,id:string){
        try {
            const itemEditado = await Item.findByIdAndUpdate(id,{
                descricao,
                nome,
                valor,
                quantidade
            },
            {new:true})
    
            if(itemEditado){
                return {itemEditado,status:200}
            }
            return {message:"Item inexistente", status:404}
        } catch (error) {
            return {message:'erro ao editar item',status:400,error}
        }
    } 

    async setImage(id:string, src:String){

        console.log("aqui ja ta no repository: " + src )
        try {
            const itemEditado = await Item.findByIdAndUpdate(id,{
                src
            },
            {new:true})
    
            if(itemEditado){
                return {itemEditado,status:200}
            }
            return {message:"Item inexistente", status:404}
        } catch (error) {
            return {message:'erro ao definir a imagem do item',status:400,error}
        }

    }

}

export default new ItemRepository()