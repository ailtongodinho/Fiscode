import { AsyncStorage } from "react-native";

//  Variáveis
const storage_login = "@store_login_login";
const storage_senha = "@store_login_senha";
const storage_lembrar = "@store_login_lembrar";

//  SENHA
export async function getSenha() {
    return await AsyncStorage.getItem(storage_senha);
}
export async function setSenha(texto: object) {
    await AsyncStorage.setItem(storage_senha, texto);
}
export async function removeSenha() {
    await AsyncStorage.removeItem(storage_senha);
}
//  LOGIN
export async function getLogin() {
    return await AsyncStorage.getItem(storage_login);
}
export async function setLogin(texto: object) {
    await AsyncStorage.setItem(storage_login, texto);
}
export async function removeLogin() {
    await AsyncStorage.removeItem(storage_login);
}
//  LEMBRAR
export async function getLembrarLogin() {
    return await AsyncStorage.getItem(storage_lembrar);
}
export async function setLembrarLogin(texto: object) {
    await AsyncStorage.setItem(storage_lembrar, texto);
}
export async function removeLembrarLogin() {
    await AsyncStorage.removeItem(storage_lembrar);
}