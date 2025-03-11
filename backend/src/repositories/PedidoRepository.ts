import Pedido from "../model/Pedido";
import Item from "../model/Item";
import { validate as isUuid } from 'uuid';
import { bodyPedidoType } from "../types/bodyPedidoType";
import { bodyItemType } from "../types/bodyItemType";
import mongoose from 'mongoose';

class PedidoRepository{
    async getAllForUserId(usuarioId: string) {
        try {
            const pedidos = await Pedido.find({ usuario: usuarioId }).populate('itens.idItem').exec();
            return pedidos;
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar pedidos do usuário');
        }
    }

    async createPedido({ descricao, usuario, itens }: bodyPedidoType) {
        try {
            for (const item of itens) {
                if (item.quantidade <= 0) {
                    return { message: `Quantidade inválida para o item ${item.idItem}`, status: 400 };
                }
            }

            const itemDetails = await Item.find({ '_id': { $in: itens.map(item => item.idItem) } }).exec();
            if (!itemDetails.length) {
                return { message: "Itens não encontrados", status: 404 };
            }

            let precoTotal = 0;
            for (const item of itens) {
                const itemDetail = itemDetails.find(detail => detail._id.toString() === item.idItem);
                if (itemDetail) {
                    precoTotal += itemDetail.valor * item.quantidade;
                }
            }

            const pedido = await Pedido.create({
                descricao,
                usuario,
                itens,
                preco: precoTotal
            });

            return { pedido, status: 201 };
        } catch (error) {
            console.error(error);
            return { message: "Erro ao criar pedido", status: 400, error };
        }
    }

    async deletePedidoById(id: string) {
        try {
            if (typeof id !== 'string' || id.trim().length === 0) {
                return { message: "ID inválido", status: 400 };
            }

            const resultado = await Pedido.findByIdAndDelete(id).exec();

            if (!resultado) {
                return { message: "Pedido não encontrado", status: 404 };
            }

            return { message: "Pedido deletado com sucesso", status: 200 };
        } catch (error) {
            console.error(error);
            return { message: "Erro ao deletar pedido", status: 500, error };
        }
    }

    async updateStatusEntregaById(id: string, novoStatusEntrega: string) {
        try {
            if (typeof id !== 'string' || id.trim().length === 0) {
                return { message: "ID inválido", status: 400 };
            }

            const statusEntregaPermitidos = ['ongoing', 'delivered', 'preparing', 'canceled'];
            if (!statusEntregaPermitidos.includes(novoStatusEntrega)) {
                return { message: "Status de entrega inválido", status: 400 };
            }

            const pedido = await Pedido.findByIdAndUpdate(
                id,
                { statusEntrega: novoStatusEntrega },
                { new: true }
            ).exec();

            if (!pedido) {
                return { message: "Pedido não encontrado", status: 404 };
            }

            return { pedido, status: 200 };
        } catch (error) {
            console.error(error);
            return { message: "Erro ao atualizar o status de entrega", status: 500, error };
        }
    }

    async updateStatusPagamento(id: string, novoStatusPagamento: string) {
        try {
            if (typeof id !== 'string' || id.trim().length === 0) {
                return { message: "ID inválido", status: 400 };
            }

            console.log("Novo Status de Pagamento:", novoStatusPagamento);
            const statusPagamentoPermitidos = ['pending', 'confirmed', 'canceled'];
            if (!statusPagamentoPermitidos.includes(novoStatusPagamento)) {
                return { message: "Status de pagamento inválido", status: 400 };
            }

            const pedido = await Pedido.findByIdAndUpdate(
                id,
                { statusPagamento: novoStatusPagamento },
                { new: true }
            ).exec();

            if (!pedido) {
                return { message: "Pedido não encontrado", status: 404 };
            }

            return { pedido, status: 200 };
        } catch (error) {
            console.error(error);
            return { message: "Erro ao atualizar o status de pagamento", status: 500, error };
        }
    }
}

export default new PedidoRepository();