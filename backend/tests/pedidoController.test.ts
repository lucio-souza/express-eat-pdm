import { Request, Response } from 'express';
import PedidoController from '../src/controller/PedidoController';
import PedidoRepository from '../src/repositories/PedidoRepository';
import { bodyPedidoType } from '../src/types/bodyPedidoType';

jest.mock('../src/repositories/PedidoRepository');

describe('PedidoController', () => {
    const req = {} as Request;
    const res = {} as Response;

    beforeEach(() => {
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn().mockReturnThis();
    });

    it('deve listar todos os pedidos de um usuário', async () => {
        req.params = { usuarioId: '1' };
        PedidoRepository.getAllForUserId = jest.fn().mockResolvedValue([{ id: '1', descricao: 'Pedido 1' }]);

        await PedidoController.listAllForUser(req, res);

        expect(PedidoRepository.getAllForUserId).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: '1', descricao: 'Pedido 1' }]);
    });

    it('deve tratar erros ao listar pedidos de um usuário', async () => {
        req.params = { usuarioId: '1' };
        PedidoRepository.getAllForUserId = jest.fn().mockRejectedValue(new Error('Erro no banco de dados'));

        await PedidoController.listAllForUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Erro ao buscar pedidos do usuário", erro: expect.any(Error) });
    });

    it('deve criar um novo pedido', async () => {
        req.body = {
            descricao: 'Novo Pedido',
            usuario: '1',
            itens: [{ idItem: 'item1', quantidade: 2 }]
        };
        PedidoRepository.createPedido = jest.fn().mockResolvedValue({ pedido: { id: '1', descricao: 'Novo Pedido' }, status: 201 });

        await PedidoController.createPedido(req, res);

        expect(PedidoRepository.createPedido).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: '1', descricao: 'Novo Pedido' });
    });

    it('deve tratar erros ao criar um pedido', async () => {
        req.body = {
            descricao: 'Novo Pedido',
            usuario: '1',
            itens: [{ idItem: 'item1', quantidade: 2 }]
        };
        PedidoRepository.createPedido = jest.fn().mockResolvedValue({ message: 'Erro', status: 400 });

        await PedidoController.createPedido(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Erro', erro: undefined });
    });

    it('deve deletar um pedido pelo ID', async () => {
        req.params = { id: '1' };
        PedidoRepository.deletePedidoById = jest.fn().mockResolvedValue({ message: 'Pedido deletado com sucesso', status: 200 });

        await PedidoController.deletePedido(req, res);

        expect(PedidoRepository.deletePedidoById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Pedido deletado com sucesso' });
    });

    it('deve tratar erros ao deletar um pedido', async () => {
        req.params = { id: '1' };
        PedidoRepository.deletePedidoById = jest.fn().mockResolvedValue({ message: 'Pedido não encontrado', status: 404 });

        await PedidoController.deletePedido(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Pedido não encontrado', erro: undefined });
    });

    it('deve atualizar o status de entrega de um pedido', async () => {
        req.params = { id: '1' };
        req.body = { novoStatusEntrega: 'delivered' };
        PedidoRepository.updateStatusEntregaById = jest.fn().mockResolvedValue({ pedido: { statusEntrega: 'delivered' }, status: 200 });

        await PedidoController.updateStatusEntrega(req, res);

        expect(PedidoRepository.updateStatusEntregaById).toHaveBeenCalledWith('1', 'delivered');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ statusEntrega: 'delivered' });
    });

    it('deve tratar erros ao atualizar o status de entrega', async () => {
        req.params = { id: '1' };
        req.body = { novoStatusEntrega: 'invalido' };
        PedidoRepository.updateStatusEntregaById = jest.fn().mockResolvedValue({ message: 'Status de entrega inválido', status: 400 });

        await PedidoController.updateStatusEntrega(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Status de entrega inválido', erro: undefined });
    });

    it('deve atualizar o status de pagamento de um pedido', async () => {
        req.params = { id: '1' };
        req.body = { novoStatusPagamento: 'confirmed' };
        PedidoRepository.updateStatusPagamento = jest.fn().mockResolvedValue({ pedido: { statusPagamento: 'confirmed' }, status: 200 });

        await PedidoController.updateStatusPagamento(req, res);

        expect(PedidoRepository.updateStatusPagamento).toHaveBeenCalledWith('1', 'confirmed');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ statusPagamento: 'confirmed' });
    });

    it('deve tratar erros ao atualizar o status de pagamento', async () => {
        req.params = { id: '1' };
        req.body = { novoStatusPagamento: 'invalido' };
        PedidoRepository.updateStatusPagamento = jest.fn().mockResolvedValue({ message: 'Status de pagamento inválido', status: 400 });

        await PedidoController.updateStatusPagamento(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Status de pagamento inválido', erro: undefined });
    });
});
