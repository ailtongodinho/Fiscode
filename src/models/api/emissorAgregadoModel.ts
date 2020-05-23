export class emissorAgregadoPayload {
    dataInicial: Date;
    dataFinal: Date;
    constructor(_dataInicial: Date, _dataFinal: Date) {
        this.dataFinal = _dataFinal;
        this.dataInicial = _dataInicial;
    }
}

export interface Pagamento {
    id: number;
    idControle: number;
    formaPagamento: string;
    valorPago: number;
    troco: number;
    tributosTotaisIncidentes: number;
    valido: boolean;
}

export class emissorAgregadoModel {
    pagamento: Pagamento;
    nota?: any;
    quantidade: number;
    somatoriaTotal: number;
    somatoriaTroco: number;
    somatoriaTributos: number;
    id: number;
    idControle: number;
    razaoSocial?: any;
    cnpj: string;
    inscricaoEstadual?: any;
    endereco?: any;
    uf: string;
    municipio: string;
    distrito: string;
    cep?: any;
    numero: string;
    logradouro: string;
    valido: boolean;
}
