import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showMessage } from "../globalReducer";
import { extrairNotaReset } from "../leitorReducer";
import { extracaoModel, extracaoItemModel } from "../../../models/api/ExtracaoModel";
import { ExtracaoPayload } from "../../../models/payloads/ExtracaoPayload";
import { requestPermissionsAsync } from "expo-barcode-scanner";

export const GET_LISTAR_NOTAS = 'nfce/ListarNotas/repos/LOAD';
export const GET_LISTAR_NOTAS_RESET = 'nfce/ListarNotas/repos/RESET';
export const GET_ADICIONAR_NOTAS_SUCCESS = 'nfce/ListarNotas/repos/ADD_SUCCESS';
export const GET_ADICIONAR_NOTAS_FAIL = 'nfce/ListarNotas/repos/ADD_FAIL';
export const GET_LISTAR_NOTAS_SUCCESS = 'nfce/ListarNotas/repos/LOAD_SUCCESS';
export const GET_LISTAR_NOTAS_FAIL = 'nfce/ListarNotas/repos/LOAD_FAIL';
export const PUT_ATUALIZAR_NOTA = 'nfce/ListarNotas/repos/PUT_NOTA';
export const DEL_NOTA = 'nfce/ListarNotas/repos/DEL_NOTA';
export const SET_PAYLOAD_NOTA = 'nfce/ListarNotas/repos/SET_DATA_NOTA';
export const ORDERNAR_NOTA = 'nfce/ListarNotas/repos/ORDERNAR_NOTA';

const defaultRepos = {
    lastPayload: new ExtracaoPayload(new Date(), new Date()),
    objeto: {
        dados: null
    }
}

export function ListarNotasReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (LISTAR_NOTAS): ", action);
    switch (action.type) {
        case GET_LISTAR_NOTAS:
            return { ...state };
        case GET_LISTAR_NOTAS_RESET:
            return { ...state, repos: defaultRepos };
        case GET_LISTAR_NOTAS_SUCCESS:
            return { ...state, repos: { ...state.repos, objeto: action.payload } };
        case GET_LISTAR_NOTAS_FAIL:
            return { ...state, error: action.error };
        case PUT_ATUALIZAR_NOTA:
            var dados = state.repos.objeto.dados;
            var itemHaAtualizar = dados.filter(x => x.id == action.payload.id);
            var index = dados.indexOf(itemHaAtualizar);
            if (index > -1) {
                dados.splice(index, 1);
                dados.push(action.payload);
            }
            return { ...state, repos: { ...state.repos, objeto: { ...state.repos.objeto, dados: dados } } }
        case GET_ADICIONAR_NOTAS_SUCCESS:
            var dados = state.repos.objeto.dados ?? [];
            dados.push(action.payload);
            return { ...state, repos: { ...state.repos, objeto: { ...state.repos.objeto, dados: dados } } }
        case GET_ADICIONAR_NOTAS_FAIL:
            return { ...state, error: action.payload };
        case DEL_NOTA:
            var dados = state.repos.objeto.dados ?? [];
            dados = dados.filter(x => x.id !== action.payload);
            return { ...state, repos: { ...state.repos, objeto: { ...state.repos.objeto, dados: dados } } }
        case SET_PAYLOAD_NOTA:
            console.log("SET_PAYLOAD_NOTA", action.payload);

            return { ...state, repos: { ...state.repos, lastPayload: action.payload } }
        default:
            return state;
    }
}

export function listarNotasReset() {
    return { type: GET_LISTAR_NOTAS_RESET }
}

export function atualizarNota(nota: extracaoModel) {
    return { type: PUT_ATUALIZAR_NOTA, payload: nota };
}

export function removerNotaRepos(idNota: number) {
    console.log("removerNotaRepos", idNota);

    return { type: DEL_NOTA, payload: idNota }
}

export function ordernarNotasRepos(ordenarId) {
    // console.log("****************ordernarNotasRepos****************", lista);


    return (dispatch, getState) => {

        var lastPayload = getState().ListarNotasReducer.repos.lastPayload
        var lista = getState().ListarNotasReducer.repos.objeto.dados

        dispatch({ type: SET_PAYLOAD_NOTA, payload: { ...lastPayload, ordernarId: ordenarId } });

        var options = new FetchApiOptions(
            GET_LISTAR_NOTAS,
            '/Nota/Ordenar',
            'POST',
            {
                lista: lista,
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

export function listarNotasRepos(payload: ExtracaoPayload) {
    console.log("****************ListarNotasRepos****************", payload);


    return (dispatch, getState) => {

        if (payload == null) {
            payload = getState().ListarNotasReducer.repos.lastPayload
        }

        dispatch({ type: SET_PAYLOAD_NOTA, payload: payload });

        var options = new FetchApiOptions(
            GET_LISTAR_NOTAS,
            '/Nota/Listar',
            'POST',
            payload,
            // {
            //     dataInicio: payload.dataInicio?.toISOString(),
            //     dataFim: payload.dataFim?.toISOString(),
            //     favorito: payload.favorito,
            //     ordernarId: payload.ordenarId,
            //     idEmissor: payload.idEmissor
            // },
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

function ordernarNotasReposSuccess(dados: object[], listaEnumValue: string){
    
    dados.sort()
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
    // console.log("ListarNotasReposError", response);

    var types = [];

    types.push({ type: GET_LISTAR_NOTAS_FAIL, payload: response });

    types.push(showMessage(response.mensagem));

    return types;
}