import { fetchApi } from "../fetchs/index";
import { FetchApiOptions } from "../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../models/api/ResponseModel";
import { showToast } from "../reducers/globalReducer";
import { extrairModel } from "../../models/api/ExtrairModel";
import { ReactReduxContext } from "react-redux";
import { listarNotasRepos } from "./nota/notaListarReducer";

const GET_LEITOR = 'nfce/leitor/repos/LOAD';
const SET_IMAGEM_LEITOR = 'nfce/leitor/repos/SET_IMAGEM';
const SET_URL_LEITOR = 'nfce/leitor/repos/SET_URL';
const GET_LEITOR_RESET = 'nfce/leitor/repos/LOAD_RESET';
const GET_LEITOR_SUCCESS = 'nfce/leitor/repos/LOAD_SUCCESS';
const GET_LEITOR_FAIL = 'nfce/leitor/repos/LOAD_FAIL';

const defaultRepos = {
    mensagem: "Leitor do nota",
    emissao: new Date(),
    sucesso: false,
    idNota: null,
    imagem: null,
    conteudoImagem: null,
    hostKey: null,
    url: null
}

export function leitorReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (LEITOR): ", action);
    switch (action.type) {
        case GET_LEITOR:
            return { ...state };
        case GET_LEITOR_RESET:
            return { ...state, repos: defaultRepos }
        case GET_LEITOR_SUCCESS:
            return { ...state, repos: { ...state.repos, ...action.payload } };
        case GET_LEITOR_FAIL:
            return { ...state, repos: { ...state.repos, ...action.payload } };
        case SET_IMAGEM_LEITOR:
            return { ...state, repos: { ...state.repos, conteudoImagem: action.payload } };
        case SET_URL_LEITOR:
            return { ...state, repos: { ...state.repos, url: action.payload } };
        default:
            return state;
    }
}

export function setConteudoImagem(conteudo: string) {
    return { type: SET_IMAGEM_LEITOR, payload: conteudo }
}

export function setUrl(conteudo: string) {
    return { type: SET_URL_LEITOR, payload: conteudo }
}

export function extrairNotaReset() {
    return { type: GET_LEITOR_RESET, payload: null }
}

export function extrairNotaRepos(payload: extrairModel) {
    // console.log("*******************************extrairNotaRepos", payload);


    return (dispatch, getState) => {

        if (payload?.url != null) dispatch(setUrl(payload.url));

        var options = new FetchApiOptions(
            GET_LEITOR,
            '/Extracao/Extrair',
            'POST',
            {
                url: getState().leitorReducer.repos.url,
                imagem: getState().leitorReducer.repos.conteudoImagem,
                HostKey: getState().leitorReducer.repos.hostKey,
            },
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            LeitorReposSuccess,
            LeitorReposError
        );
    }
}

function LeitorReposSuccess(response: ResponseModel) {
    console.log("LeitorReposSuccess", response);

    var types = [];

    types.push({
        type: GET_LEITOR_SUCCESS, payload: {
            sucesso: true,
            emissao: response.objeto.emissao,
            mensagem: response.objeto.mensagem,
            idNota: response.objeto.idNota,
            imagem: response.objeto.imagem,
            hostKey: response.objeto.hostKey
        }
    });

    types.push(listarNotasRepos(null));

    types.push(showToast({
        text: response.objeto.mensagem,
        type: response.sucesso ? "success" : "danger"
    }))

    return types;
}

function LeitorReposError(response: ResponseModel) {
    console.log("LeitorReposError", response);

    var types = [];

    types.push({
        type: GET_LEITOR_FAIL, payload: {
            sucesso: false,
            mensagem: response.mensagem,
        }
    });

    types.push(showToast({
        text: response.mensagem,
        type: "danger"
    }))

    return types;
}