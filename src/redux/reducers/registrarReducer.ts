import { fetchApi } from "../fetchs/index";
import { FetchApiOptions } from "../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../models/api/ResponseModel";
import { showToast } from "../reducers/globalReducer";

export const GET_REGISTRAR = 'nfce/registrar/repos/LOAD';
export const GET_REGISTRAR_RESET = 'nfce/registrar/repos/RESET';
export const GET_REGISTRAR_SUCCESS = 'nfce/registrar/repos/LOAD_SUCCESS';
export const GET_REGISTRAR_FAIL = 'nfce/registrar/repos/LOAD_FAIL';

const defaultRepos = {
    login: '',
    senha: '',
    sucesso: false
}

export function RegistrarReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_REGISTRAR:
            return { ...state };
        case GET_REGISTRAR_RESET:
            return { ...state, repos: defaultRepos };
        case GET_REGISTRAR_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_REGISTRAR_FAIL:
            return { ...state, error: action.error };
        default:
            return state;
    }
}

export function RegistrarReset() {
    return { type: GET_REGISTRAR_RESET }
}

export function RegistrarRepos(payload) {

    var options = new FetchApiOptions(
        GET_REGISTRAR,
        '/Usuario/Novo',
        'POST',
        payload,
    );

    return dispatch => {
        return fetchApi(
            options,
            dispatch,
            RegistrarReposSuccess,
            RegistrarReposError
        );
    }
}

function RegistrarReposSuccess(response: ResponseModel) {
    console.log("RegistrarReposSuccess", response);

    var types = [];

    types.push({ type: GET_REGISTRAR_SUCCESS, payload: response });
    if (!response.sucesso) {
        types.push(showToast({ text: response.mensagem }));
    }

    return types;
}

function RegistrarReposError(response: ResponseModel) {
    console.log("RegistrarReposError", response);

    var types = [];

    types.push({ type: GET_REGISTRAR_FAIL, payload: response });
    types.push(showToast({ text: response.mensagem }));

    return types;
}