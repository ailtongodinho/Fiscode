import { ibgeApi } from "../../fetchs/ibge";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { findNodeHandle } from "react-native";
import { municipioIbgeRepos } from "./municipio.ibge";

export const GET_UF_IBGE = 'nfce/IBGE/UF/repos/LOAD';
export const GET_UF_IBGE_RESET = 'nfce/IBGE/UF/repos/RESET';
export const GET_UF_IBGE_SUCCESS = 'nfce/IBGE/UF/repos/LOAD_SUCCESS';
export const GET_UF_IBGE_FAIL = 'nfce/IBGE/UF/repos/LOAD_FAIL';
export const SET_UF_IBGE = 'nfce/IBGE/UF/repos/SET';

const defaultRepos = {
    lista: null,
    selecionado: null
};

export function ufIbgeReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        // case GET_UF_IBGE:
        //     return { ...state, repos: action.payload };
        case GET_UF_IBGE_SUCCESS:
            return { ...state, repos: { ...state.repos, lista: action.payload } };
        case GET_UF_IBGE_FAIL:
            return { ...state, repos: { ...state.repos, lista: action.payload } };
        case SET_UF_IBGE:
            return { ...state, repos: { ...state.repos, selecionado: action.payload } };
        default:
            return state;
    }
}

export function ufIbgeSelecionado(item: object) {

    return (dispatch) => {
        dispatch({ type: SET_UF_IBGE, payload: item });
        dispatch(municipioIbgeRepos(null));
    }
}

export function ufIbgeRepos() {
    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_UF_IBGE,
            '/localidades/estados?orderBy=nome',
            'GET',
            null,
            null
        );

        return ibgeApi(
            options,
            dispatch,
            ufIbgeReposSuccess,
            ufIbgeReposError
        );
    }
}

function ufIbgeReposSuccess(response) {
    // console.log("IBGE_UF", response);

    var types = [];

    types.push({ type: GET_UF_IBGE_SUCCESS, payload: response });

    return types;
}

function ufIbgeReposError(response) {
    console.log("ufIbgeReposError", response[0]);

    var types = [];

    // types.push(showToast({ text: response }));

    return types;
}