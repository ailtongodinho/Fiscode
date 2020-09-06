import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon, Text, Item, List, ListItem, Body, Card, CardItem, Label, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import { money } from "../../../components/mask";
import Background from "../../../components/backgroud";
import { listaVazia } from "../../../components/listaVazia";
import { DateTime } from "../../../helpers/datetime";
import { ModalView } from "../../../components/modal";
import { produtoCompraPayload } from "../../../models/payloads/produtoCompraPayload";
import { SelecionarUnidade } from "./selecionarUnidade.compras";
import ItensCompras from "./itens.compras";
import MercadosCompras from "./mercados.compras";

//  Redux
import { connect } from "react-redux";
import { comprasReset, comprasRepos, adicionarCompra, removerCompra, atualizarCompra } from "../../../redux/reducers/compras/comprasReducer";
import { listarComprasRepos, listarComprasDeletar } from "../../../redux/reducers/compras/listar.comprasReducer";

const lerProps = (props) => {
    var compra = props.compraSelecionada;
    // console.log("lerProps", compra);

    return {
        compra: compra,
        // data: compra != null ? props.comprasRepos({ idCompra: compra.id }) : null,
        data: compra != null ? props.comprasRepos() : null,
        confirmarDeletarCompra: false,
        mostrarDetalhesProduto: false,
        itemSelecionado: null
    }
}

class Compras extends Component {
    constructor(props) {
        super(props);
        this.state = lerProps(this.props)
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
        this.props.comprasReset()
        this.props.navigation.goBack()
    }
    _mostrarMais = () => {
        ActionSheet.show({
            options: [

                { text: "Deletar", icon: "trash", iconColor: "red" },
                { text: "Cancelar", icon: "close", iconColor: "green" }
            ],
            cancelButtonIndex: 1,
            destructiveButtonIndex: 0,
            title: "Opções"
        }, index => {
            console.log("ActionSheet", index);
            switch (index) {
                case 0:
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
                {/* <Content
                    // style={{ maxHeight: "80%" }}
                    padder
                >
                    {this.comprasItens()}
                </Content> */}
                <Tabs
                    initialPage={0}
                    tabBarUnderlineStyle={{ backgroundColor: pallet[0] }}
                    tabBarPosition={"bottom"}
                    locked
                // renderTabBar={() => <ScrollableTab />}
                >
                    <Tab
                        heading={
                            <TabHeading style={[styles.center, { backgroundColor: "#FFF" }]}>
                                <Text style={{ color: "#000" }}>Produtos</Text>
                            </TabHeading>
                        }
                    >
                        <ItensCompras navigate={(name) => this.props.navigation.navigate(name)}/>
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading style={[styles.center, { backgroundColor: "#FFF" }]}>
                                <Text style={{ color: "#000" }}>Comparação</Text>
                            </TabHeading>
                        }
                    >
                        <MercadosCompras />
                    </Tab>
                </Tabs>
                {/* <Footer style={[
                    { backgroundColor: "transparent" },
                    { borderTopWidth: 0.5, borderTopColor: "lightgray", elevation: 0.3 },
                ]}
                >
                    <Button style={[styles.full, styles.center]} onPress={this._navegarPesquisa}>
                        <Text uppercase={false}>Adicionar Item</Text>
                    </Button>
                </Footer> */}

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
                    onCancel={() => this.setState({ confirmarDeletarCompra: false })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Compras);