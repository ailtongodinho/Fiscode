export class UsuarioModel
{
    Id: number;
    Nome: string;
    Sobrenome: string;
    RegistroNacional: string;
    Sexo: string;
    Email: string;
    Ativo: boolean;
    DataInsercao: Date | string;

    constructor() {
        this.Ativo = true;
        this.Nome = "";
        this.Sobrenome = "";
    }
}