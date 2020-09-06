import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { extracaoModel, extracaoItemModel } from "../../../models/api/ExtracaoModel";
import { ExtracaoPayload } from "../../../models/payloads/ExtracaoPayload";
import { requestPermissionsAsync } from "expo-barcode-scanner";

export const GET_LISTAR_NOTAS = 'nfce/ListarNotas/repos/LOAD';
export const SET_LISTAR_NOTAS = 'nfce/ListarNotas/repos/SET';
//  Itens
export const GET_NOTA_SUCCESS = 'nfce/ListarNotas/repos/SUCCESS';
export const GET_NOTA_FAIL = 'nfce/ListarNotas/repos/FAIL';
export const GET_ITENS_NOTAS_SUCCESS = 'nfce/ListarNotas/repos/ITENS_SUCCESS';
export const GET_ITENS_NOTAS_FAIL = 'nfce/ListarNotas/repos/ITENS_FAIL';
export const GET_ITENS_NOTAS = 'nfce/ListarNotas/repos/ITENS_LOAD';
export const GET_LISTAR_NOTAS_RESET = 'nfce/ListarNotas/repos/RESET';
export const GET_ADICIONAR_NOTAS_SUCCESS = 'nfce/ListarNotas/repos/ADD_SUCCESS';
export const GET_ADICIONAR_NOTAS_FAIL = 'nfce/ListarNotas/repos/ADD_FAIL';
export const GET_LISTAR_NOTAS_SUCCESS = 'nfce/ListarNotas/repos/LOAD_SUCCESS';
export const GET_CARREGAR_NOTAS_SUCCESS = 'nfce/ListarNotas/repos/LOAD_C_SUCCESS';
export const GET_LISTAR_NOTAS_FAIL = 'nfce/ListarNotas/repos/LOAD_FAIL';
export const PUT_ATUALIZAR_NOTA = 'nfce/ListarNotas/repos/PUT_NOTA';
export const DEL_NOTA = 'nfce/ListarNotas/repos/DEL_NOTA';
export const SET_PAYLOAD_NOTA = 'nfce/ListarNotas/repos/SET_DATA_NOTA';
export const ORDERNAR_NOTA = 'nfce/ListarNotas/repos/ORDERNAR_NOTA';

const defaultRepos = {
    lastPayload: new ExtracaoPayload(new Date(), new Date()),
    lista: null,
    selecionado: null,
    sucesso: false
}

export function ListarNotasReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (LISTAR_NOTAS): ", action);
    switch (action.type) {
        case GET_LISTAR_NOTAS:
            return { ...state };
        case GET_LISTAR_NOTAS_RESET:
            return { ...state, repos: defaultRepos };
        case GET_LISTAR_NOTAS_SUCCESS:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: true } };
        case GET_LISTAR_NOTAS_FAIL:
            return { ...state, repos: { ...state.repos, sucesso: false } };
        case GET_ITENS_NOTAS_SUCCESS:
            return { ...state, repos: { ...state.repos, selecionado: { ...state.repos.selecionado, items: action.payload }, sucesso: true } };
        case GET_ITENS_NOTAS_FAIL:
            return { ...state, repos: { ...state.repos, sucesso: false } };
        case GET_NOTA_SUCCESS:
            return { ...state, repos: { ...state.repos, sucesso: true } };
        case GET_NOTA_FAIL:
            return { ...state, repos: { ...state.repos, sucesso: false } };
        case GET_CARREGAR_NOTAS_SUCCESS:
            state.repos.lista.lista.push.apply(state.repos.lista.lista, action.payload.lista)
            return { ...state, repos: { ...state.repos, lista: { ...state.repos.lista, dataMinima: action.payload.dataMinima, ultimo: action.payload.ultimo }, sucesso: true } };
        // case PUT_ATUALIZAR_NOTA:
        //     var dados = state.repos.lista;
        //     var itemHaAtualizar = dados.filter(x => x.dados.filter(y => y.id == action.payload.id));
        //     var index = dados.indexOf(itemHaAtualizar);
        //     if (index > -1) {
        //         dados.splice(index, 1);
        //         dados.push(action.payload);
        //     }
        //     return { ...state, repos: { ...state.repos, objeto: { ...state.repos.objeto, dados: dados } } }
        // case GET_ADICIONAR_NOTAS_SUCCESS:
        //     var dados = state.repos.lista ?? [];
        //     dados.push(action.payload);
        //     return { ...state, repos: { ...state.repos, objeto: { ...state.repos.objeto, dados: dados } } }
        // case GET_ADICIONAR_NOTAS_FAIL:
        //     return { ...state, error: action.payload };
        // case DEL_NOTA:
        //     var dados = state.repos.objeto.dados ?? [];
        //     dados = dados.filter(x => x.id !== action.payload);
        //     return { ...state, repos: { ...state.repos, objeto: { ...state.repos.objeto, dados: dados } } }
        case SET_LISTAR_NOTAS:
            return { ...state, repos: { ...state.repos, selecionado: action.payload } }
        case SET_PAYLOAD_NOTA:
            return { ...state, repos: { ...state.repos, lastPayload: action.payload } }
        default:
            return state;
    }
}

export function listarNotasSelecionar(nota) {
    return (dispatch) => {
        dispatch({ type: SET_LISTAR_NOTAS, payload: nota });
        return dispatch(itensNotasRepos())
    }
}

export function listarNotasReset() {
    console.log("listarNotasReset");

    return { type: GET_LISTAR_NOTAS_RESET }
}

export function atualizarNota(nota: extracaoModel) {
    return { type: PUT_ATUALIZAR_NOTA, payload: nota };
}

export function removerNotaRepos(idNota: number) {
    console.log("removerNotaRepos", idNota);

    return { type: DEL_NOTA, payload: idNota }
}

export function getNotasRepos(id) {
    // console.log("****************ordernarNotasRepos****************", lista);


    return (dispatch, getState) => {

        // var idNota = getState().ListarNotasReducer.repos.selecionado.id

        var options = new FetchApiOptions(
            GET_LISTAR_NOTAS,
            '/Nota/' + id,
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            getNotasReposSuccess,
            getNotasReposError
        );
    }
}

export function itensNotasRepos() {
    // console.log("****************ordernarNotasRepos****************", lista);


    return (dispatch, getState) => {

        var idNota = getState().ListarNotasReducer.repos.selecionado.id

        var options = new FetchApiOptions(
            GET_LISTAR_NOTAS,
            '/Nota/' + idNota + '/Itens',
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            itensNotasReposSuccess,
            itensNotasReposError
        );
    }
}

export function ordernarNotasRepos(ordenarId) {
    // console.log("****************ordernarNotasRepos****************", lista);


    return (dispatch, getState) => {

        var lastPayload = getState().ListarNotasReducer.repos.lastPayload
        var lista = getState().ListarNotasReducer.repos.lista

        dispatch({ type: SET_PAYLOAD_NOTA, payload: { ...lastPayload, ordernarId: ordenarId } });

        var options = new FetchApiOptions(
            GET_LISTAR_NOTAS,
            '/Nota/Ordenar',
            'POST',
            {
                listaAgrupada: lista,
                ordernarId: ordenarId,
            },
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            listarNotasReposSuccess,
            listarNotasReposError
        );
    }
}

function listarNotas(payload: ExtracaoPayload, token: string){
    return new FetchApiOptions(
        GET_LISTAR_NOTAS,
        '/Nota/Listar',
        'POST',
        payload,
        new Headers({
            "Authorization": "Bearer " + token
        })
    );
}

export function listarNotasRepos(payload: ExtracaoPayload) {
    // console.log("****************ListarNotasRepos****************", payload);


    return (dispatch, getState) => {

        if (payload == null) {
            payload = getState().ListarNotasReducer.repos.lastPayload
        }

        dispatch({ type: SET_PAYLOAD_NOTA, payload: payload });

        return fetchApi(
            listarNotas(payload, getState().loginReducer.repos.objeto?.accessToken),
            dispatch,
            listarNotasReposSuccess,
            listarNotasReposError
        );
    }
}

export function carregarNotasRepos(payload: ExtracaoPayload) {
    console.log("****************carregarNotasRepos****************", payload);


    return (dispatch, getState) => {

        if (payload == null) {
            payload = getState().ListarNotasReducer.repos.lastPayload
        }
        
        dispatch({ type: SET_PAYLOAD_NOTA, payload: payload });

        return fetchApi(
            listarNotas(payload, getState().loginReducer.repos.objeto?.accessToken),
            dispatch,
            carregarNotasReposSuccess,
            carregarNotasReposError
        );
    }
}

export function adicionarNota(notaId: number) {

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_LISTAR_NOTAS,
            '/Nota/' + notaId,
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            adicionarNotaReposSuccess,
            adicionarNotaReposError
        );
    }
}

function getNotasReposSuccess(response: ResponseModel) {
    // console.log("adicionarNotaReposSuccess", response);

    var types = [];

    types.push(listarNotasSelecionar(response.objeto));
    types.push({ type: GET_NOTA_SUCCESS, payload: null });


    return types;
}

function getNotasReposError(response: ResponseModel) {
    // console.log("adicionarNotaReposSuccess", response);

    var types = [];

    types.push({ type: GET_NOTA_FAIL, payload: null });
    types.push(showToast({ text: response.mensagem ?? response.error }));

    return types;
}

function adicionarNotaReposSuccess(response: ResponseModel) {
    // console.log("adicionarNotaReposSuccess", response);

    var types = [];

    types.push({ type: GET_ADICIONAR_NOTAS_SUCCESS, payload: response.objeto });

    return types;
}
function adicionarNotaReposError(response: ResponseModel) {
    // console.log("adicionarNotaReposError", response);

    var types = [];

    types.push({ type: GET_ADICIONAR_NOTAS_FAIL, payload: response.objeto });

    return types;
}

function listarNotasReposSuccess(response: ResponseModel) {
    // console.log("ListarNotasReposSuccess", response);

    var types = [];

    types.push({ type: GET_LISTAR_NOTAS_SUCCESS, payload: response.objeto });

    return types;
}

function listarNotasReposError(response: ResponseModel) {
    console.log("ListarNotasReposError", response);

    var types = [];

    types.push({ type: GET_LISTAR_NOTAS_FAIL, payload: response });

    types.push(showToast({ text: response.error }));

    return types;
}

function carregarNotasReposSuccess(response: ResponseModel) {
    // console.log("carregarNotasReposSuccess");

    var types = [];

    types.push({ type: GET_CARREGAR_NOTAS_SUCCESS, payload: response.objeto });

    return types;
}

function carregarNotasReposError(response: ResponseModel) {
    // console.log("ListarNotasReposError", response);

    var types = [];

    types.push({ type: GET_LISTAR_NOTAS_FAIL, payload: response });

    types.push(showToast({ text: response.error }));

    return types;
}

function itensNotasReposSuccess(response: ResponseModel) {
    // console.log("ListarNotasReposSuccess", response);

    var types = [];

    types.push({ type: GET_ITENS_NOTAS_SUCCESS, payload: response.objeto });

    return types;
}

function itensNotasReposError(response: ResponseModel) {
    // console.log("ListarNotasReposError", response);

    var types = [];

    types.push({ type: GET_ITENS_NOTAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem ?? response.error }));

    return types;
}