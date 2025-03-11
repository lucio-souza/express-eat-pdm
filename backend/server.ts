import express from "express";
import userRouter from "./src/routes/userRouter";
import restauranteRouter from "./src/routes/restauranteRouter";
import pedidoRouter from "./src/routes/pedidoRouter"
import dotenv from "dotenv";
import itemRouter from "./src/routes/itemRouter";

dotenv.config();

const app = express();
const port = process.env.Port;


app.use(express.json());
app.use('/users', userRouter);
app.use('/restaurantes',restauranteRouter)
app.use('/pedidos',pedidoRouter)
app.use('/itens', itemRouter)

app.listen(port, () => {
  console.log( `servidor na ${port} 🔥🔥`);
});

export default app;