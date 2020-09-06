import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Spinner, Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, Picker, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet, Item, Form, Label, H2, H3, Separator } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import Background from "../../../components/backgroud";
import { money } from "../../../components/mask";
import { DateTime } from "../../../helpers/datetime";
import { listaVazia } from "../../../components/listaVazia";
import { pesquisarProdutoPayload } from "../../../models/payloads/produtoPayload";
import { produtoCompraPayload } from "../../../models/payloads/produtoCompraPayload";
import { appsettings } from "../../../appsettings";

//  Redux
import { connect } from "react-redux";
import { produtoComprasRepos, produtoComprasReset, produtoComprasResetLista, produtoSelecionar } from "../../../redux/reducers/compras/produto.comprasReducer";
import { comprasRepos } from "../../../redux/reducers/compras/comprasReducer";
import { criarProdutoPesquisa } from "../../../components/produtoLayouts";

class PesquisaCompras extends Component {
    constructor(props) {
        super(props);
        this.state = this.novoEstado
        this.inputRef = React.createRef();
    }
    novoEstado = {
        payload: new pesquisarProdutoPayload(),
        produto: new produtoCompraPayload(1, appsettings.produto.unidades[0].value),
        produtoPronto: false,
        produtoSelecionado: null,
    }
    _reset = () => {
        // this.props.produtoComprasReset();
        this.props.produtoComprasResetLista();
        this.setState(this.novoEstado)
    }
    _navegarDetalhes = () => {
        this.props.navigation.navigate("PesquisaDetalhesCompras")
    }
    _exit = () => {
        this.props.navigation.goBack()
    }
    selecionarProduto = (item) => {
        item.customizado = item.id == appsettings.produto.customizado.id
        this.props.produtoSelecionar(item);
        this._navegarDetalhes();
        this._reset()
        // this._buscarQuantidade();
        // this.setState({ produtoSelecionado: item })
    }
    _carregarLista = (texto) => {
        this.setState({ payload: { ...this.state.payload, nomeproduto: texto }, produto: { ...this.state.produto, apelido: texto } }, () => {
            if (!this.state.produtoPronto) {
                if (texto.length > appsettings.produto.pesquisa.tamanhoTexto) {
                    setTimeout(() => {
                        if (this.state.payload.nomeproduto.length == texto.length) {
                            this.props.produtoComprasRepos(this.state.payload)
                        }
                    }, 1000);
                    // this.props.produtoComprasRepos(this.state.payload);
                }
            }
        })
    }
    _itens = () => {
        var obj = []
        if (this.state.payload != undefined && this.state.payload.nomeproduto != undefined && this.state.payload.nomeproduto.length > 2) {
            // obj.push(this.criarItem({ id: idCustomizado, apelido: this.state.payload.nomeproduto, unidade: this.state.produto.unidade }, true))
            const produto = { id: appsettings.produto.customizado.id, apelido: this.state.payload.nomeproduto, unidade: this.state.produto.unidade };
            obj.push(criarProdutoPesquisa(produto, produto.id == this.state.produtoSelecionado?.id, this.selecionarProduto))
            obj.push(<Separator itemDivider style={[styles.center]}><Text>Produtos encontrados</Text></Separator>)
        }

        if (this.state.payload?.nomeproduto.length < appsettings.produto.pesquisa.tamanhoTexto) {
            var msg = { msg: 'Escreva o nome do produto abaixo!', icone: "happy" }
            obj.push(listaVazia(
                msg.msg
                , null
                , <Icon name={msg.icone} />))
        }

        if (this.props.compraLoading) {
            obj.push(listaVazia(
                "Carregando"
                , null
                , <Spinner color="red" />))
        }
        else {
            if (this.props.produtos !== null && this.props.produtos !== undefined && this.props.produtos.length > 0) {
                this.props.produtos.forEach((item) => {
                    // obj.push(this.criarItem(item));
                    obj.push(criarProdutoPesquisa(item, item.id == this.state.produtoSelecionado?.id, this.selecionarProduto))
                })
            }
        }
        return obj;
    }
    render() {
        return (
            <Background
                backgroundColor={"#FFF"}
            >
                <Header
                    noShadow
                    style={[styles.center, styles.headerContainer]}
                >
                    <Left>
                        <Button icon transparent
                            onPress={this._exit}
                        >
                            <Icon name="close" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                    </Body>
                </Header>
                <Content
                // padder
                >
                    <Card noShadow transparent>
                        <List>
                            {this._itens()}
                        </List>
                        {this.state.produtoPronto ?
                            <Button transparent style={[styles.center]} onPress={this._buscarQuantidade}>
                                <Text>Voltar</Text>
                            </Button>
                            : null
                        }
                    </Card>
                </Content>
                <Footer style={[
                    { backgroundColor: "transparent" },
                    { borderTopWidth: 0.5, borderTopColor: "lightgray", elevation: 0.3 },
                ]}
                >
                    <ScrollView keyboardShouldPersistTaps="always">
                        <Input
                            placeholder={"Escreva o nome do produto"}
                            value={this.state.payload.nomeproduto}
                            onChangeText={this._carregarLista}
                            autoFocus
                            style={{ textAlign: "center" }}
                            returnKeyType={"next"}
                            ref={this.inputRef}
                            blurOnSubmit={false}
                        />
                    </ScrollView>
                    {/* <Button
                        transparent
                        style={[styles.center, { height: "100%" }]}
                        disabled={this.state.produtoSelecionado == null}
                        onPress={this._buscarQuantidade}
                    >
                        <Text>Proximo</Text>
                    </Button> */}
                </Footer>
            </Background>
        );
    }
}

const produtoStyle = StyleSheet.create({
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
        produtos: state.produtoComprasReducer.repos.produtos,
        compraSucesso: state.comprasReducer.repos.sucesso,
        compraLoading: state.comprasReducer.repos.loading,
        verificaProdutoCompra: (idProduto) => {
            var ret = [];
            // console.log("verificaProdutoCompra", idProduto, state.comprasReducer.repos);

            if (state.comprasReducer.repos.produtos != undefined) {
                ret = state.comprasReducer.repos.produtos?.filter(x => (x.produto?.id ?? 0) == idProduto)[0]
            }

            return ret;
            // return lst?.length > 0 ? lst[0] : null;
            // return null;
        },
        compraSelecionada: state.listarComprasReducer.repos.selecionada
    };
};

const mapDispatchToProps = {
    produtoComprasRepos,
    produtoComprasReset,
    produtoComprasResetLista,
    comprasRepos,
    produtoSelecionar
};

export default connect(mapStateToProps, mapDispatchToProps)(PesquisaCompras);