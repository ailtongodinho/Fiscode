import { fetchApi } from "../fetchs/index";
import { FetchApiOptions } from "../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../models/api/ResponseModel";
import { showMessage } from "../reducers/globalReducer";
import { extracaoItemModel } from "../../models/api/ExtracaoModel";

const GET_ITEM = 'nfce/item/repos/LOAD';
const SET_ITEM_FAVORITAR = 'nfce/item/repos/SET_FAVORITAR';
const SET_ITEM_FAVORITAR_SUCCESS = 'nfce/item/repos/SET_FAVORITAR_SUCCESS';
const SET_ITEM_FAVORITAR_ERROR = 'nfce/item/repos/SET_FAVORITAR_ERROR';

const defaultRepos = []

export function itemReducer(state = { repos: defaultRepos }, action) {
    // console.log("AQUI SÃO OS ACTIONS (ITEM): ", action);
    switch (action.type) {
        case GET_ITEM:
            return { ...state };
        case SET_ITEM_FAVORITAR:
            return { ...state, repos: action }
        case SET_ITEM_FAVORITAR_SUCCESS:
            return { ...state, repos: action }
        case SET_ITEM_FAVORITAR_ERROR:
            return { ...state, repos: action }
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
    types.push(showMessage(response.mensagem));
    return types;
}