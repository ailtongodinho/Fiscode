import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";

export const GET_LISTAR_COMPRAS = 'nfce/Compras/Listar/repos/LOAD';
export const SELECIONAR_LISTAR_COMPRAS = 'nfce/Compras/Listar/repos/SELECIONAR';
export const GET_LISTAR_COMPRAS_RESET = 'nfce/Compras/Listar/repos/RESET';
export const GET_LISTAR_COMPRAS_SUCCESS = 'nfce/Compras/Listar/repos/LOAD_SUCCESS';
export const GET_LISTAR_COMPRAS_FAIL = 'nfce/Compras/Listar/repos/LOAD_FAIL';

const defaultRepos = null;

export function listarComprasReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_LISTAR_COMPRAS:
            return { ...state, repos: action.payload };
        case GET_LISTAR_COMPRAS_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_LISTAR_COMPRAS_FAIL:
            return { ...state, repos: action.payload };
        case SELECIONAR_LISTAR_COMPRAS:
            return { ...state, selecionada: action.payload}
        default:
            return state;
    }
}

export function selecionarLista(compra){
    return { type: SELECIONAR_LISTAR_COMPRAS, payload: compra }
}

export function listarComprasRepos(payload) {
    console.log("****************Compras/ListarRepos****************", payload);

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_LISTAR_COMPRAS,
            '/Compras/Listar',
            'POST',
            payload,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            listarComprasReposSuccess,
            listarComprasReposError
        );
    }
}

function listarComprasReposSuccess(response: ResponseModel) {
    // console.log("Compras/ListarReposSuccess", response);

    var types = [];

    types.push({ type: GET_LISTAR_COMPRAS_SUCCESS, payload: response.objeto });

    return types;
}

function listarComprasReposError(response: ResponseModel) {
    // console.log("Compras/ListarReposError", response);

    var types = [];

    types.push({ type: GET_LISTAR_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}

export function listarComprasDeletar(id) {
    console.log("****************Compras/ListarDeletar****************", id);

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_LISTAR_COMPRAS,
            '/Compras/Deletar/' + id,
            'DELETE',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            listarComprasDeletarSuccess,
            listarComprasDeletarError
        );
    }
}

function listarComprasDeletarSuccess(response: ResponseModel) {
    // console.log("Compras/ListarReposSuccess", response);

    var types = [];

    // types.push({ type: GET_LISTAR_COMPRAS_SUCCESS, payload: response.objeto });

    return types;
}

function listarComprasDeletarError(response: ResponseModel) {
    // console.log("Compras/ListarReposError", response);

    var types = [];

    // types.push({ type: GET_LISTAR_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}