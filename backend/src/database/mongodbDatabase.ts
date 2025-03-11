import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const mongoDb=mongoose;

const Mongo_URI=process.env.Mongo_URI as string;

console.log(Mongo_URI)

async function conectar(){
    await mongoDb.connect(Mongo_URI)
        .then(() => console.log('Conectado ao MongoDB com sucesso!'))
        .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
}

conectar();

export default mongoDb;