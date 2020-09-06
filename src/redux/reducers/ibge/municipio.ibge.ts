import { ibgeApi } from "../../fetchs/ibge";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";

export const GET_MUNICIPIO_IBGE = 'nfce/IBGE/MUNICIPIO/repos/LOAD';
export const GET_MUNICIPIO_IBGE_RESET = 'nfce/IBGE/MUNICIPIO/repos/RESET';
export const GET_MUNICIPIO_IBGE_SUCCESS = 'nfce/IBGE/MUNICIPIO/repos/LOAD_SUCCESS';
export const GET_MUNICIPIO_IBGE_FAIL = 'nfce/IBGE/MUNICIPIO/repos/LOAD_FAIL';

const defaultRepos = {
    lista: null,
    selecionado: null
};

export function municipioIbgeReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        // case GET_MUNICIPIO_IBGE:
        //     return { ...state, repos: action.payload };
        case GET_MUNICIPIO_IBGE_SUCCESS:
            return { ...state, repos: { ...state.repos, lista: action.payload } };
        case GET_MUNICIPIO_IBGE_FAIL:
            return { ...state, repos: { ...state.repos, lista: action.payload } };
        default:
            return state;
    }
}

export function municipioIbgeRepos(uf) {
    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_MUNICIPIO_IBGE,
            '/localidades/estados/' + getState().ufIbgeReducer.repos.selecionado.id + '/municipios?orderBy=nome',
            'GET',
            null,
            null
        );

        return ibgeApi(
            options,
            dispatch,
            municipioIbgeReposSuccess,
            municipioIbgeReposError
        );
    }
}

function municipioIbgeReposSuccess(response) {
    // console.log("IBGE_MUNICIPIOS", response);

    var types = [];

    types.push({ type: GET_MUNICIPIO_IBGE_SUCCESS, payload: response });

    return types;
}

function municipioIbgeReposError(response) {
    var types = [];

    // types.push(showToast({ text: response }));

    return types;
}