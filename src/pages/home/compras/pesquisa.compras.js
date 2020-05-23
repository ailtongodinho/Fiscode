import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, Picker, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet, Item, Form, Label, H2, H3, Separator } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import Background from "../../../components/backgroud";
import { money } from "../../../components/mask";
import { DateTime } from "../../../helpers/datetime";
import { listaVazia } from "../../../components/listaVazia";

//  Redux
import { connect } from "react-redux";
import { produtoComprasRepos, produtoComprasReset } from "../../../redux/reducers/compras/produto.comprasReducer";
import { comprasRepos, adicionarCompra } from "../../../redux/reducers/compras/comprasReducer";
import { pesquisarProdutoPayload } from "../../../models/payloads/produtoPayload";
import { produtoCompraPayload } from "../../../models/payloads/produtoCompraPayload";

const tamanhoTexto = 2

const tiposUnidades = [{ label: "UN", value: "UN" }, { label: "G", value: "KG" }]

class PesquisaCompras extends Component {
    constructor(props) {
        super(props);
        this.state = this.novoEstado
    }
    novoEstado = {
        payload: new pesquisarProdutoPayload(),
        produto: new produtoCompraPayload(0, tiposUnidades[0].value),
        produtoPronto: false,
        placeholder: "Escreva o nome do produto"
    }
    componentDidMount() {
        this._reset()
    }
    _reset = () => {
        // this.props.produtoComprasReset();
        this.setState(this.novoEstado)
    }
    criarItem = (item, customizado = false) => {
        const key = item.id.toString();
        const existe = this.props.verificaProdutoCompra(item.id);
        return (
            <ListItem key={key + "_LISTITEM"} onPress={() => this._adicionarProduto(item.id, customizado)}>
                {/* <Left style={styles.center}> */}
                <Button small transparent style={{ padding: 0, margin: -10 }}>
                    <Icon name={existe != null ? "checkmark" : "add"} style={{ color: existe != null ? "green" : "blue", fontSize: 15 }} />
                    {/* <Icon name={"add"}/> */}
                </Button>
                <Body style={[{ backgroundColor: "transparent" }]}>
                    <Text note>{item?.dataSaldos != null ?
                        DateTime.formatDate(new Date(item.dataSaldos), 'dd/MM/yyyy') + " | "
                        : null
                    }{money(item.valorUnitario).masked}
                    </Text>
                    <Text uppercase={true} >{item.apelido ?? item.nome}</Text>
                </Body>
                {/* </Left> */}
                <View style={[styles.center]}>
                    <Button small vertical style={[styles.startRadius, styles.endRadius]}>
                        {/* {item?.valorUnitario != null ?
                            <Text>{money(item.valorUnitario).masked}</Text>
                            : null
                        } */}
                        {/* </Button>
                                <Button small full> */}
                        <Text>{item.unidade}</Text>
                    </Button>
                </View>
            </ListItem>
        )
    };
    _buscarQuantidade = () => {
        if (!this.state.produtoPronto) {
            this.setState({ produtoPronto: true, placeholder: "Digite a Quantidade" });
        }
    }
    _adicionarProduto = (idProduto, customizado = false) => {
        // this.props.navigation.navigate('Produto', { idProduto: idProduto })
        var payload = new produtoCompraPayload();
        payload.idCompra = this.props.compraSelecionada.id;
        payload.idProduto = idProduto;
        payload.quantidade = 1;
        if (customizado) {
            payload.unidade = this.state.produto.unidade
            payload.quantidade = Number(this.state.produto.quantidade.replace(",", "."));
            payload.apelido = this.state.payload.nomeproduto
        }
        // console.log("_adicionarProduto", payload);

        this.props.adicionarCompra(payload)
            .then(() => {
                this.props.comprasRepos()
                this._reset()
            })
    }
    _exit = () => {
        this.props.navigation.goBack()
    }
    _carregarQuantidade = (qtd) => {
        // var texto = money(qtd, { unit: "" })
        this.setState({ produto: { ...this.state.produto, quantidade: qtd } }, () => {
            console.log("_carregarQuantidade", qtd);
        })
    }
    _carregarLista = (texto) => {
        this.setState({ payload: { ...this.state.payload, nomeproduto: texto }, produto: { ...this.state.produto, apelido: texto } }, () => {
            if (!this.state.produtoPronto) {
                if (texto.length > tamanhoTexto) {
                    this.props.produtoComprasRepos(this.state.payload);
                }
            }
        })
    }
    _itens = () => {
        var obj = []
        if (this.state.payload != undefined && this.state.payload.nomeproduto != undefined && this.state.payload.nomeproduto.length > 2) {
            obj.push(this.criarItem({ id: -1, apelido: this.state.payload.nomeproduto, unidade: this.state.produto.unidade }, true))
            obj.push(<Separator itemDivider style={[styles.center]}><Text>Produtos encontrados</Text></Separator>)
        }

        if (this.state.payload?.nomeproduto.length < tamanhoTexto) {
            var msg = { msg: 'Escreva o nome do produto abaixo!', icone: "happy" }
            // this.state.payload != null && this.state.payload.nomeproduto != null && this.state.payload.nomeproduto.length > tamanhoTexto ?
            // { msg: 'Desculpe, não encontramos o produto ... ', icone: "sad" } :
            obj.push(listaVazia(
                msg.msg
                , null
                , <Icon name={msg.icone} />))
        }
        // else {
        if (this.props.produtos !== null && this.props.produtos !== undefined && this.props.produtos.length > 0) {
            this.props.produtos.forEach((item) => {
                obj.push(this.criarItem(item));
            })
        }
        // }
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
                        {/* <Title style={{ color: "#000" }}>Pesquisar Produto</Title> */}
                    </Body>
                </Header>
                <Content
                // padder
                >
                    <Card noShadow transparent>
                        {/* <CardItem>
                            <Item>
                                <Input
                                    placeholder="Ex: Sabonete "
                                    value={this.state.payload.nomeproduto}
                                    onChangeText={this._carregarLista}
                                    autoFocus
                                />
                                <Icon name="search" />
                            </Item>
                        </CardItem> */}
                        <List>
                            {/* <ListItem key={"PRINCIPAL_LISTITEM"}>
                                <Left style={[styles.center]}>
                                    <Body style={[{ backgroundColor: "transparent" }]}>
                                        <Button small transparent>
                                            <Icon name={"add"} />
                                        </Button>
                                        <Input
                                            placeholder="Ex: Sabonete "
                                            value={this.state.payload.nomeproduto}
                                            onChangeText={this._carregarLista}
                                            autoFocus
                                        />
                                        <View style={styles.center, { flex: 1, flexDirection: "row", justifyContent: 'center' }}>
                                            {tiposUnidades.map((x, i) => {
                                                var style = [{ flex: 1 }]
                                                if (i == 0) style.push(styles.startRadius)
                                                if (i == tiposUnidades.length) style.push(styles.endRadius)
                                                return (
                                                    <Button
                                                        small
                                                        style={style}
                                                        vertical
                                                        primary={x == this.state.produto.unidade}
                                                        light={x !== this.state.produto.unidade}
                                                        onPress={() => this.setState({ produto: { ...this.state.produto, unidade: x } })}
                                                    >
                                                        <Text>{x}</Text>
                                                    </Button>
                                                )
                                            })}
                                        </View>
                                    </Body>
                                </Left>
                            </ListItem> */}
                            {/* {} */}
                            {this._itens()}
                        </List>
                    </Card>
                </Content>
                <Footer style={{ height: "7%", backgroundColor: "transparent", display: !this.state.produtoPronto ? "none" : "flex" }}>
                    <View style={[styles.center, { flex: 1, flexDirection: "row", justifyContent: 'center' }]}>
                        {tiposUnidades.map((x, i) => {
                            var style = [{ flex: 1, height: "100%" }, styles.center]
                            // if (i == 0) style.push(styles.startRadius)
                            // if (i == tiposUnidades.length) style.push(styles.endRadius)
                            return (
                                <Button
                                    first={i == 0}
                                    last={i == tiposUnidades.length}
                                    // small
                                    // large
                                    style={style}
                                    // vertical
                                    primary={x.value == this.state.produto.unidade}
                                    transparent={x.value !== this.state.produto.unidade}
                                    onPress={() => this.setState({ produto: { ...this.state.produto, unidade: x.value } })}
                                >
                                    <Text>{x.label}</Text>
                                </Button>
                            )
                        })}
                    </View>
                </Footer>
                <Footer style={[
                    { backgroundColor: "transparent" },
                    { borderTopWidth: 0.5, borderTopColor: "lightgray", elevation: 0.3 },
                ]}
                >
                    {/* <Body style={[styles.center]}> */}

                    {!this.state.produtoPronto ?
                        <Input
                            placeholder={this.state.placeholder}
                            value={this.state.payload.nomeproduto}
                            onChangeText={this._carregarLista}
                            autoFocus
                            style={{ textAlign: "center" }}
                            returnKeyType={"next"}
                        />
                        :
                        <Input
                            placeholder={this.state.placeholder}
                            value={this.state.produto.quantidade}
                            keyboardType={"number-pad"}
                            onChangeText={this._carregarQuantidade}
                            autoFocus
                            style={{ textAlign: "center" }}
                            returnKeyType={"next"}
                        />
                    }
                    <Button large
                        onPress={!this.state.produtoPronto ? this._buscarQuantidade : () => this._adicionarProduto(null, true)}
                    >
                        <Icon name="send" />
                    </Button>


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
        produtos: state.produtoComprasReducer.repos,
        verificaProdutoCompra: (idProduto) => {
            var ret = [];
            // console.log("verificaProdutoCompra", idProduto, state.comprasReducer.repos);

            if (state.comprasReducer.repos != undefined) {
                ret = state.comprasReducer.repos?.filter(x => (x.produto?.id ?? 0) == idProduto)[0]
            }

            return ret;
            // return lst?.length > 0 ? lst[0] : null;
            // return null;
        },
        compraSelecionada: state.listarComprasReducer.hasOwnProperty("selecionada") ? state.listarComprasReducer.selecionada : null
    };
};

const mapDispatchToProps = {
    produtoComprasRepos,
    produtoComprasReset,
    adicionarCompra,
    comprasRepos,
};

export default connect(mapStateToProps, mapDispatchToProps)(PesquisaCompras);