import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";

export const GET_PRODUTO_COMPRAS = 'nfce/Compras/Produto/repos/LOAD';
export const GET_PRODUTO_COMPRAS_RESET = 'nfce/Compras/Produto/repos/RESET';
export const GET_PRODUTO_COMPRAS_RESET_LISTA = 'nfce/Compras/Produto/repos/RESET_LISTA';
export const GET_PRODUTO_COMPRAS_SUCCESS = 'nfce/Compras/Produto/repos/LOAD_SUCCESS';
export const GET_PRODUTO_COMPRAS_FAIL = 'nfce/Compras/Produto/repos/LOAD_FAIL';
export const GET_PRODUTO_COMPRAS_SELECIONADO = 'nfce/Compras/Produto/repos/SELECIONADO';

const defaultRepos = {
    produtos: null,
    produtoSelecionado: null,
    sucesso: false,
    loading: false
};

export function produtoComprasReducer(state = { repos: defaultRepos }, action) {
    // console.log("produtoComprasReducer", action.type);

    switch (action.type) {
        case GET_PRODUTO_COMPRAS:
            return { ...state, repos: { ...state.repos, loading: true } };
        case GET_PRODUTO_COMPRAS_SUCCESS:
            return { ...state, repos: { ...state.repos, produtos: action.payload, loading: false, sucesso: true } };
        case GET_PRODUTO_COMPRAS_FAIL:
            return { ...state, repos: { ...state.repos, loading: false, sucesso: false } };
        case GET_PRODUTO_COMPRAS_RESET:
            return { ...state, repos: defaultRepos }
        case GET_PRODUTO_COMPRAS_RESET_LISTA:
            return { ...state, repos: { ...state.repos, produtos: null } }
        case GET_PRODUTO_COMPRAS_SELECIONADO:
            return { ...state, repos: { ...state.repos, produtoSelecionado: action.payload } };
        default:
            return state;
    }
}

export function produtoSelecionar(payload) {
    return { type: GET_PRODUTO_COMPRAS_SELECIONADO, payload: payload }
}

export function produtoComprasReset() {
    return { type: GET_PRODUTO_COMPRAS_RESET }
}

export function produtoComprasResetLista() {
    return { type: GET_PRODUTO_COMPRAS_RESET_LISTA }
}

export function produtoComprasRepos(payload) {
    // console.log("****************Compras/ProdutoRepos****************", payload);

    return (dispatch, getState) => {

        const novoPayload = {
            ...payload,
            idCompra: getState().listarComprasReducer.repos.selecionada.id
        }

        var options = new FetchApiOptions(
            GET_PRODUTO_COMPRAS,
            '/ComprasProduto/ListarProdutos',
            'POST',
            novoPayload,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            produtoComprasReposSuccess,
            produtoComprasReposError,
            false
        );
    }
}

function produtoComprasReposSuccess(response: ResponseModel) {
    // console.log("Compras/ProdutoReposSuccess", response);

    var types = [];

    types.push({ type: GET_PRODUTO_COMPRAS_SUCCESS, payload: response.objeto });

    return types;
}

function produtoComprasReposError(response: ResponseModel) {
    // console.log("Compras/ProdutoReposError", response);

    var types = [];

    types.push({ type: GET_PRODUTO_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}

export function produtoComprasDeletar(id) {
    // console.log("****************Compras/ProdutoDeletar****************", id);

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_PRODUTO_COMPRAS,
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
            produtoComprasDeletarSuccess,
            produtoComprasDeletarError
        );
    }
}

function produtoComprasDeletarSuccess(response: ResponseModel) {
    // console.log("Compras/ProdutoReposSuccess", response);

    var types = [];

    // types.push({ type: GET_PRODUTO_COMPRAS_SUCCESS, payload: response.objeto });

    return types;
}

function produtoComprasDeletarError(response: ResponseModel) {
    // console.log("Compras/ProdutoReposError", response);

    var types = [];

    types.push({ type: GET_PRODUTO_COMPRAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}