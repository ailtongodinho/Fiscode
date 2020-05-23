import React, { Component } from "react";
import { View } from "react-native";
import { Row, Grid, Col, Content, Form, Item, Input, Label, Button, Text, Picker, Icon, Footer, Title } from "native-base";
import { styles } from "../../styles/layouts/layouts.styles";
import Background from "../../components/backgroud";
import { Formulario } from "../../components/formulario";

//  Redux
import { connect } from "react-redux";
import { RegistrarRepos, RegistrarReset } from "../../redux/reducers/registrarReducer";

import Logo from "../../components/logo";
import { maskCpfCnpj } from "../../components/mask";

class Registrar extends Component {
    cpfRef = React.createRef()
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                nome: {
                    value: "Victor",
                    error: false
                },
                sobrenome: {
                    value: "de Moraes Vivi",
                    error: false
                },
                registroNacional: {
                    value: "40024608866",
                    masked: "40024608866",
                    error: false
                },
                email: {
                    value: "vivi.victor.m@gmail.com",
                    error: false
                },
                sexo: {
                    value: "M",
                    error: false
                },
            }
        }
    }
    validate() {
        var newPayload = this.state.payload;
        newPayload.nome.error = false;
        newPayload.sobrenome.error = false;
        newPayload.registroNacional.error = false;
        newPayload.email.error = false;

        //  Nome
        newPayload.nome.error = newPayload.nome.value.length == 0;
        //  Sobrenome
        newPayload.sobrenome.error = newPayload.sobrenome.value.length == 0;
        //  Registro Nacional
        newPayload.registroNacional.error = newPayload.registroNacional.value.length == 0;
        // if(!this.cpfRef.isValid())
        //  Email
        newPayload.email.error = newPayload.email.value.length == 0;
        //  Sexo
        newPayload.sexo.error = newPayload.sexo.value.length == 0;

        this.setState({
            payload: newPayload
        });

        return (
            !newPayload.nome.error &&
            !newPayload.sobrenome.error &&
            !newPayload.registroNacional.error &&
            !newPayload.email.error
        );
    }
    enviar = () => {
        if (this.validate()) {
            this.props.RegistrarRepos({
                nome: this.state.payload.nome.value,
                sobrenome: this.state.payload.sobrenome.value,
                registroNacional: this.state.payload.registroNacional.value,
                email: this.state.payload.email.value,
                sexo: this.state.payload.sexo.value,
            }).then(() => {
                if (this.props.registrar.sucesso) {
                    this.props.RegistrarReset();
                    this.props.navigation.pop();
                    this.props.navigation.navigate('ConfirmarSenha', this.state.payload)
                }
            });
        }
    }
    render() {
        // <Background>
        // <Content
        //     padder
        //     contentContainerStyle={{ marginTop: "20%" }}
        // >
        // </Content>
        //         <Footer>
        //             <Button style={[styles.full, styles.center]}
        //                 onPress={this.enviar}
        //             >
        //                 <Text>Registrar</Text>
        //             </Button>
        //         </Footer>
            // </Background>
        return (
            <Formulario
                logoComTexto={false}
                corpoBotao={<Text>Cadastrar!</Text>}
                // botaoFooter={false}
                titulo={<Title>Cadastro</Title>}
                onConfirm={() => this.enviar()}
            >
                <Item
                    success={!this.state.payload.nome.error}
                    // inlineLabel
                    floatingLabel
                    style={styles.textBoxPadding}
                >
                    <Label style={styles.textBoxStyle}>Nome *</Label>
                    <Input
                        style={styles.textBoxStyle}
                        textContentType='name'
                        value={this.state.payload.nome.value}
                        onKeyPress={() => this.validate()}
                        onChangeText={(text) => this.setState({
                            payload: { ...this.state.payload, nome: { ...this.state.payload.nome, value: text } }
                        })}
                    ></Input>
                </Item>
                <Item
                    success={!this.state.payload.sobrenome.error}
                    floatingLabel
                    // inlineLabel 
                    style={styles.textBoxPadding}
                >
                    <Label style={styles.textBoxStyle}>Sobrenome *</Label>
                    <Input
                        style={styles.textBoxStyle}
                        textContentType='middleName'
                        value={this.state.payload.sobrenome.value}
                        onKeyPress={() => this.validate()}
                        onChangeText={(text) => this.setState({
                            payload: { ...this.state.payload, sobrenome: { ...this.state.payload.sobrenome, value: text } }
                        })}
                    ></Input>
                </Item>
                <Item
                    success={!this.state.payload.registroNacional.error}
                    // inlineLabel
                    floatingLabel
                    style={styles.textBoxPadding}
                >
                    <Label style={styles.textBoxStyle}>CPF/CNPJ *</Label>
                    <Input
                        style={styles.textBoxStyle}
                        value={this.state.payload.registroNacional.masked}
                        keyboardType={"numeric"}
                        onChangeText={(text) => {
                            var mask = maskCpfCnpj(text);
                            this.setState({
                                payload: { ...this.state.payload, registroNacional: { ...this.state.payload.registroNacional, value: mask.raw, masked: mask.masked, error: !mask.isValid } }
                            })
                        }
                        }
                    />
                </Item>
                <Item
                    success={!this.state.payload.email.error}
                    // inlineLabel 
                    floatingLabel
                    style={styles.textBoxPadding}
                >
                    <Label style={styles.textBoxStyle}>Email *</Label>
                    <Input style={styles.textBoxStyle}
                        textContentType='emailAddress'
                        keyboardType="email-address"
                        value={this.state.payload.email.value}
                        onKeyPress={() => this.validate()}
                        onChangeText={(text) => this.setState({
                            payload: { ...this.state.payload, email: { ...this.state.payload.email, value: text } }
                        })}
                    ></Input>
                </Item>
                <Item
                    success={!this.state.payload.email.error}
                    fixedLabel
                    style={[styles.textBoxPadding]}
                >
                    <Label style={styles.textBoxStyle}>Sexo</Label>
                    <Picker
                        mode={"dropdown"}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Select your SIM"
                        style={[styles.maskedTextBox, styles.textBoxStyle]}
                        selectedValue={this.state.payload.sexo.value}
                        onValueChange={(value) => this.setState({ payload: { ...this.state.payload, sexo: { ...this.state.payload.sexo, value: value } } })}
                    >
                        <Picker.Item label="Masculino" value="M" />
                        <Picker.Item label="Feminino" value="F" />
                        <Picker.Item label="Outro" value="O" />
                    </Picker>
                </Item>
            </Formulario>
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