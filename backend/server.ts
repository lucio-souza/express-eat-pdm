import express from "express";
import userRouter from "./src/routes/userRouter";
import restauranteRouter from "./src/routes/restauranteRouter";
import pedidoRouter from "./src/routes/pedidoRouter"
import dotenv from "dotenv";
import itemRouter from "./src/routes/itemRouter";
import jwt from 'jsonwebtoken';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.Port;


app.use(express.json());
app.use('/users', userRouter);
app.use('/restaurantes',restauranteRouter)
app.use('/pedidos',pedidoRouter)
app.use('/itens', itemRouter)
app.get('/validate-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho

  if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Verifica se o token é válido (exemplo usando JWT)
  jwt.verify(token, 'sua_chave_secreta', (err, decoded) => {
      if (err) {
          return res.status(401).json({ error: 'Token inválido' });
      }

      // Token válido
      return res.status(200).json({ message: 'Token válido' });
  });
});

app.listen(port, () => {
  console.log( `servidor na ${port} 🔥🔥`);
});

export default app;