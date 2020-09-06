import React, { Component } from "react";
import { Image } from "react-native";
import Background from "../../../components/backgroud";
import { Content, Text, View, Item, Input, Title, Icon, Label } from "native-base";
import { styles } from "../../../styles/layouts/layouts.styles";

//  Redux
import { connect } from "react-redux";
import { setConteudoImagem, extrairNotaRepos, extrairNotaReset } from "../../../redux/reducers/leitorReducer";
import { Formulario } from "../../../components/formulario";

class ConfirmarLeitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conteudoImagem: ""
        }
    }
    enviar = () => {
        this.props.setConteudoImagem(this.state.conteudoImagem);
        this.props.extrairNotaRepos(null)
            .then(() => {
                this.sair();
            })

    }
    getImagem = () => {
        return (
            <Image
                key={this.props.hostKey}
                style={{
                    width: 200,
                    height: 200
                }}
                resizeMode='contain'
                source={{ uri: this.props.imagem }}
            />
        )
    }
    sair = () => {
        this.props.navigation.goBack();
        this.props.extrairNotaReset();
    }
    render() {

        console.log("***HOST KEY***", this.props.hostKey);

        const backgroundColor = "white"
        return (
            <Formulario
                key={this.props.hostKey}
                mostrarLogo={false}
                backgroundColor={backgroundColor}
                headerLeftIcon={<Icon name="close" style={{ color: "black" }} />}
                tituloHeader={<Title style={{ color: "black" }}></Title>}
                // titulo={<Title style={{ color: "black" }}>Insira os caracteres da imagem acima</Title>}
                botaoFooter={false}
                imagem={this.getImagem()}
                onConfirm={() => this.enviar()}
                onCancel={() => this.sair()}
            >
                <Item floatingLabel style={styles.textBoxPadding}>
                    <Label>Insira os caracteres da imagem</Label>
                    {/* <Label>{this.state.hostKey}</Label> */}
                    <Input
                        autoFocus
                        value={this.state.conteudoImagem}
                        onChangeText={(text) => this.setState({ conteudoImagem: text })}
                    />
                </Item>
            </Formulario>
        )
    }
}

const mapStateToProps = state => {
    return {
        imagem: state.leitorReducer.repos.imagem,
        hostKey: state.leitorReducer.repos.hostKey,
    };
};

const mapDispatchToProps = {
    setConteudoImagem,
    extrairNotaRepos,
    extrairNotaReset
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmarLeitor);