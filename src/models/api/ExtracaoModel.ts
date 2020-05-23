export class extracaoModel {
    id: number;
    idUsuario: number;
    url: string;
    chaveAcesso: string;
    emissao: Date | string;
    pagamento: extracaoPagamentoModel;
    emissor: extracaoEmissorModel;
    items: extracaoItemModel[];
    status: statusExtracaoEnum;
    tentativas: number;
    constructor() {
        this.pagamento = new extracaoPagamentoModel(),
        this.emissor = new extracaoEmissorModel()
        this.items = [new extracaoItemModel()]
    }
}

export class extracaoPagamentoModel {
    id: number;
    idControle: number;
    formaPagamento: string;
    valorPago: number;
    troco: number;
    tributosTotaisIncidentes: number;
}

export class extracaoEmissorModel {
    id: number;
    idControle: number;
    razaoSocial: string;
    cnpj: string;
    inscricaoEstadual: string;
    endereco: string;
    uf: string;
    municipio: string;
    distrito: string;
    cep: string;
    numero: string;
    logradouro: string;
    constructor() {
        this.razaoSocial = "";
    }
}

export class extracaoItemModel {
    id: number;
    idControle: number;
    nome: string;
    codigo: number;
    quantidade: number;
    unidade: string;
    valorUnitario: number;
    valorTotal: number;
}

export enum statusExtracaoEnum {
    Sucesso = 1,
    Erro = -1
}