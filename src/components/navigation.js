import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Footer, FooterTab, Text, Header, Toast } from "native-base";

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//  Paginas
import ConfimarSenha from "../pages/login/confimarSenha.nativebase";
import Registrar from "../pages/login/registrar.nativebase";
import Login from "../pages/login/login.nativebase";
//  Notas
import Listar from "../pages/home/notas/listar.notas";
import Detalhes from "../pages/home/notas/detalhes.notas";
//  Compras
import ListarCompras from "../pages/home/compras/listar.compras";
import Compras from "../pages/home/compras/compras";
import NovaCompra from "../pages/home/compras/novo.compras";
import { Produto } from "../pages/home/compras/produto.compras";
import PesquisaDetalhesCompras from "../pages/home/compras/pesquisa.detalhes.compras";
import PesquisaCompras from "../pages/home/compras/pesquisa.compras";
//  Emissores
import ListarEmissores from "../pages/home/emissores/lista.emissores";
//  FooterTabs
import { Menu } from "../pages/home/menu";
//  Leitor
import Leitor from "../pages/home/leitor/leitor";
import ConfirmarLeitor from "../pages/home/leitor/confirmar.leitor";
//  Usuario
import Usuario from "../pages/home/usuario/usuario";
import AlterarUsuario from "../pages/home/usuario/alterar.usuario";
import AlterarSenha from "../pages/home/usuario/senha.usuario";
import autorizar  from "./autorizar"
//  Components
import { Loading } from "../components/loading";
import { ModalAlert } from "../components/modalAlert";
//  Styles
import { styles, pallet, backgroundColor } from "../styles/layouts/layouts.styles";
import { StatusBar } from "react-native";
//  Redux
import { resetToast } from "../redux/reducers/globalReducer";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const loginNavigation = (

    <Stack.Navigator
        headerMode="none"
        initialRouteName="Login"
    >
        <Stack.Screen
            name="Login"
            component={Login}
        />
        <Stack.Screen
            name="Registro"
            component={Registrar}
        />
        <Stack.Screen
            name="ConfirmarSenha"
            component={ConfimarSenha}
        />
    </Stack.Navigator>
);

const homeNavigator = (
    <BottomTab.Navigator
        initialRouteName="Menu"
        tabBarOptions={{
            style: [styles.footerContainer],
            activeBackgroundColor: pallet[1],
            keyboardHidesTabBar: true,
            showLabel: false
        }}
    >
        <BottomTab.Screen
            name="Menu"
            component={Menu}
            options={{
                tabBarIcon: (props) => <Icon name="apps" style={{ color: props.color }} />
            }}
        />
        <BottomTab.Screen
            name="Listar"
            component={Listar}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        <BottomTab.Screen
            name="Autorizar"
            component={autorizar}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        <BottomTab.Screen
            name="AlterarSenha"
            component={AlterarSenha}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        <BottomTab.Screen
            name="Detalhes"
            component={Detalhes}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        {/* Emissores */}
        <BottomTab.Screen
            name="ListarEmissores"
            component={ListarEmissores}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        {/* Compras */}
        <BottomTab.Screen
            name="PesquisaCompras"
            component={PesquisaCompras}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        <BottomTab.Screen
            name="PesquisaDetalhesCompras"
            component={PesquisaDetalhesCompras}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        <BottomTab.Screen
            name="NovaCompra"
            component={NovaCompra}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        <BottomTab.Screen
            name="Compras"
            component={Compras}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        <BottomTab.Screen
            name="Produto"
            component={Produto}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        <BottomTab.Screen
            name="ListarCompras"
            component={ListarCompras}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        {/* Leitor */}
        <BottomTab.Screen
            name="Leitor"
            component={Leitor}
            options={{
                tabBarIcon: (props) => <Icon name="qr-scanner" style={{ color: props.color }} />
            }}
        />
        <BottomTab.Screen
            name="ConfirmarLeitor"
            component={ConfirmarLeitor}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
        {/* Usuario */}
        <BottomTab.Screen
            name="Usuario"
            component={Usuario}
            options={{
                tabBarIcon: (props) => <Icon name="person" style={{ color: props.color }} />
            }}
        />
        <BottomTab.Screen
            name="AlterarUsuario"
            component={AlterarUsuario}
            options={{
                tabBarButton: () => null,
                tabBarVisible: false,
            }}
        />
    </BottomTab.Navigator>
)

const navigation = React.createRef();

class Navigation extends Component {
    constructor(props) {
        super(props);
    }
    _toast = () => {
        const { text, buttonText, buttonTextStyle, buttonStyle, position, type, duration, style, textStyle, onClose } = this.props.toast.config
        Toast.show({
            text: text,
            buttonText: buttonText,
            buttonTextStyle: buttonTextStyle,
            buttonStyle: buttonStyle,
            position: position,
            type: type,
            duration: duration,
            style: style,
            textStyle: textStyle,
            onClose: onClose ?? (() => this.props.resetToast()),
            // onClose: onClose,
        });
    }
    render() {
        var whatToShow = loginNavigation;

        // console.log("Navigation", this.props.statusBar)

        if (this.props.authenticated)
            whatToShow = homeNavigator

        return (
            <SafeAreaProvider>
                {/* <StatusBar backgroundColor={this.props.statusBar?.backgroundColor} barStyle={this.props.statusBar?.barStyle}/> */}
                <Loading show={this.props.loading} />
                <ModalAlert
                    show={this.props.modal.show}
                    message={this.props.modal.message}
                    type={this.props.modal.type}
                />
                {this.props.toast.show ? this._toast() : null}
                <NavigationContainer
                    ref={navigation}
                >
                    {whatToShow}
                </NavigationContainer>
            </SafeAreaProvider>
        )
    }
}

const mapStateToProps = state => {
    return {
        // state: state,
        // global: state.globalReducer,
        statusBar: state.globalReducer.statusBar,
        loading: state.globalReducer.loading,
        modal: state.globalReducer.modal,
        toast: state.globalReducer.toast,
        authenticated: state.loginReducer.repos?.objeto?.authenticated
    };
};

const mapDispatchToProps = {
    resetToast
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);