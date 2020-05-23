import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { produtoCompraPayload } from "../../../models/payloads/produtoCompraPayload";

export const GET_COMPRAS = 'nfce/Compras/repos/LOAD';
export const GET_COMPRAS_RESET = 'nfce/Compras/repos/RESET';
export const GET_COMPRAS_SUCCESS = 'nfce/Compras/repos/LOAD_SUCCESS';
export const GET_COMPRAS_FAIL = 'nfce/Compras/repos/LOAD_FAIL';

const defaultRepos = null;

export function comprasReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        // case GET_COMPRAS:
        //     return { ...state, repos: action.payload };
        case GET_COMPRAS_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_COMPRAS_FAIL:
            return { ...state, repos: action.payload };
        default:
            return state;
    }
}

export function comprasRepos() {
    console.log("****************Compras/ProdutoRepos****************");


    return (dispatch, getState) => {

        var newPayload = new produtoCompraPayload();
        newPayload.idCompra = getState().listarComprasReducer.selecionada.id
        var options = new FetchApiOptions(
            GET_COMPRAS,
            '/ComprasProduto/Listar',
            'POST',
            newPayload,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            comprasReposSuccess,
            comprasReposError,
            false
        );
    }
}

function comprasReposSuccess(response: ResponseModel) {
    // console.log("Compras/ProdutoReposSuccess", response);

    var types = [];

    types.push({ type: GET_COMPRAS_SUCCESS, payload: response.objeto });

    return types;
}

function comprasReposError(response: ResponseModel) {
    // console.log("Compras/ProdutoReposError", response);

    var types = [];

    types.push({ type: GET_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}

export function adicionarCompra(payload) {
    console.log("****************Compras/ProdutoRepos****************", payload);

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_COMPRAS,
            '/ComprasProduto',
            'POST',
            payload,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            adicionarCompraSuccess,
            adicionarCompraError,
            false
        );
    }
}

function adicionarCompraSuccess(response: ResponseModel) {
    // console.log("Compras/ProdutoReposSuccess", response);

    var types = [];

    types.push(comprasRepos());

    if (response.objeto != null && response.objeto > 0)
        types.push(showToast({ text: "Item adicionado com sucesso!" }))

    return types;
}

function adicionarCompraError(response: ResponseModel) {
    // console.log("Compras/ProdutoReposError", response);

    var types = [];

    // types.push({ type: GET_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}