import Restaurante from "../model/Restaurante";
import AvaliacaoRepository from "../repositories/AvaliacaoRepository";

async function calculoAvaliaçãoRestaurante(nota:number,idRestaurante:string) {
    const avaliacoes = await AvaliacaoRepository.getAvaliationsByIdRestaurante(idRestaurante);
    const notas = avaliacoes.avaliacoesNameUser?.map((avaliacao) => avaliacao.nota) as [number];

    if (notas && notas.length > 0) {
        const media = notas.reduce((cur: number, prev: number) => cur + prev, 0)/ notas.length;
        await Restaurante.updateOne({_id:idRestaurante},{$set: { avaliacao:media }}) 
      } else{
      await Restaurante.updateOne({_id:idRestaurante},{$set: { avaliacao:0 }})
      }
}

export default calculoAvaliaçãoRestaurante