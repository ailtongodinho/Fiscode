import React, { Component } from "react";
import { RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Button, Icon, Text, Item, List, ListItem, Body, Card, CardItem, Label, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import { money } from "../../../components/mask";
import Background from "../../../components/backgroud";
import { listaVazia } from "../../../components/listaVazia";
import { DateTime } from "../../../helpers/datetime";
import { ModalView } from "../../../components/modal";
import { produtoCompraPayload } from "../../../models/payloads/produtoCompraPayload";
import { SelecionarUnidade } from "./selecionarUnidade.compras";

//  Redux
import { connect } from "react-redux";
import { comprasReset, comprasRepos, adicionarCompra, removerCompra, atualizarCompra } from "../../../redux/reducers/compras/comprasReducer";
import { listarComprasRepos, listarComprasDeletar } from "../../../redux/reducers/compras/listar.comprasReducer";
import { GetThumbnailProduto } from "../../../components/imagemProduto";

class ItensCompras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarDetalhesProduto: false,
            itemSelecionado: null,
            refreshing: false
        }
    }
    _navegarPesquisa = () => {
        this.props.navigate("PesquisaCompras")
    }
    _navegarComparar = () => {
        this.props.navigate("CompararCompras")
    }
    formatarItem = (item) => {
        if (item == null) return;
        return {
            unidade: item.unidade ?? item.produto?.unidade,
            nome: (item.produto?.apelido ?? item.produto?.nome) ?? item.apelido,
            valor: item.produto != null ? money(item.produto?.saldo.valorUnitario ?? 0).masked : "--",
            quantidade: item.quantidade,
            apelido: item.apelido,
            id: item.id,
            idProduto: item.idProduto,
            ean: item.produto.ean
        }
    }
    header = () => {
        return (
            <Card
                key={"ADD_CARD"}
                style={{ marginBottom: 15 }}
            // noShadow
            // transparent
            >
                <TouchableOpacity onPress={this._navegarPesquisa}>
                    <CardItem
                        key={"ADD_CARD_BODY"}
                        cardBody
                        bordered
                    >
                        <View key={"ADD_CARD_BODY_UN"}
                            style={[styles.center, styles.startRadius
                                , { /*backgroundColor: "#3F51B5",*/ padding: 15 }
                                , { borderRightWidth: 0.5, borderColor: "#CCC" }
                            ]}
                        >
                            <Icon name="add" style={{ width: 20 }}/>
                        </View>
                        <Left>
                            <Text uppercase={true} style={[comprasStyle.fonte]}>Adicionar Produtos</Text>
                        </Left>
                    </CardItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._navegarComparar}>
                    <CardItem
                        key={"ADD_CARD_BODY"}
                        cardBody
                        bordered
                    >
                        <View key={"ADD_CARD_BODY_UN"}
                            style={[styles.center, styles.startRadius
                                , { /*backgroundColor: "#3F51B5",*/ padding: 15 }
                                , { borderRightWidth: 0.5, borderColor: "#CCC" }
                            ]}
                        >
                            <Icon name="repeat" style={{ width: 20 }}/>
                        </View>
                        <Left>
                            <Text uppercase={true} style={[comprasStyle.fonte]}>Comparar</Text>
                        </Left>
                    </CardItem>
                </TouchableOpacity>
            </Card>
        )
    }
    footer = () => {
        return (
            <Card
                key={"FOOTER_CARD"}
                style={[
                    { marginTop: 15 },
                    { borderTopWidth: 0.5, borderColor: "#CCC" },
                    { borderBottomWidth: 0.5 }
                ]}
                transparent
            >
                <List>
                    <ListItem noBorder>
                        <Left>
                            <Body>
                                <Text>Quantidade</Text>
                            </Body>
                            <Text>{this.props.compras?.quantidade}</Text>
                        </Left>
                    </ListItem>
                    <ListItem noBorder>
                        <Left>
                            <Body>
                                <Text>Total</Text>
                            </Body>
                            <Text>{money(this.props.compras?.total).masked}</Text>
                        </Left>
                    </ListItem>
                </List>
            </Card>
        )
    }
    criarItem = (item) => {
        const produto = this.formatarItem(item);
        // console.log("criarItem", produto);

        const key = item.id
        return (
            <Card
                key={key + "_CARD"}
                noShadow
                style={[{ width: "45%" }]}
            >
                <TouchableOpacity onPress={() => this.selecionarItem(item.id)}>
                    <CardItem
                        key={key + "_CARD_BODY_2"}
                        // cardBody
                        // bordered
                        style={[styles.center]}
                    >
                        <GetThumbnailProduto key={key + "_Thumbnail"} ean={produto.ean} large />
                    </CardItem>
                    <CardItem cardBody bordered>
                        <Button small>
                            <Text>{produto.valor}</Text>
                        </Button>
                    </CardItem>
                    <CardItem
                        key={key + "_CARD_BODY"}
                        // cardBody
                        bordered
                        style={[styles.center]}
                    >
                        <Left key={key + "_CARD_BODY_LEFT"}>
                            <Body key={key + "_CARD_BODY_LEFT_BODY"}
                            style={[styles.center]}
                            // style={[styles.leftCenter, { backgroundColor: "transparent" }]}
                            >
                                {/* <Left>
                                <Text note>{produto.valor}</Text>
                            </Left> */}
                                <Body>
                                    <ScrollView horizontal>
                                        <TextInput editable={false} style={[comprasStyle.fonte]} value={produto.nome} />
                                    </ScrollView>
                                </Body>
                                <Right style={[styles.center]}>
                                    <ScrollView horizontal>
                                        <Button vertical small dark transparent>
                                            <Text /*style={[comprasStyle.fonte, { padding: 2 }]}*/>{item.quantidade} | {produto.unidade}</Text>
                                            {/* <Text style={[{ borderTopWidth: 0.5, borderColor: "black" }]}>{produto.unidade}</Text> */}
                                        </Button>
                                        {/* <Button vertical small dark transparent style={[styles.center]}>
                                            <Text note>{produto.valor}</Text>
                                        </Button> */}
                                    </ScrollView>
                                </Right>
                                {/* <View style={[styles.center, styles.row, { backgroundColor: "transparent" }]}>
                                            <Text note>KG</Text>
                                        </View> */}
                                {/* <Text note>{item.produto.codigo}</Text> */}
                            </Body>
                        </Left>
                    </CardItem>
                    {/* <CardItem> */}
                    {/* <Left>
                        <Button vertical small dark transparent>
                        <Text style={[comprasStyle.fonte, { padding: 2 }]}>{item.quantidade}</Text>
                        <Text style={[{ borderTopWidth: 0.5, borderColor: "black" }]}>{produto.unidade}</Text>
                        </Button>
                    </Left> */}
                    {/* <View key={key + "_CARD_BODY_UN"}
                            style={[styles.center
                                // , styles.startRadius
                                // , { backgroundColor: "#3F51B5", padding: 15 }
                                , { borderRightWidth: 0.5, borderColor: "#CCC" }
                            ]}
                        > */}
                    {/* <Text style={[comprasStyle.fonte, { padding: 2 }]}>{money(item.quantidade).masked}</Text> */}
                    {/* </View> */}
                    {/* <Right key={key + "_CARD_BODY_RIGHT"}> */}
                    {/* <View key={key + "_CARD_BODY_RIGHT_VIEW"} 
                                style={[
                                    // { margin: 10 }, 
                                    styles.center, 
                                    // styles.row, { backgroundColor: "transparent" }
                                ]}> */}
                    {/* <Button small dark transparent onPress={() => this._adicionarProduto(item.id, -1)}>
                            </Button> */}
                    {/* <Button small vertical
                                style={[styles.startRadius, styles.endRadius]}
                                onPress={() => this._adicionarProduto(item.id, 1)}>
                                <Text>{produto.unidade}</Text>
                                <Icon style={{ fontSize: 12 }} name="add" />
                                <Icon style={{ fontSize: 12 }} name="remove" />
                            </Button> */}
                    {/* </View> */}
                    {/* </Right> */}
                    {/* </CardItem> */}
                    {/* <CardItem cardBody>
                    <Body>
                    <Button info small full onPress={() => this.selecionarItem(item.id)} style={[styles.center]}>
                    <Icon name="eye" />
                    </Button>
                    </Body>
                </CardItem> */}
                </TouchableOpacity>
            </Card>
        )
    }
    selecionarItem = (id) => {
        const item = this.props.compras.dados.filter(x => x.id == id)[0];
        this.setState({ itemSelecionado: item, mostrarDetalhesProduto: true })
    }
    _quantidadeSelecionado = (qtd, add = 0) => {
        var numero = (qtd != null ? qtd.toString().replace(",", ".") : this.state.itemSelecionado.quantidade)
        if (add !== 0) {
            numero = Number(numero) + add;
        }
        this.setState({ itemSelecionado: { ...this.state.itemSelecionado, quantidade: numero } })
    }
    _atualizarProduto = () => {
        var payload = new produtoCompraPayload(Number(this.state.itemSelecionado.quantidade), this.state.itemSelecionado.unidade);
        payload.id = this.state.itemSelecionado.id;
        this.props.atualizarCompra(payload);
    }
    _adicionarProduto = (id, qtd, un = "UN") => {
        var payload = new produtoCompraPayload();
        payload.idCompra = this.props.compraSelecionada.id;
        payload.id = id;
        payload.quantidade = qtd;
        payload.unidade = un;
        this.props.adicionarCompra(payload).then(() => {
            this.setState({ itemSelecionado: null })
        });
    }
    _removerProduto = (id) => {
        this.props.removerCompra(id);
    }
    comprasItens = () => {
        var obj = [];
        // console.log(this.props.compras);

        // obj.push(this.header())

        var lista = this.props.compras?.dados;

        if (lista !== null && lista !== undefined && lista.length > 0) {
            lista.forEach((item) => {
                obj.push(this.criarItem(item))
            })
        }

        // obj.push(this.footer())

        // else {
        //     obj.push(listaVazia(
        //         'Adicione alguns itens a lista!',
        //         <Button transparent rounded bordered onPress={() => this.props.comprasRepos()}><Icon name="refresh" /></Button>
        //     ))
        // }
        return obj;
    }
    refresh = () => {
        this.props.comprasRepos()
    }
    render() {

        const selecionado = this.formatarItem(this.state.itemSelecionado)

        return (
            <>
                <Content
                    padder
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
                >
                    {this.header()}
                    <View style={[{ flexDirection: "row", flexWrap: "wrap" }, styles.center]}>
                        {this.comprasItens()}
                    </View>
                    {this.footer()}
                </Content>
                <ModalView
                    key="detalhesProduto"
                    show={this.state.mostrarDetalhesProduto}
                    title={selecionado?.nome}
                    // desfocar={false}
                    // padder={false}
                    // showHeader={false}
                    // center
                    // centerContent
                    // showCancel
                    // icon={<Icon name='document' />}
                    width={"100%"}
                    height={"60%"}
                    onConfirm={() => this._atualizarProduto()}
                    onCancel={() => this.setState({ mostrarDetalhesProduto: false })}
                >
                    {this.state.itemSelecionado != null ? (
                        // <Text>{JSON.stringify(this.state.itemSelecionado)}</Text>

                        <List>
                            <ListItem itemDivider>
                                <Text>Preço</Text>
                            </ListItem>
                            <ListItem>
                                <Text>{selecionado.valor ?? "--"}</Text>
                            </ListItem>
                            <ListItem itemDivider>
                                <Text>Unidade</Text>
                            </ListItem>
                            <ListItem>
                                <SelecionarUnidade
                                    selectedValue={this.state.itemSelecionado.unidade}
                                    onSelected={(unidade) => this.setState({ itemSelecionado: { ...this.state.itemSelecionado, unidade: unidade } })}
                                />
                            </ListItem>
                            <ListItem itemDivider>
                                <Text>Quantidade</Text>
                            </ListItem>
                            <Item style={{ padding: 10 }}>
                                <Label></Label>
                                <Input
                                    style={{ textAlign: "center", borderBottomWidth: 0.5, borderColor: "gray" }}
                                    value={selecionado.quantidade.toString()}
                                    onChangeText={(texto) => this._quantidadeSelecionado(texto)}
                                    keyboardType={"number-pad"}
                                />
                                <Button danger transparent
                                    onPress={() => this._quantidadeSelecionado(null, -1)}
                                >
                                    <Icon name="remove" />
                                </Button>
                                <Button transparent
                                    onPress={() => this._quantidadeSelecionado(null, 1)}
                                >
                                    <Icon name="add" />
                                </Button>
                                <Button danger onPress={() => this._removerProduto(this.state.itemSelecionado.id)}>
                                    <Icon name="trash" />
                                </Button>
                            </Item>
                            {/* <ListItem>
                            </ListItem> */}
                            {/* <ListItem noBorder style={[styles.center]}>
                                <Left>
                                    <Body style={[styles.center, { backgroundColor: "transparent" }]}>
                                    </Body>
                                </Left>
                            </ListItem> */}
                        </List>
                    )
                        : listaVazia("Selecione um produto")}
                </ModalView>
            </>
        )
    }
}

const comprasStyle = StyleSheet.create({
    footerButtonText: {
        color: "white"
    },
    fonte: {
        fontSize: 14
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }
})

const mapStateToProps = state => {
    return {
        compras: state.comprasReducer.repos.compras,
        compraSelecionada: state.listarComprasReducer.repos.selecionada
    };
};

const mapDispatchToProps = {
    comprasRepos,
    listarComprasRepos,
    listarComprasDeletar,
    adicionarCompra,
    comprasReset,
    removerCompra,
    atualizarCompra
};

export default connect(mapStateToProps, mapDispatchToProps)(ItensCompras);