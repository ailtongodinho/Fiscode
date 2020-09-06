import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { localidadeDistritosRepos } from "./distritos.localidadeReducer";

export const GET_LOCALIDADE_MUNICIPIOS = 'nfce/localidade_municipios/repos/LOAD';
export const SET_LOCALIDADE_MUNICIPIOS = 'nfce/localidade_municipios/repos/SET';
export const GET_LOCALIDADE_MUNICIPIOS_RESET = 'nfce/localidade_municipios/repos/RESET';
export const GET_LOCALIDADE_MUNICIPIOS_SUCCESS = 'nfce/localidade_municipios/repos/LOAD_SUCCESS';
export const GET_LOCALIDADE_MUNICIPIOS_FAIL = 'nfce/localidade_municipios/repos/LOAD_FAIL';

const defaultRepos = {
    sucesso: false,
    lista: null,
    selecionado: null
}

export function localidadeMunicipiosReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_LOCALIDADE_MUNICIPIOS:
            return { ...state };
        case GET_LOCALIDADE_MUNICIPIOS_RESET:
            return { ...state, repos: defaultRepos };
        case SET_LOCALIDADE_MUNICIPIOS:
            return { ...state, repos: { ...state.repos, selecionado: action.payload, sucesso: true } };
        case GET_LOCALIDADE_MUNICIPIOS_SUCCESS:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: true } };
        case GET_LOCALIDADE_MUNICIPIOS_FAIL:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: false } };
        default:
            return state;
    }
}

export function localidadeMunicipiosReset() {
    return { type: GET_LOCALIDADE_MUNICIPIOS_RESET }
}

export function localidadeMunicipiosSelecionado(payload) {
    return dispatch => {
        dispatch({ type: SET_LOCALIDADE_MUNICIPIOS, payload: payload });
        dispatch(localidadeDistritosRepos());
    }
}

export function localidadeMunicipiosRepos() {

    return (dispatch, getState) => {

        const idEstado = getState().localidadeEstadosReducer.repos.selecionado?.id;

        if (idEstado == undefined) return false;

        var options = new FetchApiOptions(
            GET_LOCALIDADE_MUNICIPIOS,
            '/Localidade/ListarMunicipios/' + idEstado,
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            localidadeMunicipiosReposSuccess,
            localidadeMunicipiosReposError
        );
    }
}

function localidadeMunicipiosReposSuccess(response: ResponseModel) {
    console.log("LocalidadeMunicipiosReposSuccess", response);

    var types = [];

    types.push({ type: GET_LOCALIDADE_MUNICIPIOS_SUCCESS, payload: response.objeto });
    if (!response.sucesso) {
        types.push(showToast({ text: response.mensagem }));
    }

    return types;
}

function localidadeMunicipiosReposError(response: ResponseModel) {
    console.log("LocalidadeMunicipiosReposError", response);

    var types = [];

    types.push({ type: GET_LOCALIDADE_MUNICIPIOS_FAIL, payload: null });
    types.push(showToast({ text: response.mensagem }));

    return types;
}