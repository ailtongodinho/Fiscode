import React from "react";
import { Login } from "../pages/login/login.nativebase";
import { DateTime } from "../helpers/datetime";


import { connect } from "react-redux";
import { LoginRepos } from "../redux/reducers/loginReducer";

class LoginService extends React.Component {
    logar = (payload) => {
        //  Despacha para o Reducer
        this.props.LoginRepos(payload);
        //  Atribui a variável ao global
    }
    render() {

        console.log("AQUI ESTOU LOGANDO TUDO", this.props.login);
        return (
            <Login
                logar={(payload) => this.logar(payload)}
                navegarRegistrar={() => this.props.navigation.navigate('Cadastro')}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.loginReducer.repos,
        validar: state.validarReducer.repos,
    };
};

const mapDispatchToProps = {
    LoginRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginService);