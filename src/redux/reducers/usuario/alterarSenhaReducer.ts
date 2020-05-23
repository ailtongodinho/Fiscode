import { fetchApi } from "../../fetchs/index";
import { FetchApiOptions } from "../../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../../models/api/ResponseModel";
import { showToast } from "../../reducers/globalReducer";

export const GET_ALTERAR_SENHA = 'nfce/AlterarSenha/repos/LOAD';
export const GET_ALTERAR_SENHA_RESET = 'nfce/AlterarSenha/repos/RESET';
export const GET_ALTERAR_SENHA_SUCCESS = 'nfce/AlterarSenha/repos/LOAD_SUCCESS';
export const GET_ALTERAR_SENHA_FAIL = 'nfce/AlterarSenha/repos/LOAD_FAIL';

const defaultRepos = {
    senhaAntiga: '',
    senhaNova: '',
    sucesso: false
}

export function alterarSenhaReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (ALTERAR_SENHA): ", action);
    switch (action.type) {
        case GET_ALTERAR_SENHA:
            return { ...state };
        case GET_ALTERAR_SENHA_RESET:
            return { ...state, repos: defaultRepos };
        case GET_ALTERAR_SENHA_SUCCESS:
            return { ...state, repos: action.payload };
        case GET_ALTERAR_SENHA_FAIL:
            return { ...state, error: action.error };
        default:
            return state;
    }
}

export function AlterarSenhaReset() {
    return { type: GET_ALTERAR_SENHA_RESET }
}

export function AlterarSenhaRepos(payload) {
    console.log("AlterarSenhaRepos", payload);

    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            GET_ALTERAR_SENHA,
            '/Usuario/AlterarSenha',
            'POST',
            payload,
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            AlterarSenhaReposSuccess,
            AlterarSenhaReposError
        );
    }
}

function AlterarSenhaReposSuccess(response: ResponseModel) {
    console.log("AlterarSenhaReposSuccess", response);

    var types = [];

    types.push({ type: GET_ALTERAR_SENHA_SUCCESS, payload: response });
    
    if(response.objeto !== null)
        types.push(showToast({ text: response.objeto.message}));

    return types;
}

function AlterarSenhaReposError(response: ResponseModel) {
    console.log("AlterarSenhaReposError", response);

    var types = [];

    types.push({ type: GET_ALTERAR_SENHA_FAIL, payload: response });

    types.push(showToast({ text: response.mensagem}));

    return types;
}