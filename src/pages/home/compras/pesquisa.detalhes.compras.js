import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, Picker, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet, Item, Form, Label, H2, H3, Separator } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import Background from "../../../components/backgroud";
import { money } from "../../../components/mask";
import { DateTime } from "../../../helpers/datetime";
import { listaVazia } from "../../../components/listaVazia";
import { pesquisarProdutoPayload } from "../../../models/payloads/produtoPayload";
import { produtoCompraPayload } from "../../../models/payloads/produtoCompraPayload";
import { criarProdutoPesquisa } from "../../../components/produtoLayouts";
import { appsettings } from "../../../appsettings";
//  Redux
import { connect } from "react-redux";
import { produtoComprasRepos, produtoComprasReset } from "../../../redux/reducers/compras/produto.comprasReducer";
import { comprasRepos, adicionarCompra, comprasReset } from "../../../redux/reducers/compras/comprasReducer";
import { ModalView } from "../../../components/modal";
import { SelecionarUnidade } from "./selecionarUnidade.compras";

class PesquisaDetalhesCompras extends Component {
    constructor(props) {
        super(props);
        this.state = this.novoEstado()
    }
    novoEstado = () => {
        return {
            payload: new pesquisarProdutoPayload(),
            produto: new produtoCompraPayload(1, this.props.produtoSelecionado.unidade),
            tipoUnidade: null,
            produtoPronto: false,
            unidadeSelecionada: false,
            quantidadeSelecionada: false,
            placeholder: "",
            produtoSelecionado: this.props.produtoSelecionado,
            selecionarUnidade: false
        }
    }
    componentDidUpdate() {
        if (
            this.state.produtoSelecionado.id !== this.props.produtoSelecionado.id &&
            this.state.produtoSelecionado.nome !== this.props.produtoSelecionado.nome &&
            this.state.produtoSelecionado.apelido !== this.props.produtoSelecionado.apelido
        ) {

            this.setState({ produtoSelecionado: this.props.produtoSelecionado })
            // this._reset()
            this.escolherUnidade();
        }
    }
    _reset = () => {
        this.setState(this.novoEstado())
        this.escolherUnidade()
    }
    _exit = () => {
        this.props.navigation.goBack()
    }
    escolherUnidade = () => {
        const unidade = appsettings.produto.unidades.filter(x => x.value == this.props.produtoSelecionado.unidade)[0];
        this.setState({ tipoUnidade: unidade, produto: { ...this.state.produto, quantidade: unidade.inputValue, unidade: unidade.value } })
    }
    escolherQuantidade = (texto) => {
        this.setState({ produto: { ...this.state.produto, quantidade: texto } })
    }
    adicionarCompra = () => {
        var payload = new produtoCompraPayload();
        payload.idProduto = null;
        payload.unidade = this.state.produtoSelecionado.unidade
        payload.quantidade = Number(this.state.produto.quantidade.toString().replace(",", "."));
        payload.apelido = this.state.produtoSelecionado.nome ?? this.state.produtoSelecionado.apelido

        // console.log("_adicionarProduto", payload);

        this.props.adicionarCompra(payload)
            .then(() => {
                if (this.props.compraSucesso) {
                    this._reset();
                    this.props.comprasReset()
                    this._exit();
                }
            })
    }
    render() {

        // console.log("pesquisaDetalhes", this.props.produtoSelecionado);

        return (
            <Background
                backgroundColor={"#FFF"}
            >
                <Header
                    noShadow
                    style={[styles.center, styles.headerContainer]}
                >
                    <Left>
                        <Button
                            icon
                            onPress={this._exit}
                            transparent
                        >
                            <Icon name="arrow-back" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body></Body>
                </Header>
                <Content
                // padder
                >
                    <Card noShadow transparent>
                        <List>
                            {criarProdutoPesquisa(this.state.produtoSelecionado, true, null)}
                        </List>
                        {/* <CardItem bordered>
                            <Body>
                                <Text>Escolha a unidade</Text>
                            </Body>
                            <Right>
                                <Button success={this.state.unidadeSelecionada} light={!this.state.unidadeSelecionada} transparent vertical >
                                    <Icon name={this.state.unidadeSelecionada ? "checkmark-circle-outline" : "radio-button-off"} />
                                </Button>
                            </Right>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>Escolha a quantidade</Text>
                            </Body>
                            <Right>
                                <Button success={this.state.quantidadeSelecionada} light={!this.state.quantidadeSelecionada} transparent vertical >
                                    <Icon name={this.state.quantidadeSelecionada ? "checkmark-circle-outline" : "radio-button-off"} />
                                </Button>
                            </Right>
                        </CardItem> */}
                    </Card>
                </Content>
                <Content
                    padder
                    contentContainerStyle={[styles.center]}
                >
                    <Text>Digite a quantidade</Text>
                    {/* {listaVazia("Digite a quantidade", null, <Icon name="information" />)} */}
                    {/* <Card noShadow transparent>
                        <CardItem>
                            <Left>
                                <Body style={[styles.center]}>
                                    <Text>Selecione a unidade abaixo</Text>
                                </Body>
                                <Icon name={this.state.unidadeSelecionada ? "checkmark-circle-outline" : "radio-button-off"} style={{ fontSize: 20 }} />
                            </Left>
                        </CardItem>
                        <CardItem cardBody bordered>
                            <View style={[styles.center, { flex: 1, flexDirection: "row", justifyContent: 'center', padding: 10 }]}>
                                {appsettings.produto.unidades.map((x, i) => {
                                    var style = [{ flex: 1 }, styles.center]
                                    // if (i == 0) style.push(styles.startRadius)
                                    // if (i == appsettings.produto.unidades.length) style.push(styles.endRadius)
                                    return (
                                        <Button
                                            first={i == 0}
                                            last={i == appsettings.produto.unidades.length}
                                            // small
                                            // large
                                            style={style}
                                            // vertical
                                            primary={x.value == this.state.produtoSelecionado.unidade}
                                            transparent={x.value !== this.state.produtoSelecionado.unidade}
                                            onPress={() => this.setState({ produtoSelecionado: { ...this.state.produtoSelecionado, unidade: x.value } })}
                                        >
                                            <Text>{x.label}</Text>
                                        </Button>
                                    )
                                })}
                            </View>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Body style={[styles.center]}>
                                    <Text>Digite a quantidade</Text>
                                </Body>
                                <Icon name={this.state.unidadeSelecionada ? "checkmark-circle-outline" : "radio-button-off"} style={{ fontSize: 20 }} />
                            </Left>
                        </CardItem>
                        <CardItem>

                        </CardItem>
                    </Card> */}
                </Content>
                {/* {!this.state.produtoPronto && this.state.produtoSelecionado?.customizado ? */}
                {/* <Footer style={{ backgroundColor: "transparent" }}>
                    <Button style={[styles.full, styles.center]}>
                        <Text>Adicionar produto</Text>
                    </Button>
                </Footer> */}
                {/* : null
                } */}
                <Footer style={[
                    { backgroundColor: "transparent" },
                    { borderTopWidth: 0.5, borderTopColor: "lightgray", elevation: 0.3 },
                ]}
                >
                    <Input
                        placeholder={"Digite a quantidade"}
                        value={this.state.produto.quantidade.toString()}
                        keyboardType={"number-pad"}
                        onChangeText={this.escolherQuantidade}
                        autoFocus
                        style={{ textAlign: "center" }}
                        returnKeyType={"next"}
                    />
                    <SelecionarUnidade
                        bordered={true}
                        selectedValue={this.state.produtoSelecionado.unidade}
                        onSelected={(value) => this.setState({ produtoSelecionado: { ...this.state.produtoSelecionado, unidade: value }, selecionarUnidade: false })}
                    />
                    <Button
                        success
                        // transparent
                        style={[styles.center, { height: "100%" }]}
                        disabled={this.state.produtoSelecionado == null}
                        onPress={this.adicionarCompra}
                    >
                        <Text>Ok</Text>
                    </Button>
                </Footer>
                <ModalView
                    key="SELECIONAR_UNIDADE"
                    title={"Unidades"}
                    show={this.state.selecionarUnidade}
                    showConfirm={false}
                    center
                    // centerContent
                    width={"80%"}
                    height={"40%"}
                >
                    <List>
                        {appsettings.produto.unidades.map((x, i) => {
                            return (
                                <ListItem onPress={() => this.setState({ produtoSelecionado: { ...this.state.produtoSelecionado, unidade: x.value }, selecionarUnidade: false })}>
                                    <Body>
                                        <Text>{x.label}</Text>
                                        <Text note>{x.descricao}</Text>
                                    </Body>
                                    {this.state.produtoSelecionado.unidade == x.value ?
                                        <Right>
                                            <Icon name="checkmark" />
                                        </Right>
                                        : null
                                    }
                                </ListItem>
                            )
                        })}
                    </List>
                </ModalView>
            </Background>
        );
    }
}

const produtoDetalhesStyle = StyleSheet.create({
    footerButtonText: {
        color: "white"
    },
    buttonText: {
        color: "black"
    },
    listMargin: {
        marginTop: 20
    },
    buttonPadding: {
        marginHorizontal: 5
    }
})

const mapStateToProps = state => {
    return {
        produtoSelecionado: state.produtoComprasReducer.repos.produtoSelecionado,
        compraSucesso: state.comprasReducer.repos.sucesso
    };
};

const mapDispatchToProps = {
    produtoComprasRepos,
    produtoComprasReset,
    adicionarCompra,
    comprasRepos,
    comprasReset
};

export default connect(mapStateToProps, mapDispatchToProps)(PesquisaDetalhesCompras);