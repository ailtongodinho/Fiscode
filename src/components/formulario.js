import React, { Component } from "react";
import { View, Form, Content, Footer, Button, Text, Header, Left, Icon, Body } from "native-base";
import { styles } from "../styles/layouts/layouts.styles";
import Logo from "./logo";
import Background from "./backgroud";

const estado = (props) => {
    return {
        backgroundColor: props.hasOwnProperty('backgroundColor') ? props.backgroundColor : null,
        tituloHeader: props.hasOwnProperty('tituloHeader') ? props.tituloHeader : null,
        headerLeftIcon: props.hasOwnProperty('headerLeftIcon') ? props.headerLeftIcon : <Icon name="arrow-back" />,
        mostrarLogo: props.hasOwnProperty('mostrarLogo') ? props.mostrarLogo : true,
        logoComTexto: props.hasOwnProperty('logoComTexto') ? props.logoComTexto : true,
        titulo: props.hasOwnProperty('titulo') ? props.titulo : null,
        botaoFooter: props.hasOwnProperty('botaoFooter') ? props.botaoFooter : true,
        corpoBotao: props.hasOwnProperty('corpoBotao') ? props.corpoBotao : <Text>Confirmar</Text>,
        centralizar: props.hasOwnProperty('centralizar') ? props.centralizar : true,
        onConfirm: props.hasOwnProperty('onConfirm') ? props.onConfirm : () => console.log("Formulario Confirmado"),
        onCancel: props.hasOwnProperty('onCancel') ? props.onCancel : () => console.log("Formulario Cancelado"),
    }
}

export class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = estado(this.props)
    }
    _confirmar = () => {
        this.state.onConfirm();
    }
    _sair = () => {
        this.state.onCancel();
    }
    render() {
        // console.log("Formulario", this.state);

        return (
            <Background
                backgroundColor={this.state.backgroundColor}
            >
                {this.state.tituloHeader !== null ?
                    <Header
                        noShadow
                        // transparent
                        style={[styles.center, styles.headerContainer]}
                    >
                        <Left>
                            <Button icon transparent
                                onPress={this._sair}
                            >
                                {this.state.headerLeftIcon}
                                {/* <Icon style={{ color: this.state.headerLeftIconColor }} name="arrow-back" /> */}
                            </Button>
                        </Left>
                        <Body>
                            {this.state.tituloHeader}
                        </Body>
                    </Header>
                    : null}
                <Content
                    padder
                    contentContainerStyle={{ marginTop: this.state.tituloHeader !== null ? 0 : "20%" }}
                >
                    {this.state.mostrarLogo ?
                        <View style={[styles.center]}>
                            <Logo
                                width={100}
                                height={100}
                                hasText={this.state.logoComTexto}
                            />
                        </View>
                        : null}
                    <View style={[styles.center, { marginTop: "10%" }]}>
                        {this.state.titulo}
                    </View>
                    <Form
                        style={[
                            this.state.centralizar ? styles.center : {},
                            { padding: 30 }
                        ]}
                    >
                        {this.props.children}
                    </Form>
                    {!this.state.botaoFooter ?
                        <View
                            style={[styles.center, { paddingHorizontal: 40 }]}
                        >
                            <Button style={[styles.button]} block rounded
                                onPress={this._confirmar}
                            >
                                {this.state.corpoBotao}
                            </Button>
                        </View>
                        : null}
                </Content>
                {this.state.botaoFooter ?
                    <Footer>
                        <Button style={[styles.full, styles.center]}
                            onPress={this._confirmar}
                        >
                            {this.state.corpoBotao}
                        </Button>
                    </Footer>
                    : null}
            </Background>
        )
    }
}