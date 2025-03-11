import mongoDb from "../database/mongodbDatabase";
import {v4 as uuid} from 'uuid'
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema= new Schema({
    _id:{
        type:String,
        default:()=>uuid()
    },
    nome:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    idade:{
        type:Number
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
    senha:{
        type:String,
        required:true
    },
    cpf:{
        type:String,
        unique:true,
        required:true
    }
});

const User=mongoDb.model('Usuario',UserSchema);
export default User;