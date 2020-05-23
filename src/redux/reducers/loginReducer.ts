import { fetchApi } from "../fetchs/index";
import { FetchApiOptions } from "../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../models/api/ResponseModel";
import { showMessage, showToast } from "../reducers/globalReducer";
import { getUsuarioRepos } from "./usuario/usuarioReducer";
import { getConfiguracoes } from "./configuracoesReducer";

const GET_LOGIN = 'nfce/login/repos/LOAD';
const SET_LOGIN = 'nfce/login/repos/SET';
const SET_AUTORIZAR = 'nfce/login/repos/SET_AUTORIZAR';
const GET_LOGIN_SUCCESS = 'nfce/login/repos/LOAD_SUCCESS';
const GET_LOGIN_FAIL = 'nfce/login/repos/LOAD_FAIL';
const GET_LOGIN_AUTH = 'nfce/login/repos/LOAD_AUTH';

const defaultRepos = {
    login: '',
    senha: '',
    autorizar: false,
    objeto: {
        authenticated: false,
        token: null
    }
}

export function loginReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (LOGIN): ", action);
    switch (action.type) {
        case GET_LOGIN:
            return { ...state };
        case SET_LOGIN:
            return { ...state, repos: { ...state.repos, login: action.payload.login } }
        case SET_AUTORIZAR:
            return { ...state, repos: { ...state.repos, autorizar: action.payload } }
        case GET_LOGIN_SUCCESS:
            return { ...state, repos: { ...state.repos, objeto: action.payload } };
        case GET_LOGIN_FAIL:
            return { ...state, repos: { ...state.repos, objeto: action.payload } };
        case GET_LOGIN_AUTH:
            return { ...state, repos: { ...state.repos, objeto: { ...state.repos.objeto, authenticated: action.payload } } }
        default:
            return state;
    }
}

export function setAuthenticated(authenticated: boolean) {
    return { type: GET_LOGIN_AUTH, payload: authenticated }
}

export function setAutorizar(autorizar: boolean) {
    return { type: SET_AUTORIZAR, payload: autorizar }
}

export function autorizarRepos(senha: string) {
    return (dispatch, getState) => {

        const json = {
            login: getState().loginReducer.repos.login,
            senha: senha
        }

        var options = new FetchApiOptions(
            GET_LOGIN,
            '/Usuario/Login',
            'POST',
            json,
            null
        );

        return fetchApi(
            options,
            dispatch,
            autorizarSuccess,
            autorizarError
        );
    }
}

function autorizarSuccess(response: ResponseModel) {
    var types = []

    types.push(setAutorizar(true));

    return types;
}

function autorizarError(response: ResponseModel) {
    var types = []

    types.push(setAutorizar(false));

    types.push(showToast({
        text: response.mensagem
    }))

    return types;
}

export function LoginRepos(payload) {

    return dispatch => {

        const json = {
            login: payload.login,
            senha: payload.senha
        };

        dispatch({ type: SET_LOGIN, payload: json })

        var options = new FetchApiOptions(
            GET_LOGIN,
            '/Usuario/Login',
            'POST',
            json,
            null
        );

        return fetchApi(
            options,
            dispatch,
            LoginReposSuccess,
            LoginReposError
        );
    }
}

function LoginReposSuccess(response: ResponseModel) {
    console.log("LoginReposSuccess", response);

    var types = [];

    types.push({ type: GET_LOGIN_SUCCESS, payload: response.objeto });

    if (response.objeto !== null && !response.objeto.authenticated) {
        types.push(showToast({ text: response.mensagem }));
        return types;
    }

    types.push(getUsuarioRepos());

    types.push(getConfiguracoes());

    return types;
}

function LoginReposError(response: ResponseModel) {
    console.log("LoginReposError", response);

    var types = [];

    types.push({ type: GET_LOGIN_FAIL, payload: response });

    types.push(showToast({
        text: response.mensagem
    }))

    // types.push(showMessage(response.mensagem));

    return types;
}