export class produtoCompraPayload {
    idCompra: number;
    idProduto: number;
    quantidade: number;
    unidade: string;
    apelido: string;
    constructor(_quantidade: number, _unidade: string) {
        this.quantidade = _quantidade;
        this.unidade = _unidade;
    }
}