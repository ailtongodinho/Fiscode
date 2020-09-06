import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { localidadeMunicipiosRepos } from "./municipios.localidadeReducer";

export const GET_LOCALIDADE_ESTADOS = 'nfce/localidade_estados/repos/LOAD';
export const GET_LOCALIDADE_ESTADOS_RESET = 'nfce/localidade_estados/repos/RESET';
export const SET_LOCALIDADE_ESTADOS = 'nfce/localidade_estados/repos/SET';
export const GET_LOCALIDADE_ESTADOS_SUCCESS = 'nfce/localidade_estados/repos/LOAD_SUCCESS';
export const GET_LOCALIDADE_ESTADOS_FAIL = 'nfce/localidade_estados/repos/LOAD_FAIL';

const defaultRepos = {
    sucesso: false,
    lista: null,
    selecionado: null
}

export function localidadeEstadosReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_LOCALIDADE_ESTADOS:
            return { ...state };
        case GET_LOCALIDADE_ESTADOS_RESET:
            return { ...state, repos: defaultRepos };
        case GET_LOCALIDADE_ESTADOS_SUCCESS:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: true } };
        case SET_LOCALIDADE_ESTADOS:
            return { ...state, repos: { ...state.repos, selecionado: action.payload, sucesso: true } };
        case GET_LOCALIDADE_ESTADOS_FAIL:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: false } };
        default:
            return state;
    }
}

export function localidadeEstadosReset() {
    return { type: GET_LOCALIDADE_ESTADOS_RESET }
}

export function localidadeEstadosSelecionado(payload) {

    return dispatch => {
        dispatch({ type: SET_LOCALIDADE_ESTADOS, payload: payload })
        dispatch(localidadeMunicipiosRepos());
    }
}

export function localidadeEstadosRepos() {


    return (dispatch, getState) => {

        var options = new FetchApiOptions(
            GET_LOCALIDADE_ESTADOS,
            '/Localidade/ListarEstados',
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );
        return fetchApi(
            options,
            dispatch,
            localidadeEstadosReposSuccess,
            localidadeEstadosReposError
        );
    }
}

function localidadeEstadosReposSuccess(response: ResponseModel) {
    console.log("LocalidadeEstadosReposSuccess", response);

    var types = [];

    types.push({ type: GET_LOCALIDADE_ESTADOS_SUCCESS, payload: response.objeto });
    if (!response.sucesso) {
        types.push(showToast({ text: response.mensagem }));
    }

    return types;
}

function localidadeEstadosReposError(response: ResponseModel) {
    console.log("LocalidadeEstadosReposError", response);

    var types = [];

    types.push({ type: GET_LOCALIDADE_ESTADOS_FAIL, payload: null });
    types.push(showToast({ text: response.mensagem }));

    return types;
}