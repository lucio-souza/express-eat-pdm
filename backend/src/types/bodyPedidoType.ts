export type bodyPedidoType = {
    descricao:String,
    usuario: string,
    itens: {
        idItem: string,  
        quantidade: number 
    }[]
}