export class ExtracaoPayload {
    dataInicio?: Date;
    dataFim?: Date;
    favorito: boolean;
    ordenarId: string;
    idEmissor: number;
    top: number;
    constructor(dataInicio?: Date, dataFim?: Date, top: number = null, favorito: boolean = null, ordenarId: string = null, idEmissor: number = null) {
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.favorito = favorito;
        this.ordenarId = ordenarId;
        this.idEmissor = idEmissor;
        this.top = top;
    }
}   