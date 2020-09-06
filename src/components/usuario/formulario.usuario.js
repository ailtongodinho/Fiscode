import React, { useState, useEffect, Component } from "react";
import { Item, Input, Label, Text, Picker, Icon, Title } from "native-base";
import { styles } from "../../styles/layouts/layouts.styles";
import { Formulario } from "../formulario";
import { maskCpfCnpj } from "../mask";
import { appsettings } from "../../appsettings";

const loadPayload = (payload) => {
    var padrao = {
        id: 0,
        nome: {
            value: "",
            error: false
        },
        sobrenome: {
            value: "",
            error: false
        },
        registroNacional: {
            value: "",
            masked: "",
            error: false
        },
        email: {
            value: "",
            error: false
        },
        sexo: {
            value: "M",
            error: false
        },
    }

    if (payload != null) {
        padrao.nome.value = payload.hasOwnProperty("nome") ? String(payload.nome).toString() : "";
        padrao.sobrenome.value = payload.hasOwnProperty("sobrenome") ? String(payload.sobrenome).toString() : "";
        padrao.registroNacional.value = payload.hasOwnProperty("registroNacional") ? String(payload.registroNacional).toString() : "";
        padrao.registroNacional.masked = payload.hasOwnProperty("registroNacional") ? maskCpfCnpj(payload.registroNacional).masked : "";        
        padrao.email.value = payload.hasOwnProperty("email") ? String(payload.email).toString() : "";
        padrao.sexo.value = payload.hasOwnProperty("sexo") ? String(payload.sexo).toString() : "";
        padrao.id = payload.hasOwnProperty("id") ? payload.id : 0;
    }

    return padrao;
}

const loadProps = (props) => {
    console.log("loadProps");


    return {
        payload: loadPayload(props?.payload),
        onConfirm: props.hasOwnProperty("onConfirm") ? props.onConfirm : () => console.log("Confirmado!"),
        onCancel: props.hasOwnProperty("onCancel") ? props.onCancel : () => console.log("Cancelado!"),
        mostrarLogo: props.hasOwnProperty("mostrarLogo") ? props.mostrarLogo : true,
        logoComTexto: props.hasOwnProperty("logoComTexto") ? props.logoComTexto : false,
        corpoBotao: props.hasOwnProperty("corpoBotao") ? props.corpoBotao : <Text>Cadastrar!</Text>,
        titulo: props.hasOwnProperty("titulo") ? props.titulo : <Title>Cadastro</Title>,
    }
}

export class FormularioUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = loadProps(props)
    }
    // const [state, setState] = useState(loadProps(props));

    // useEffect(() => {
    //     if (props.payload != null && props.payload?.id !== this.state.payload.id) {
    //         setState(loadProps(props));
    //     }
    // }, [props.payload])

    close = (error) => {
        if (error) this.state.onCancel();
    }

    validar = () => {
        var newPayload = this.state.payload;
        newPayload.nome.error = false;
        newPayload.sobrenome.error = false;
        newPayload.registroNacional.error = false;
        newPayload.email.error = false;

        console.log(newPayload);

        //  Nome
        newPayload.nome.error = newPayload.nome.value.length == 0;
        //  Sobrenome
        newPayload.sobrenome.error = newPayload.sobrenome.value.length == 0;
        //  Registro Nacional
        // newPayload.registroNacional.error = newPayload.registroNacional.value.length == 0;
        newPayload.registroNacional.error = false;
        // if(!cpfRef.isValid())
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
        if (this.validar()) {
            this.state.onConfirm({
                id: this.state.payload.id,
                nome: this.state.payload.nome.value,
                sobrenome: this.state.payload.sobrenome.value,
                registroNacional: this.state.payload.registroNacional.value,
                email: this.state.payload.email.value,
                sexo: this.state.payload.sexo.value,
            })
            this.close(false);
        }
    }

    render() {
        return (
            <Formulario
                mostrarLogo={this.state.mostrarLogo}
                logoComTexto={this.state.logoComTexto}
                corpoBotao={this.state.corpoBotao}
                // botaoFooter={false}
                titulo={this.state.titulo}
                onConfirm={() => this.enviar()}
            >
                <Item
                    success={!this.state.payload.nome.error}
                    // inlineLabel
                    floatingLabel
                    style={styles.textBoxPadding}
                    key={"ITEM_NOME"}
                >
                    <Label key={"ITEM_NOME_LABEL"} style={styles.textBoxStyle}>Nome *</Label>
                    <Input
                        key={"ITEM_NOME_INPUT"}
                        style={styles.textBoxStyle}
                        textContentType='name'
                        value={this.state.payload.nome.value}
                        onKeyPress={() => this.validar()}
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
                    key={"ITEM_SOBRENOME"}
                >
                    <Label key={"ITEM_SOBRENOME_LABEL"} style={styles.textBoxStyle}>Sobrenome *</Label>
                    <Input
                        key={"ITEM_SOBRENOME_INPUT"}
                        style={styles.textBoxStyle}
                        textContentType='middleName'
                        value={this.state.payload.sobrenome.value}
                        onKeyPress={() => this.validar()}
                        onChangeText={(text) => this.setState({
                            
                            payload: { ...this.state.payload, sobrenome: { ...this.state.payload.sobrenome, value: text } }
                        })}
                    />
                </Item>
                {/* <Item
                    success={!this.state.payload.registroNacional.error}
                    // inlineLabel
                    floatingLabel
                    style={styles.textBoxPadding}
                    key={"ITEM_REGISTRO"}
                >
                    <Label key={"ITEM_REGISTRO_LABEL"} style={styles.textBoxStyle}>CPF/CNPJ *</Label>
                    <Input
                        // disabled
                        key={"ITEM_REGISTRO_LABEL"}
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
                </Item> */}
                <Item
                    success={!this.state.payload.email.error}
                    // inlineLabel 
                    floatingLabel
                    style={styles.textBoxPadding}
                    key={"ITEM_EMAIL"}
                >
                    <Label key={"ITEM_EMAIL_LABEL"} style={styles.textBoxStyle}>Email *</Label>
                    <Input
                        // disabled
                        key={"ITEM_EMAIL_INPUT"}
                        style={styles.textBoxStyle}
                        // textContentType='emailAddress'
                        // keyboardType="email-address"
                        value={this.state.payload.email.value}
                        onKeyPress={() => this.validar()}
                        onChangeText={(text) => this.setState({
                            payload: { ...this.state.payload, email: { ...this.state.payload.email, value: text } }
                        })}
                    />
                </Item>
                <Item
                    success={!this.state.payload.email.error}
                    fixedLabel
                    style={[styles.textBoxPadding]}
                    key={"ITEM_SEXO"}
                >
                    <Label key={"ITEM_SEXO_LABEL"} style={styles.textBoxStyle}>Sexo</Label>
                    <Picker
                        key={"ITEM_SEXO_PICKER"}
                        mode={"dropdown"}
                        iosIcon={<Icon name="arrow-down" />}
                        placeholder="Select your SIM"
                        style={[styles.maskedTextBox, styles.textBoxStyle]}
                        selectedValue={this.state.payload.sexo.value}
                        onValueChange={(value) => this.setState({  payload: { ...this.state.payload, sexo: { ...this.state.payload.sexo, value: value } } })}
                    >
                        {appsettings.usuario.tiposSexo.map((x) => {
                            return <Picker.Item key={"ITEM_SEXO_PICKER" + x.value} label={x.label} value={x.value} />
                        })}
                    </Picker>
                </Item>
            </Formulario>
        )
    }
}