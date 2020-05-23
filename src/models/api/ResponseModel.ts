export class ResponseModel {
    sucesso: boolean;
    httpStatus: number;
    mensagem: string;
    dataHora: Date;
    objeto: any;
    constructor(
        _sucesso: boolean,
        _httpStatus: number,
        _mensagem: string,
        _dataHora: Date,
        _objeto: any,
    ){
        this.sucesso = _sucesso;
        this.httpStatus = _httpStatus;
        this.mensagem = _mensagem;
        this.dataHora = _dataHora;
        this.objeto = _objeto;
    }
}