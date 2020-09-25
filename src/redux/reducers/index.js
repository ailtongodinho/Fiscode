//  REDUX
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from 'redux';
//  REDUCERS
import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { validarReducer } from "./validarReducer";
import { globalReducer } from "./globalReducer";
import { RegistrarReducer } from "./registrarReducer";
import { ConfirmarSenhaReducer } from "./confirmarSenhaReducer";
//  NOTA
import { ListarNotasReducer } from "./nota/notaListarReducer";
import { notaFavoritarReducer } from "./nota/notaFavoritarReducer";
import { deletarNotaReducer } from "./nota/notaDeletarReducer";
import { leitorReducer } from "./leitorReducer";
import { configuracoesReducer } from "./configuracoesReducer";
//  Emissor
import { emissorAgregadoReducer } from "./emissor/agregado.emissorReducer";
//  Usuario
import { alterarSenhaReducer } from "./usuario/alterarSenhaReducer";
import { usuarioReducer } from "./usuario/usuarioReducer";
//  Compras
import { listarComprasReducer } from "./compras/listar.comprasReducer";
import { novoComprasReducer } from "./compras/novo.comprasReducer";
import { comprasReducer } from "./compras/comprasReducer";
import { produtoComprasReducer } from "./compras/produto.comprasReducer";
import { compararComprasReducer } from "./compras/comparar.comprasReducer";
//  IBGE
import { ufIbgeReducer } from "./ibge/uf.ibge";
import { municipioIbgeReducer } from "./ibge/municipio.ibge";
//  Localidade
import { localidadeEstadosReducer } from "./localidade/estados.localidadeReducer";
import { localidadeDistritosReducer } from "./localidade/distritos.localidadeReducer";
import { localidadeMunicipiosReducer } from "./localidade/municipios.localidadeReducer";

const reducerCombined = combineReducers({
    validarReducer,
    loginReducer,
    globalReducer,
    RegistrarReducer,
    ListarNotasReducer,
    ConfirmarSenhaReducer,
    notaFavoritarReducer,
    usuarioReducer,
    leitorReducer,
    deletarNotaReducer,
    configuracoesReducer,
    emissorAgregadoReducer,
    alterarSenhaReducer,
    comprasReducer,
    novoComprasReducer,
    listarComprasReducer,
    produtoComprasReducer,
    ufIbgeReducer,
    municipioIbgeReducer,
    localidadeEstadosReducer,
    localidadeDistritosReducer,
    localidadeMunicipiosReducer,
    compararComprasReducer
});

const middlewares = [thunk];

export const store = createStore(reducerCombined, applyMiddleware(...middlewares));