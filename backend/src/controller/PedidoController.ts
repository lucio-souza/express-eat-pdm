import { Request, Response } from "express";
import PedidoRepository from "../repositories/PedidoRepository";

class PedidoController {
    async listAllForUser(req: Request, res: Response) {
        const { usuarioId } = req.params;
        try {
            const result = await PedidoRepository.getAllForUserId(usuarioId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar pedidos do usuário", erro: error });
        }
    }

    async createPedido(req: Request, res: Response) {
        const { descricao, usuario, itens } = req.body;
        const result = await PedidoRepository.createPedido({ descricao, usuario, itens });

        result.status === 201
            ? res.status(201).json(result.pedido)
            : res.status(result.status).json({ message: result.message, erro: result.error });
    }

    async deletePedido(req: Request, res: Response) {
        const id = req.params.id;
        const result = await PedidoRepository.deletePedidoById(id);

        result.status === 200
            ? res.status(200).json({ message: result.message })
            : res.status(result.status).json({ message: result.message, erro: result.error });
    }

    async updateStatusEntrega(req: Request, res: Response) {
        const id = req.params.id;
        const { novoStatusEntrega } = req.body;
        const result = await PedidoRepository.updateStatusEntregaById(id, novoStatusEntrega);

        result.status === 200
            ? res.status(200).json(result.pedido)
            : res.status(result.status).json({ message: result.message, erro: result.error });
    }

    async updateStatusPagamento(req: Request, res: Response) {
        const id = req.params.id;
        const { novoStatusPagamento } = req.body;
        const result = await PedidoRepository.updateStatusPagamento(id, novoStatusPagamento);

        result.status === 200
            ? res.status(200).json(result.pedido)
            : res.status(result.status).json({ message: result.message, erro: result.error });
    }
}

export default new PedidoController();
