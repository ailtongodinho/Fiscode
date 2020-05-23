import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showMessage } from "../../reducers/globalReducer";
import { UsuarioModel } from "../../../models/api/usuarioModel";

const GET_USUARIO = 'nfce/usuario/repos/LOAD';
const GET_USUARIO_SUCCESS = 'nfce/usuario/repos/LOAD_SUCCESS';
const GET_USUARIO_FAIL = 'nfce/usuario/repos/LOAD_FAIL';

const defaultRepos = new UsuarioModel()

export function usuarioReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (USUARIO): ", action);
    switch (action.type) {
        case GET_USUARIO:
            return { ...state };
        case GET_USUARIO_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_USUARIO_FAIL:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export function getUsuarioRepos() {
    // console.log("getUsuarioRepos", "CHAMOU AQUI");
    
    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_USUARIO,
            '/Usuario',
            'GET',
            null,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            getUsuarioReposSuccess,
            getUsuarioReposError,
            false
        );
    }
}

function getUsuarioReposSuccess(response: ResponseModel) {
    // console.log("getUsuarioReposSuccess", response);

    var types = [];

    types.push({ type: GET_USUARIO_SUCCESS, payload: response });

    return types;
}

function getUsuarioReposError(response: ResponseModel) {
    // console.log("getUsuarioReposError", response);

    var types = [];

    types.push({ type: GET_USUARIO_FAIL, payload: response });

    types.push(showMessage(response.mensagem));

    return types;
}