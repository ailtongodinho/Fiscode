import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";

export const GET_COMPARAR_COMPRAS = 'nfce/Compras/Comparar/repos/LOAD';
export const SELECIONAR_COMPARAR_COMPRAS = 'nfce/Compras/Comparar/repos/SELECIONAR';
export const GET_COMPARAR_COMPRAS_RESET = 'nfce/Compras/Comparar/repos/RESET';
export const GET_COMPARAR_COMPRAS_SUCCESS = 'nfce/Compras/Comparar/repos/LOAD_SUCCESS';
export const GET_COMPARAR_COMPRAS_FAIL = 'nfce/Compras/Comparar/repos/LOAD_FAIL';

const defaultRepos = {
    sucesso: false,
    lista: null,
    selecionada: null,
};

export function compararComprasReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_COMPARAR_COMPRAS_SUCCESS:
            return { ...state, repos: { ...state.repos, lista: action.payload } }
        case GET_COMPARAR_COMPRAS_FAIL:
            return { ...state, repos: { ...state.repos, sucesso: action.payload } }
        default:
            return state;
    }
}

export function compararComprasRepos() {
    // console.log("****************Compras/CompararRepos****************", payload);

    return (dispatch, getState) => {

        var id = getState().listarComprasReducer.repos.selecionada.id

        var options = new FetchApiOptions(
            GET_COMPARAR_COMPRAS,
            '/Compras/'+ id +'/Comparar',
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            compararComprasReposSuccess,
            compararComprasReposError
        );
    }
}

function compararComprasReposSuccess(response: ResponseModel) {
    // console.log("Compras/CompararReposSuccess", response);

    var types = [];

    types.push({ type: GET_COMPARAR_COMPRAS_SUCCESS, payload: response.objeto });

    return types;
}

function compararComprasReposError(response: ResponseModel) {
    // console.log("Compras/CompararReposError", response);

    var types = [];

    types.push({ type: GET_COMPARAR_COMPRAS_FAIL, payload: response.sucesso });

    types.push(showToast({ text: response.mensagem }));

    return types;
}