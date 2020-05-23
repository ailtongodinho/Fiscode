import { FetchApiOptions } from "../../models/redux/FetchApiOptionsModel";
import { fetchApi } from "../fetchs";
import { ResponseModel } from "../../models/api/ResponseModel";

export const GET_CONFIGURACOES = 'nfce/configuracoes/repos/GET_CONFIGURACOES';
export const GET_CONFIGURACOES_OK = 'nfce/configuracoes/repos/GET_CONFIGURACOES_OK';
export const GET_CONFIGURACOES_FAIL = 'nfce/configuracoes/repos/GET_CONFIGURACOES_FAIL';

const defaultRepos = {

}

export function configuracoesReducer(state = defaultRepos, action) {
    switch (action.type) {
        case GET_CONFIGURACOES:
            return { ...state };
        case GET_CONFIGURACOES_OK:
            return { ...state, repos: action.payload };
        case GET_CONFIGURACOES_FAIL:
            return { ...state };
        default:
            return state;
    }
}

export function getConfiguracoes() {
    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_CONFIGURACOES,
            '/Configuracoes',
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            getConfiguracoesSuccess,
            getConfiguracoesError
        );
    }
}

function getConfiguracoesSuccess(response: ResponseModel) {
    // console.log("getConfiguracoesSuccess", response);
    
    var types = [];

    types.push({ type: GET_CONFIGURACOES_OK, payload: response.objeto })

    return types;
}
function getConfiguracoesError(response: ResponseModel) {
    // console.log("getConfiguracoesError", response);
    var types = [];

    return types;
}