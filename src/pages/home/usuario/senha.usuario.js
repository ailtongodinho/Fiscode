import React, { Component } from "react";
import { Item, Input, Label, Title, Text, Icon, H1, H3, ListItem, Left, Right, Body, Col } from "native-base";
import { Row, Grid } from 'react-native-easy-grid';
import { styles } from "../../../styles/layouts/layouts.styles";

//  Redux
import { connect } from "react-redux";
import { AlterarSenhaRepos, AlterarSenhaReset } from "../../../redux/reducers/usuario/alterarSenhaReducer";
import { LoginRepos } from "../../../redux/reducers/loginReducer";

//  Components
import { Formulario } from "../../../components/formulario";

class AlterarSenha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                senhaAntiga: '',
                senhaNova: '',
                sucesso: false
            },
            payload: [
                {
                    id: 0,
                    mostrar: true,
                    value: "",
                    error: true
                },
                {
                    id: 1,
                    mostrar: true,
                    value: "",
                    error: true
                }
            ]
        }
    }
    componentDidMount() {
        this.onUpdateItem(this.state.payload[1].id, this.validate)
    }
    _sair = () => {
        this.onUpdateItem(this.state.payload[0].id, this.changeValue, { value: "" });
        this.onUpdateItem(this.state.payload[1].id, this.changeValue, { value: "" });
        this.props.navigation.goBack();
    }
    validate = (item) => {
        item.error = true;
        if (this.state.payload[0].value === item.value) {
            item.error = false;
        }
        return item;
    }
    showPass = (item) => {
        item.mostrar = !item.mostrar;
        return item;
    }
    changeValue = (item, obj) => {
        item.value = obj.value;
        return item;
    }
    onUpdateItem = (id, func, obj) => {
        this.setState(state => {
            const list = state.payload.map((item, j) => {
                if (item.id == id) {
                    return func(item, obj);
                } else {
                    return item;
                }
            });
            return {
                list,
            };
        });
    }
    enviar = () => {

        if (!this.state.payload[1].error) {
            var newPayload = {
                senhaNova: this.state.payload[0].value
            }
            console.log("Enviar", newPayload);
            this.props.AlterarSenhaRepos(newPayload)
                .then(() => {
                    if (this.props.sucesso) {
                        this.props.LoginRepos({ login: this.props.usuario.email, senha: newPayload.senhaNova })
                            .then(() => {
                                this.props.AlterarSenhaReset();
                                this._sair();
                            })
                    }
                })
        }
    }
    render() {

        // console.log("AQUI", this.props.usuario);

        //  Volta
        if (this.props.senhaConfirmada) {
            this.props.ConfirmarSenhaReset();
            this.props.navigation.pop();
        }
        return (
            <Formulario
                logoComTexto={false}
                corpoBotao={<Text>Confirmar</Text>}
                // botaoFooter={false}
                titulo={<H3 style={styles.font1}>Digite sua nova senha</H3>}
                onConfirm={() => this.enviar()}
            >
                <Item floatingLabel style={styles.textBoxPadding}>
                    <Label style={styles.textBoxStyle}>Nova Senha</Label>
                    <Input
                        style={styles.textBoxStyle}
                        textContentType='password'
                        secureTextEntry={this.state.payload[0].mostrar}
                        onChangeText={(text) => {
                            this.onUpdateItem(this.state.payload[0].id, this.changeValue, { value: text })
                            this.onUpdateItem(this.state.payload[1].id, this.validate)
                        }}
                        value={this.state.payload[0].value}
                    ></Input>
                    <Icon
                        onPress={() => this.onUpdateItem(this.state.payload[0].id, this.showPass)}
                        name={(this.state.payload[0].mostrar ? "eye" : "eye-off")}
                        style={{ color: 'white' }}
                    />
                </Item>
                <Item error={this.state.payload[1].error} floatingLabel style={styles.textBoxPadding}>
                    <Label style={styles.textBoxStyle}>Confirmar Senha</Label>
                    <Input
                        style={styles.textBoxStyle}
                        textContentType='password'
                        secureTextEntry={this.state.payload[1].mostrar}
                        onChangeText={(text) => {
                            this.onUpdateItem(this.state.payload[1].id, this.changeValue, { value: text })
                            this.onUpdateItem(this.state.payload[1].id, this.validate)
                        }}
                        value={this.state.payload[1].value}
                    ></Input>
                    <Icon
                        onPress={() => this.showPass(this.state.payload[1].id)}
                        name={(this.state.payload[1].error ? "ios-close" : "ios-checkmark")}
                        style={{ color: this.state.payload[1].error ? "red" : "green", padding: 2 }}
                    />
                    <Icon
                        onPress={() => this.onUpdateItem(this.state.payload[1].id, this.showPass)}
                        name={(this.state.payload[1].mostrar ? "eye" : "eye-off")}
                        style={{ color: 'white' }}
                    />
                </Item>
            </Formulario>
        )
    }
}

const mapStateToProps = state => {
    return {
        sucesso: state.alterarSenhaReducer.repos.sucesso,
        usuario: state.usuarioReducer.repos.objeto,
    };
};

const mapDispatchToProps = {
    AlterarSenhaRepos,
    AlterarSenhaReset,
    LoginRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(AlterarSenha);