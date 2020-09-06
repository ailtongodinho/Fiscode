import { ResponseModel } from "./models/api/ResponseModel";

export const appsettings = {
    produto: {
        customizado: {
            id: -1
        },
        pesquisa: {
            tamanhoTexto: 2,
        },
        unidades: [
            { label: "UN", value: "UN", descricao: "Unidade", inputValue: 1 },
            { label: "KG", value: "KG", descricao: "Kilograma", inputValue: 0.500 },
        ]
    },
    listar: {
        top: 10
    },
    ibge: {
        municipios: {
            pesquisa: {
                tamanhoTexto: 2
            }
        },
    },
    usuario: {
        tiposSexo: [
            { label: "Masculino", value: "M" },
            { label: "Feminino", value: "F" },
            { label: "Outro", value: "O" },
        ]
    },
    api: {
        // baseURL: "http://192.168.0.6:5001",
        baseURL: "https://nfceapi.herokuapp.com",
        headers: new Headers({
            "Content-Type": 'application/json',
            "Accept": "*/*"
        }),
        defaultNetworkErrorResponse: new ResponseModel(false, 505, "Ops... Não conseguimos conexão com o servidor! \n Por favor, tente novamente mais tarde", new Date(Date.now()), null)
    },
    ibgeApi: {
        baseURL: "https://servicodados.ibge.gov.br/api/v1",
        headers: new Headers(),
        defaultNetworkErrorResponse: new ResponseModel(false, 505, "Ops... Não conseguimos conexão com o site do IBGE! Tente novamente mais tarde", new Date(Date.now()), null)
    }
}