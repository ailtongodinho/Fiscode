import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../globalReducer";
import { extracaoModel, extracaoItemModel } from "../../../models/api/ExtracaoModel";
import { emissorAgregadoPayload, emissorAgregadoModel } from "../../../models/api/emissorAgregadoModel";

export const GET_EMISSOR_AGREGADO = 'nfce/Emissor/Listar/repos/LOAD';
export const GET_EMISSOR_AGREGADO_RESET = 'nfce/Emissor/Listar/repos/RESET';
export const GET_EMISSOR_AGREGADO_SUCCESS = 'nfce/Emissor/Listar/repos/LOAD_SUCCESS';
export const GET_EMISSOR_AGREGADO_FAIL = 'nfce/Emissor/Listar/repos/LOAD_FAIL';

const defaultRepos = null;


export function emissorAgregadoReducer(state = { repos: defaultRepos }, action) {
    switch (action.type) {
        case GET_EMISSOR_AGREGADO:
            return { ...state, repos: action.payload };
        case GET_EMISSOR_AGREGADO_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_EMISSOR_AGREGADO_FAIL:
            return { ...state, error: action.error };
        default:
            return state;
    }
}

export function emissorAgregadoRepos(payload: emissorAgregadoPayload) {
    // console.log("****************Emissor/ListarRepos****************", payload);

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_EMISSOR_AGREGADO,
            '/Emissor/Agregado',
            'POST',
            payload,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            emissorAgregadoReposSuccess,
            emissorAgregadoReposError
        );
    }
}

function emissorAgregadoReposSuccess(response: ResponseModel) {
    // console.log("Emissor/ListarReposSuccess", response);

    var types = [];

    types.push({ type: GET_EMISSOR_AGREGADO_SUCCESS, payload: response.objeto });

    return types;
}

function emissorAgregadoReposError(response: ResponseModel) {
    // console.log("Emissor/ListarReposError", response);

    var types = [];

    types.push({ type: GET_EMISSOR_AGREGADO_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem }));

    return types;
}