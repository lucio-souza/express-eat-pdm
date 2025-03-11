import express  from "express";
import RestauranteController from "../controller/RestauranteController";
import { verifyToken } from "../middlewares/verifyToken";

const restauranteRouter=express.Router();

restauranteRouter.get('/',RestauranteController.listAll);
restauranteRouter.post('/',RestauranteController.registerRestaurante);
restauranteRouter.post('/login',RestauranteController.authenticateRestaurante);
restauranteRouter.delete('/',verifyToken,RestauranteController.eraseRestaurante);
restauranteRouter.put('/',verifyToken,RestauranteController.editRestaurante);

restauranteRouter.get('/avaliacoes',RestauranteController.listAllAvaliacoes)

export default restauranteRouter;