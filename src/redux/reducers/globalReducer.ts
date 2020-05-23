import { backgroundColor } from "../../styles/layouts/layouts.styles";
import { StatusBarStyle, Clipboard } from "react-native";

export const SET_LOADING = 'nfce/global/repos/SET_LOADING';
export const SHOW_MESSAGE = 'nfce/global/repos/SET_MESSAGE';
export const SHOW_TOAST = 'nfce/global/repos/SET_TOAST';
export const RESET_TOAST = 'nfce/global/repos/RESET_TOAST';
export const UPDATE_STATUSBAR = 'nfce/global/repos/SET_STATUSBAR';

const defaultRepos = {
    loading: false,
    token: '',
    modal: {
        show: false,
        message: "Bem vindo!",
        type: 0
    },
    toast: {
        show: false,
        config: {
            text: "Olá! Bem vindo!",
            buttonText: "Ok",
            position: "bottom",
            type: null,
            duration: 4000,
            onClose: null,
            style: [{ marginHorizontal: 50, marginVertical: 70, borderRadius: 10 }],
            textStyle: [{ textAlign: 'center' }],
            buttonTextStyle: null,
            buttonStyle: null
        }
    },
    statusBar: {
        backgroundColor: backgroundColor
    }
}

export function globalReducer(state = defaultRepos, action) {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload, modal: { ...state.modal, show: false }, toast: { ...state.toast, show: false } };
        case SHOW_MESSAGE:
            return { ...state, modal: { ...state.modal, show: true, message: action.payload } }
        case SHOW_TOAST:
            return { ...state, toast: { ...state.toast, show: true, config: { ...state.toast.config, ...action.payload } } }
        case RESET_TOAST:
            return { ...state, toast: { ...state.toast, show: false } }
        case UPDATE_STATUSBAR:
            return { ...state, statusBar: { ...state.statusBar, ...action.payload } }
        default:
            return state;
    }
}

export function copiarClipboard(texto: string){
    Clipboard.setString(texto);
    return showToast({ text: "Copiado para os Clipboard!" });
}

export function setLoading(isLoading: boolean) {
    return { type: SET_LOADING, payload: isLoading }
}

export function showMessage(message: string) {
    return { type: SHOW_MESSAGE, payload: message }
}

export function showToast(config: object) {
    return { type: SHOW_TOAST, payload: config }
}

export function resetToast() {
    return { type: RESET_TOAST, payload: null }
}

export function updateStatusBar(statusBar: { backgroundColor: string, barStyle: StatusBarStyle }) {
    // console.log("updateStatusBar", statusBar);

    return { type: UPDATE_STATUSBAR, payload: statusBar }
}