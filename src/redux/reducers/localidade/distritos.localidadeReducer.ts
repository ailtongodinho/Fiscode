import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";

export const GET_LOCALIDADE_DISTRITOS = 'nfce/localidade_distritos/repos/LOAD';
export const GET_LOCALIDADE_DISTRITOS_RESET = 'nfce/localidade_distritos/repos/RESET';
export const GET_LOCALIDADE_DISTRITOS_SUCCESS = 'nfce/localidade_distritos/repos/LOAD_SUCCESS';
export const GET_LOCALIDADE_DISTRITOS_FAIL = 'nfce/localidade_distritos/repos/LOAD_FAIL';

const defaultRepos = {
    sucesso: false,
    lista: null
}

export function localidadeDistritosReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_LOCALIDADE_DISTRITOS:
            return { ...state };
        case GET_LOCALIDADE_DISTRITOS_RESET:
            return { ...state, repos: defaultRepos };
        case GET_LOCALIDADE_DISTRITOS_SUCCESS:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: true } };
        case GET_LOCALIDADE_DISTRITOS_FAIL:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: false } };
        default:
            return state;
    }
}

export function localidadeDistritosReset() {
    return { type: GET_LOCALIDADE_DISTRITOS_RESET }
}

export function localidadeDistritosRepos() {

    return (dispatch, getState) => {

        const idMunicipio= getState().localidadeMunicipiosReducer.repos.selecionado?.id;

        if (idMunicipio == undefined) return false;

        var options = new FetchApiOptions(
            GET_LOCALIDADE_DISTRITOS,
            '/Localidade/ListarDistritos/' + idMunicipio,
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            localidadeDistritosReposSuccess,
            localidadeDistritosReposError
        );
    }
}

function localidadeDistritosReposSuccess(response: ResponseModel) {
    console.log("LocalidadeDistritosReposSuccess", response);

    var types = [];

    types.push({ type: GET_LOCALIDADE_DISTRITOS_SUCCESS, payload: response.objeto });
    if (!response.sucesso) {
        types.push(showToast({ text: response.mensagem }));
    }

    return types;
}

function localidadeDistritosReposError(response: ResponseModel) {
    console.log("LocalidadeDistritosReposError", response);

    var types = [];

    types.push({ type: GET_LOCALIDADE_DISTRITOS_FAIL, payload: null });
    types.push(showToast({ text: response.mensagem }));

    return types;
}