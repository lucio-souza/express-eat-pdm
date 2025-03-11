import { Router } from 'express';
import PedidoController from '../controller/PedidoController'; 

const PedidoRouter = Router();


PedidoRouter.get('/:usuarioId', PedidoController.listAllForUser);
PedidoRouter.post('/', PedidoController.createPedido);
PedidoRouter.delete('/:id', PedidoController.deletePedido);
PedidoRouter.put('/:id/status-entrega', PedidoController.updateStatusEntrega);
PedidoRouter.put('/:id/status-pagamento', PedidoController.updateStatusPagamento);


export default PedidoRouter;
