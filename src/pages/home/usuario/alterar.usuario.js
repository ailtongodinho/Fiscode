import React, { Component } from "react";
import { FormularioUsuario } from "../../../components/usuario/formulario.usuario";
import { Title, Text } from "native-base";

//  Redux
import { connect } from "react-redux";
import { atualizarUsuarioRepos } from "../../../redux/reducers/usuario/usuarioReducer";

class AlterarUsuario extends Component {
    constructor(props) {
        super(props)
    }

    atualizar = (payload) => {
        this.props.atualizarUsuarioRepos(payload)
            .then(() => {
                if (this.props.sucesso) {
                    this._exit();
                }
            })
    }

    _exit = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <FormularioUsuario
                titulo={<Title>Alterar dados</Title>}
                corpoBotao={<Text>Confirmar</Text>}
                payload={this.props.usuario}
                onConfirm={(payload) => this.atualizar(payload)}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        sucesso: state.usuarioReducer.repos?.sucesso,
        usuario: state.usuarioReducer.repos.objeto
    };
};

const mapDispatchToProps = {
    atualizarUsuarioRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(AlterarUsuario);