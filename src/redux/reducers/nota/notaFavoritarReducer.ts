import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";

export const GET_FAVORITAR_NOTA = 'nfce/notaFavoritar/repos/LOAD';
export const GET_FAVORITAR_NOTA_RESET = 'nfce/notaFavoritar/repos/RESET';
export const GET_FAVORITAR_NOTA_SUCCESS = 'nfce/notaFavoritar/repos/LOAD_SUCCESS';
export const GET_FAVORITAR_NOTA_FAIL = 'nfce/notaFavoritar/repos/LOAD_FAIL';

const defaultRepos = false

export function notaFavoritarReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (FAVORITAR_NOTA): ", action);
    switch (action.type) {
        case GET_FAVORITAR_NOTA:
            return { ...state };
        case GET_FAVORITAR_NOTA_RESET:
            return { ...state, repos: defaultRepos };
        case GET_FAVORITAR_NOTA_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_FAVORITAR_NOTA_FAIL:
            return { ...state, repos: action.payload };
        default:
            return state;
    }
}

export function notaFavoritarReset() {
    return { type: GET_FAVORITAR_NOTA_RESET }
}

export function notaFavoritarRepos(payload: number) {

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_FAVORITAR_NOTA,
            '/Nota/Favoritar',
            'POST',
            {
                id: payload
            },
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            notaFavoritarReposSuccess,
            notaFavoritarReposError,
            false
        );
    }
}

function notaFavoritarReposSuccess(response: ResponseModel) {
    console.log("notaFavoritarReposSuccess", response);

    var types = [];

    types.push({ type: GET_FAVORITAR_NOTA_SUCCESS, payload: response.sucesso });

    return types;
}

function notaFavoritarReposError(response: ResponseModel) {
    console.log("notaFavoritarReposError", response);

    var types = [];

    types.push({ type: GET_FAVORITAR_NOTA_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}