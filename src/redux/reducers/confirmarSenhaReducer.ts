import { fetchApi } from "../fetchs/index";
import { FetchApiOptions } from "../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../models/api/ResponseModel";
import { showToast } from "../reducers/globalReducer";

export const GET_CONFIRMAR_SENHA = 'nfce/ConfirmarSenha/repos/LOAD';
export const GET_CONFIRMAR_SENHA_RESET = 'nfce/ConfirmarSenha/repos/RESET';
export const GET_CONFIRMAR_SENHA_SUCCESS = 'nfce/ConfirmarSenha/repos/LOAD_SUCCESS';
export const GET_CONFIRMAR_SENHA_FAIL = 'nfce/ConfirmarSenha/repos/LOAD_FAIL';

const defaultRepos = {
    login: '',
    senha: '',
    sucesso: false
}

export function ConfirmarSenhaReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (CONFIRMAR_SENHA): ", action);
    switch (action.type) {
        case GET_CONFIRMAR_SENHA:
            return { ...state };
        case GET_CONFIRMAR_SENHA_RESET:
            return { ...state, repos: defaultRepos };
        case GET_CONFIRMAR_SENHA_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_CONFIRMAR_SENHA_FAIL:
            return { ...state, error: action.error };
        default:
            return state;
    }
}

export function ConfirmarSenhaReset() {
    return { type: GET_CONFIRMAR_SENHA_RESET }
}

export function ConfirmarSenhaRepos(payload) {

    var options = new FetchApiOptions(
        GET_CONFIRMAR_SENHA,
        '/Usuario/Login',
        'POST',
        {
            login: payload.login,
            senha: payload.senha
        },
        null
    );

    return dispatch => {
        return fetchApi(
            options,
            dispatch,
            ConfirmarSenhaReposSuccess,
            ConfirmarSenhaReposError
        );
    }
}

function ConfirmarSenhaReposSuccess(response: ResponseModel) {
    console.log("ConfirmarSenhaReposSuccess", response);

    var types = [];

    types.push({ type: GET_CONFIRMAR_SENHA_SUCCESS, payload: response });

    if (response.objeto !== null && !response.objeto.authenticated) {
        types.push(showToast({ text: response.mensagem }));
    }

    return types;
}

function ConfirmarSenhaReposError(response: ResponseModel) {
    console.log("ConfirmarSenhaReposError", response);

    var types = [];

    types.push({ type: GET_CONFIRMAR_SENHA_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}