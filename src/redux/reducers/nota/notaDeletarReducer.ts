import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { extracaoModel, extracaoItemModel } from "../../../models/api/ExtracaoModel";
import { removerNotaRepos, listarNotasRepos } from "./notaListarReducer";

export const GET_DELETAR_NOTAS = 'nfce/DeletarNota/repos/LOAD';
export const GET_DELETAR_NOTAS_RESET = 'nfce/DeletarNota/repos/RESET';
export const GET_DELETAR_NOTAS_SUCCESS = 'nfce/DeletarNota/repos/LOAD_SUCCESS';
export const GET_DELETAR_NOTAS_FAIL = 'nfce/DeletarNota/repos/LOAD_FAIL';

const defaultRepos = {
    idNota: null
}

export function deletarNotaReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_DELETAR_NOTAS:
            return { ...state, repos: { idNota: action.payload } };
        case GET_DELETAR_NOTAS_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_DELETAR_NOTAS_FAIL:
            return { ...state, error: action.error };
        default:
            return state;
    }
}

export function deletarNotaRepos(idNota: number) {
    // console.log("****************DeletarNotaRepos****************", idNota);

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_DELETAR_NOTAS,
            '/Nota/Deletar/' + idNota,
            'DELETE',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            deletarNotaReposSuccess,
            deletarNotaReposError
        );
    }
}

function deletarNotaReposSuccess(response: ResponseModel) {
    console.log("DeletarNotaReposSuccess", response);

    var types = [];

    types.push({ type: GET_DELETAR_NOTAS_SUCCESS, payload: response });

    types.push(showToast({
        text: response.objeto.mensagem
    }))

    types.push(listarNotasRepos(null))

    return types;
}

function deletarNotaReposError(response: ResponseModel) {
    console.log("DeletarNotaReposError", response);

    var types = [];

    types.push({ type: GET_DELETAR_NOTAS_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}