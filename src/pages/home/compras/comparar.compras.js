import React, { Component } from "react";
import { Text, Body, Card, CardItem, Content, Grid, Row, Col, Left, Button, Accordion, Header, Icon, View } from "native-base";
import { styles } from "../../../styles/layouts/layouts.styles";
import { money } from "../../../components/mask";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { criarProdutoPesquisa } from "../../../components/produtoLayouts";
import Background from "../../../components/backgroud"
import { listaVazia } from "../../../components/listaVazia";

//  Redux
import { connect } from "react-redux";

class CompararCompras extends Component {
    constructor(props) {
        super(props);
    }
    formatarItem = (item) => {
        if (item == null) return;
        var emissores = [];
        item.saldos.forEach(x => {
            emissores.push(x.emissor);
        })
        return {
            chave: item.idProduto,
            unidade: item.unidade ?? item.produto?.unidade,
            nome: (item.produto?.apelido ?? item.produto?.nome) ?? item.apelido,
            valor: item.produto != null ? money(item.produto?.saldos[0].valorUnitario ?? 0).masked : "--",
            quantidade: item.quantidade,
            apelido: item.apelido,
            id: item.id,
            idProduto: item.idProduto,
            emissores: emissores
        }
    }
    montarMercados = () => {

        var obj = []

        var lista = this.props.mercados;

        if (lista !== null && lista !== undefined && lista.length > 0) {
            obj.push(
                <Accordion
                    dataArray={lista}
                    style={[{ border: 0 }]}
                    renderHeader={(item, expanded) => {
                        var emissor = item.emissor;
                        var key = item.emissor.id;
                        return (
                            <Card
                                key={key + "_CARD"}
                                noShadow
                            >
                                <CardItem>
                                    <Grid
                                        key={key + "_GRID"}
                                    >
                                        <Col
                                            key={key + "_COL_1"}
                                        >
                                            <Row key={key + "_ROW_1"}>
                                                <Left>
                                                    <Body>
                                                        <ScrollView horizontal>
                                                            <TextInput editable={false} value={(emissor.nomeFantasia ?? emissor.razaoSocial)} />
                                                        </ScrollView>
                                                    </Body>
                                                    <Button dark small transparent>
                                                        <Text>{money(item.total).masked}</Text>
                                                    </Button>
                                                    <Button small rounded>
                                                        <Text uppercase={false}>{item.quantidade}</Text>
                                                    </Button>
                                                </Left>
                                            </Row>
                                        </Col>
                                    </Grid>
                                </CardItem>
                            </Card>
                        )
                    }}
                    renderContent={(item) => {
                        var content = []
                        content.push(
                            <View style={[{ paddingHorizontal: 15 }]}>
                                {
                                    item.dados.map((dado) => {
                                        return criarProdutoPesquisa(dado.produto, true, null, dado.saldo);
                                    })
                                }
                            </View>
                        )
                        return content;
                    }}
                />
            )
        }
        else {
            obj.push(
                listaVazia(
                    "Ops... Nada foi encontrado..."
                    , null
                    , null)
            )
        }

        return obj;

    }
    _exit = () => {
        this.props.navigation.goBack()
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
                        <Text>Compare os preços entre Mercados!</Text>
                    </Body>
                </Header>
                <Content
                    padder
                >
                    {this.montarMercados()}
                </Content>
            </Background>
        )
    }
}


const mapStateToProps = state => {
    return {
        mercados: state.compararComprasReducer.repos?.lista
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CompararCompras);