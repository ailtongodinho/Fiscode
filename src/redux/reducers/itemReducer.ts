import { fetchApi } from "../fetchs/index";
import { FetchApiOptions } from "../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../models/api/ResponseModel";
import { showToast } from "../reducers/globalReducer";
import { extracaoItemModel } from "../../models/api/ExtracaoModel";

const GET_ITEM = 'nfce/item/repos/LOAD';
const GET_ITEM_SUCCESS = 'nfce/item/repos/LOAD_SUCCESS';
const GET_ITEM_ERROR = 'nfce/item/repos/LOAD_ERROR';
const SET_ITEM_FAVORITAR = 'nfce/item/repos/SET_FAVORITAR';
const SET_ITEM_FAVORITAR_SUCCESS = 'nfce/item/repos/SET_FAVORITAR_SUCCESS';
const SET_ITEM_FAVORITAR_ERROR = 'nfce/item/repos/SET_FAVORITAR_ERROR';

const defaultRepos = {
    lista: null,
    sucesso: false
}

export function itemReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (ITEM): ", action);
    switch (action.type) {
        case SET_ITEM_FAVORITAR_SUCCESS:
            return { ...state, repos: { ...state.repos, sucesso: action.payload } }
        case SET_ITEM_FAVORITAR_ERROR:
            return { ...state, repos: { ...state.repos, sucesso: action.payload } }
        case GET_ITEM_SUCCESS:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: true } }
        case GET_ITEM_ERROR:
            return { ...state, repos: { ...state.repos, lista: action.payload, sucesso: false } }
        default:
            return state;
    }
}

export function setFavorito(itemId: number) {
    return (dispatch, getState) => {
        var options = new FetchApiOptions(
            SET_ITEM_FAVORITAR,
            '/Item/Favoritar',
            'POST',
            {
                id: itemId
            },
            new Headers({
                "Authorization": "Bearer " + getState().loginReducer.repos.objeto?.accessToken
            })
        );

        return fetchApi(
            options,
            dispatch,
            itemFavoritarSuccess,
            itemFavoritarError
        );
    }
}

function itemFavoritarSuccess(response: ResponseModel) {
    var types = [];
    types.push({ type: SET_ITEM_FAVORITAR_SUCCESS, payload: response.objeto })
    return types;
}

function itemFavoritarError(response: ResponseModel) {
    var types = [];
    types.push({ type: SET_ITEM_FAVORITAR_ERROR, payload: response });
    types.push(showToast({ text: response.mensagem }));
    return types;
}