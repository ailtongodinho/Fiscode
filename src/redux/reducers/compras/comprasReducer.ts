import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { produtoCompraPayload } from "../../../models/payloads/produtoCompraPayload";

export const GET_COMPRAS = 'nfce/Compras/repos/LOAD';
export const GET_COMPRAS_RESET = 'nfce/Compras/repos/RESET';
export const GET_COMPRAS_DELETE = 'nfce/Compras/repos/DELETE';
export const GET_COMPRAS_SUCCESS = 'nfce/Compras/repos/LOAD_SUCCESS';
export const ADD_COMPRAS_SUCCESS = 'nfce/Compras/repos/ADD_SUCCESS';
export const ADD_COMPRAS_FAIL = 'nfce/Compras/repos/ADD_FAIL';
export const GET_COMPRAS_FAIL = 'nfce/Compras/repos/LOAD_FAIL';
export const GET_COMPRAS_UPDATE = 'nfce/Compras/repos/UPDATE';

const defaultRepos = {
    compras: null,
    sucesso: false
};

export function comprasReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        // case GET_COMPRAS:
        //     return { ...state, repos: action.payload };
        case GET_COMPRAS_RESET:
            return { ...state, repos: defaultRepos };
        case GET_COMPRAS_SUCCESS:
            return { ...state, repos: { ...state.repos, compras: action.payload } };
        case GET_COMPRAS_FAIL:
            return { ...state, repos: { ...state.repos, compras: null } };
        case ADD_COMPRAS_SUCCESS:
            return { ...state, repos: { ...state.repos, sucesso: action.payload } };
        case ADD_COMPRAS_FAIL:
            return { ...state, repos: { ...state.repos, sucesso: action.payload } };
        default:
            return state;
    }
}

export function comprasReset() {
    return { type: GET_COMPRAS_RESET }
}

export function comprasRepos() {
    // console.log("****************Compras/ProdutoRepos****************");

    return (dispatch, getState) => {

        var newPayload = { idCompra: getState().listarComprasReducer.repos.selecionada.id }
        
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
            true
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

export function adicionarCompra(payload: produtoCompraPayload) {
    // console.log("****************Compras/ProdutoRepos****************", payload);

    return (dispatch, getState) => {

        var novoPayload = new produtoCompraPayload(payload.quantidade, payload.unidade);

        novoPayload.apelido = getState().produtoComprasReducer.repos.produtoSelecionado.apelido;
        novoPayload.idProduto = getState().produtoComprasReducer.repos.produtoSelecionado.id
        novoPayload.idCompra = getState().listarComprasReducer.repos.selecionada.id

        var options = new FetchApiOptions(
            GET_COMPRAS,
            '/ComprasProduto',
            'POST',
            novoPayload,
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

    types.push({ type: ADD_COMPRAS_SUCCESS, payload: response.sucesso });

    if (response.objeto != null && response.objeto > 0)
        types.push(showToast({ text: "Item adicionado com sucesso!" }))

    return types;
}

function adicionarCompraError(response: ResponseModel) {
    // console.log("Compras/ProdutoReposError", response);

    var types = [];

    types.push({ type: ADD_COMPRAS_FAIL, payload: response.sucesso });

    types.push(showToast({ text: response.mensagem }));

    return types;
}
export function removerCompra(id) {
    // console.log("****************Compras/ProdutoRepos****************", payload);

    return (dispatch, getState) => {

        var options = new FetchApiOptions(
            GET_COMPRAS_DELETE,
            '/ComprasProduto/Deletar/' + id,
            'DELETE',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            removerCompraSuccess,
            removerCompraError,
            false
        );
    }
}

function removerCompraSuccess(response: ResponseModel) {
    // console.log("Compras/ProdutoReposSuccess", response);

    var types = [];

    types.push(comprasRepos());

    if (response.objeto != null && response.objeto)
        types.push(showToast({ text: "Item excluido!" }))

    return types;
}

function removerCompraError(response: ResponseModel) {
    // console.log("Compras/ProdutoReposError", response);

    var types = [];

    // types.push({ type: GET_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}

export function atualizarCompra(payload) {
    // console.log("****************Compras/ProdutoRepos****************", payload);

    return (dispatch, getState) => {

        var options = new FetchApiOptions(
            GET_COMPRAS_UPDATE,
            '/ComprasProduto/Atualizar',
            'POST',
            payload,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            atualizarCompraSuccess,
            atualizarCompraError,
            false
        );
    }
}

function atualizarCompraSuccess(response: ResponseModel) {
    // console.log("Compras/ProdutoReposSuccess", response);

    var types = [];

    types.push(comprasRepos());

    if (response.objeto != null && response.objeto)
        types.push(showToast({ text: "Item atualizado!" }))

    return types;
}

function atualizarCompraError(response: ResponseModel) {
    console.log("Compras/ProdutoReposError", response);

    var types = [];

    // types.push({ type: GET_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}