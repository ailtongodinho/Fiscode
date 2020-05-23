export const VALIDATE_LOGIN = 'nfce/login/repos/VALIDATE_LOGIN'
export const VALIDATE_LOGIN_SUCCESS = 'nfce/login/repos/VALIDATE_LOGIN_SUCESS'
export const VALIDATE_LOGIN_FAIL = 'nfce/login/repos/VALIDATE_LOGIN_FAIL'

export function validarReducer(state = { repos: [] }, action) {
    switch (action.type) {
        case VALIDATE_LOGIN:
            return { ...state, loading: true };
        case VALIDATE_LOGIN_SUCCESS:
            return { ...state, loading: false, repos: action.payload.data };
        case VALIDATE_LOGIN_FAIL:
            return { ...state, loading: false, error: 'Erro ao chamar API de validar' };
        default:
            return state;
    }
}