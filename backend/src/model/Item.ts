import mongoDb from "../database/mongodbDatabase";
import { Schema } from "mongoose";
import {v4 as uuid} from "uuid"

const ItemSchema=new Schema({
    _id:{
        type:String,
        default:()=>uuid()
    },
    descricao: {
        type:String,
    },
    nome: {        
        type: String,
        required: true
    },
    valor: {        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    idRestaurante: {
        type: String,
        required: true
    },
    src: {
        type: String, 
        required: false
    },

})

const Item=mongoDb.model('Item',ItemSchema)

export default Item;