import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { comprasModel } from "../../../models/api/comprasModel";
import { listarComprasRepos } from "./listar.comprasReducer";

export const GET_NOVO_COMPRAS = 'nfce/Compras/Nova/repos/LOAD';
export const GET_NOVO_COMPRAS_RESET = 'nfce/Compras/Nova/repos/RESET';
export const GET_NOVO_COMPRAS_SUCCESS = 'nfce/Compras/Nova/repos/LOAD_SUCCESS';
export const GET_NOVO_COMPRAS_FAIL = 'nfce/Compras/Nova/repos/LOAD_FAIL';

const defaultRepos = null;

export function novoComprasReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_NOVO_COMPRAS:
            return { ...state, repos: action.payload };
        case GET_NOVO_COMPRAS_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_NOVO_COMPRAS_FAIL:
            return { ...state, repos: action.payload };
        default:
            return state;
    }
}

export function novoComprasRepos(payload: comprasModel) {
    console.log("****************Compras/ListarRepos****************", payload);

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_NOVO_COMPRAS,
            '/Compras',
            'POST',
            payload,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            novoComprasReposSuccess,
            novoComprasReposError
        );
    }
}

function novoComprasReposSuccess(response: ResponseModel) {
    // console.log("Compras/ListarReposSuccess", response);

    var types = [];

    types.push({ type: GET_NOVO_COMPRAS_SUCCESS, payload: response.objeto });

    types.push(listarComprasRepos({}))

    return types;
}

function novoComprasReposError(response: ResponseModel) {
    // console.log("Compras/ListarReposError", response);

    var types = [];

    types.push({ type: GET_NOVO_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}