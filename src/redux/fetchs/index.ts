import { setLoading, showMessage } from "../reducers/globalReducer";
import { setAuthenticated } from "../reducers/loginReducer";
import { FetchApiOptions } from "../../models/redux/FetchApiOptionsModel";
import { ResponseModel } from "../../models/api/ResponseModel";

const baseConfig = {
    // baseURL: 'https://nfceapi.herokuapp.com',
    baseURL: 'http://192.168.0.19:5001',
    // baseURL: 'http://192.168.43.2:5001',
    headers: new Headers({
        "Content-Type": 'application/json',
        "Accept": "*/*"
    })
}

const defaultNetworkErrorResponse = new ResponseModel(false, 505, "Ops... Não conseguimos conexão com o servidor! \n Por favor, tente novamente mais tarde", new Date(Date.now()), null)

export function fetchApi(options: FetchApiOptions, dispatch: Function, onSuccess: Function, onError: Function, showLoading: boolean = true) {

    //  Criando URL
    var url = baseConfig.baseURL + options.Url;
    //  Criando Header
    baseConfig.headers.forEach((value, key) => options.Headers.append(key, value))
    //  Aplicando tela de Loading
    if (showLoading) dispatch(setLoading(true));
    //  Chamando dispatch do redux
    dispatch({ type: options.Type });
    var newOptions = {
        method: options.Method,
        body: options.Body != null ? JSON.stringify(options.Body) : null,
        headers: options.Headers,
    }
    //  Variável para Dispatch
    var types = [];
    console.log("CHAMANDO API | " + options.Method, url, newOptions);

    //  Chama a API
    return fetch(url, newOptions)
        .then(x => {
            if (x.status == 401) {
                dispatch(setAuthenticated(false));
                throw new ResponseModel(false, x.status, "Sua Sessão foi expirada", new Date(), null);
            }
            return x.json();
        })
        .then(response => {
            //  Valida se há variavel de ModelValidate
            if (response.hasOwnProperty("errors") || !response.sucesso) {
                throw response;
            }
            types = onSuccess(response);
        })
        .catch(error => {
            if (isNetworkError(error)) error = defaultNetworkErrorResponse
            types = onError(error);
        })
        .then(() => {
            if (showLoading) dispatch(setLoading(false));
            types.forEach(element => {
                dispatch(element);
            });
        });
}

function isNetworkError(response) {
    return response instanceof TypeError && response.message !== null;
}