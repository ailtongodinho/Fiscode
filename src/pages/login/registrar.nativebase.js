import React, { Component } from "react";
import { View } from "react-native";
import { Row, Grid, Col, Content, Form, Item, Input, Label, Button, Text, Picker, Icon, Footer, Title } from "native-base";
import { styles } from "../../styles/layouts/layouts.styles";
import Background from "../../components/backgroud";
import { Formulario } from "../../components/formulario";

//  Redux
import { connect } from "react-redux";
import { RegistrarRepos, RegistrarReset } from "../../redux/reducers/registrarReducer";

import { FormularioUsuario } from "../../components/usuario/formulario.usuario";

class Registrar extends Component {
    constructor(props) {
        super(props);
    }

    enviar = (payload) => {

        this.props.RegistrarRepos({
            nome: payload.nome,
            sobrenome: payload.sobrenome,
            registroNacional: payload.registroNacional,
            email: payload.email,
            sexo: payload.sexo,
        }).then(() => {
            if (this.props.registrar.sucesso) {
                this.props.RegistrarReset();
                this.props.navigation.pop();
                this.props.navigation.navigate('ConfirmarSenha', payload)
            }
        });
    }
    render() {
        return (
            <FormularioUsuario
                logoComTexto={false}
                corpoBotao={<Text>Cadastrar!</Text>}
                titulo={<Title>Cadastro</Title>}
                payload={null}
                onConfirm={(payload) => this.enviar(payload)}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        senhaConfirmada: state.ConfirmarSenhaReducer.repos.sucesso,
        registrar: state.RegistrarReducer.repos,
        validar: state.validarReducer.repos,
    };
};

const mapDispatchToProps = {
    RegistrarRepos,
    RegistrarReset
};

export default connect(mapStateToProps, mapDispatchToProps)(Registrar);