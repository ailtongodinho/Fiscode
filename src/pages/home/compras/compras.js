import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon, Text, Item, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import { money } from "../../../components/mask";
import Background from "../../../components/backgroud";
import { listaVazia } from "../../../components/listaVazia";
import { DateTime } from "../../../helpers/datetime";
import { ModalView } from "../../../components/modal";
import { produtoCompraPayload } from "../../../models/payloads/produtoCompraPayload";
//  Redux
import { connect } from "react-redux";
import { comprasRepos, adicionarCompra } from "../../../redux/reducers/compras/comprasReducer";
import { listarComprasRepos, listarComprasDeletar } from "../../../redux/reducers/compras/listar.comprasReducer";

const lerProps = (props) => {
    var compra = props.compraSelecionada;
    // console.log("lerProps", compra);

    return {
        compra: compra,
        // data: compra != null ? props.comprasRepos({ idCompra: compra.id }) : null,
        data: compra != null ? props.comprasRepos() : null,
        confirmarDeletarCompra: false
    }
}

class Compras extends Component {
    constructor(props) {
        super(props);
        this.state = lerProps(this.props)
    }
    criarItem = (item) => {
        const produto = {
            unidade: item.produto?.unidade ?? item.unidade,
            nome: (item.produto?.apelido ?? item.produto?.nome) ?? item.apelido,
            valor: item.produto != null ? money(item.produto?.valorUnitario ?? 0).masked : "--"
        }
        const key = item.id
        return (
            <Card
                key={key + "_CARD"}
                noShadow
            >
                <CardItem
                    key={key + "_CARD_BODY"}
                    cardBody
                >
                    <View key={key + "_CARD_BODY_UN"}
                        style={[styles.center, styles.startRadius
                            , { /*backgroundColor: "#3F51B5",*/ padding: 12 }
                            , { borderRightWidth: 0.5, borderColor: "#CCC" }
                        ]}>
                        {/* <Text style={[comprasStyle.fonte, { padding: 2 }]}>{money(item.quantidade).masked}</Text> */}
                        <Text style={[comprasStyle.fonte, { padding: 2 }]}>{item.quantidade}</Text>
                        <Text style={[comprasStyle.fonte, { padding: 2, borderTopWidth: 0.5, borderColor: "black" }]}>{produto.unidade}</Text>
                    </View>
                    <Left key={key + "_CARD_BODY_LEFT"} style={[{ backgroundColor: "transparent" }]}>
                        {/* <View style={[styles.center, { backgroundColor: "transparent" }]}> */}
                        {/* <Button style={[styles.startRadius, styles.endRadius]}> */}
                        {/* </Button> */}
                        {/* </View> */}

                        <Body key={key + "_CARD_BODY_LEFT_BODY"} style={[styles.leftCenter, { backgroundColor: "transparent" }]}>
                            <Text uppercase={true} style={[comprasStyle.fonte]}>{produto.nome}</Text>
                            <Text note>{produto.valor}</Text>
                            {/* <View style={[styles.center, styles.row, { backgroundColor: "transparent" }]}>
                                            <Text note>KG</Text>
                                        </View> */}
                            {/* <Text note>{item.produto.codigo}</Text> */}
                        </Body>
                    </Left>
                    <Right key={key + "_CARD_BODY_RIGHT"}>
                        <View key={key + "_CARD_BODY_RIGHT_VIEW"} style={[styles.center, styles.row, { backgroundColor: "transparent" }]}>
                            <Button small danger transparent onPress={() => this._adicionarProduto(item.id, -item.quantidade)}>
                                <Icon name="trash" />
                            </Button>
                            {/* <Button small dark transparent onPress={() => this._adicionarProduto(item.id, -1)}>
                            </Button> */}
                            <Button small vertical
                                style={[{ margin: 10 }]}
                                onPress={() => this._adicionarProduto(item.id, 1)}>
                                {/* <Icon style={{ fontSize: 12 }} name="add" />
                                <Icon style={{ fontSize: 12 }} name="remove" /> */}
                            </Button>
                        </View>
                    </Right>
                </CardItem>
            </Card>
        )
    }
    componentDidUpdate() {
        console.log("componentDidUpdate", new Date());

        if (this.state.compra !== this.props.compraSelecionada) {
            console.log("Carregando...");

            this.setState(lerProps(this.props))
        }
    }
    _navegarProduto = () => {
        this.props.navigation.navigate("Produto")
    }
    _navegarPesquisa = () => {
        this.props.navigation.navigate("PesquisaCompras")
    }
    _exit = () => {
        this.props.navigation.goBack()
    }
    _adicionarProduto = (id, qtd, un = "UN") => {
        var payload = new produtoCompraPayload();
        payload.idCompra = this.props.compraSelecionada.id;
        payload.id = id;
        payload.quantidade = qtd;
        payload.unidade = un;
        this.props.adicionarCompra(payload);
    }
    comprasItens = () => {
        var obj = [];
        console.log(this.props.compras);

        if (this.props.compras !== null && this.props.compras !== undefined && this.props.compras.length > 0) {
            this.props.compras.forEach((item) => {
                obj.push(this.criarItem(item))
            })
        }
        else {
            obj.push(listaVazia(
                'Adicione alguns itens a lista!',
                <Button transparent rounded bordered onPress={() => this.props.comprasRepos()}><Icon name="refresh" /></Button>
            ))
        }
        return obj;
    }
    _mostrarMais = () => {
        ActionSheet.show({
            options: [
                { text: "Novo Produto", icon: "add", iconColor: "blue" },
                { text: "Deletar", icon: "trash", iconColor: "red" },
                { text: "Cancelar", icon: "close", iconColor: "green" }
            ],
            cancelButtonIndex: 2,
            destructiveButtonIndex: 1,
            title: "Opções"
        }, index => {
            console.log("ActionSheet", index);
            switch (index) {
                case 0:
                    this._navegarPesquisa()
                    break;
                case 1:
                    this.setState({ confirmarDeletarCompra: true })
                    break;
                default:
                    break;
            }
        })
    }
    _deletarCompra = () => {
        this.props.listarComprasDeletar(this.state.compra.id).then(() => {
            this.props.listarComprasRepos().then(() => {
                this._exit();
            })
        });
    }
    render() {

        if (1 == 0) {
            return listaVazia('Sem Dados')
        }

        const key = "a"

        return (
            <Background
                backgroundColor={"#FFF"}
            >
                <Header
                    noShadow
                    hasTabs
                    style={[styles.center, styles.headerContainer]}
                >
                    <Left>
                        <Button icon transparent
                            onPress={this._exit}
                        >
                            <Icon name="arrow-back" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#000" }}>{this.state.compra.nome}</Title>
                        <Text note>{DateTime.formatDate(new Date(this.state.compra.dataCriacao), 'dd/MM/yyyy HH:mm:ss')}</Text>
                    </Body>
                    <Button transparent
                        // onPress={this._navegarPesquisa}
                        onPress={this._mostrarMais}
                    >
                        <Icon name="more" style={{ color: "#000" }} />
                    </Button>
                </Header>
                <Content
                    // style={{ maxHeight: "80%" }}
                    padder
                >
                    {this.comprasItens()}
                </Content>
                <Footer style={[
                    { backgroundColor: "transparent" },
                    { borderTopWidth: 0.5, borderTopColor: "lightgray", elevation: 0.3 },
                ]}
                >
                    {/* <Left> */}
                    <Body style={[styles.center]}>
                        <Button full onPress={this._navegarPesquisa}>
                            <Text uppercase={false}>Adicionar Item</Text>
                        </Button>
                        {/* <Input
                            style={{ textAlign: "center" }}
                            placeholder={"Adicionar item"}
                        /> */}
                    </Body>
                    {/* </Left> */}

                </Footer>

                <ModalView
                    key="1"
                    show={this.state.confirmarDeletarCompra}
                    title={"Deletar Lista Compra"}
                    center
                    centerContent
                    showCancel
                    // icon={<Icon name='document' />}
                    width={"80%"}
                    height={"30%"}
                    onConfirm={() => this._deletarCompra()}
                    onCancel={() => this.setState({ confirmarDeletar: false })}
                >
                    <View style={[styles.center, { padding: 20 }]}>
                        <Text>Realmente deseja deletar a lista de compra <Text style={{ fontWeight: "bold" }}>{this.state.compra.nome}</Text>?</Text>
                    </View>
                </ModalView>
            </Background >
        );
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
        compras: state.comprasReducer.repos,
        compraSelecionada: state.listarComprasReducer.hasOwnProperty("selecionada") ? state.listarComprasReducer.selecionada : null
    };
};

const mapDispatchToProps = {
    comprasRepos,
    listarComprasRepos,
    listarComprasDeletar,
    adicionarCompra
};

export default connect(mapStateToProps, mapDispatchToProps)(Compras);