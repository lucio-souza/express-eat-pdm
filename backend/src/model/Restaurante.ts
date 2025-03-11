import mongoDb from "../database/mongodbDatabase";
import { Schema } from "mongoose";
import {v4 as uuid} from "uuid"

const RestauranteSchema=new Schema({
    _id:{
        type:String,
        default:()=>uuid()
    },
    nome:String,
    cnpj:{
        type:String,
        required:true,
        unique:true
    },
    localizacao:{
        type: {
            type: String,
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    avaliacao:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    senha:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const Restaurante=mongoDb.model('Restaurante',RestauranteSchema)

export default Restaurante;