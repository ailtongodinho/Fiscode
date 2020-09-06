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
import { TextInput, ScrollView } from "react-native-gesture-handler";

//  Redux
import { connect } from "react-redux";

class MercadosCompras extends Component {
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

        var lista = this.props.compras?.dados;

        if (lista !== null && lista !== undefined && lista.length > 0) {
            lista.forEach((item) => {
                // obj.push()
                var formatado = this.formatarItem(item);
                obj.push(
                    <Card
                        key={formatado.chave + "_CARD"}
                        style={{ marginBottom: 15 }}
                    >
                        
                    </Card>
                )
            })
        }

        return obj;

    }
    render() {
        return (
            <Content
                padder
            >
                <Card>
                    <CardItem>
                        <Grid>
                            <Row>
                                <Body>
                                    <ScrollView horizontal>
                                        <TextInput editable={false} value={"Carrefour Comercio e Transporte LTDA - Tamboré 0000000000000000"} />
                                    </ScrollView>
                                </Body>
                            </Row>
                            <Row>
                                <Body>
                                    <ScrollView horizontal>
                                        <Col
                                            key={"_COL_1_1"}
                                            style={styles.center}
                                        >
                                            <Text note>Total</Text>
                                            <Text
                                                style={[{ padding: 0, fontWeight: "bold", color: 'black' }]}
                                            >R$ 100.00 </Text>
                                        </Col>
                                        <Col
                                            key={"_COL_1_1"}
                                            style={styles.center}
                                        >
                                            <Text note>Produtos</Text>
                                            <Text
                                                style={[{ padding: 0, fontWeight: "bold", color: 'black' }]}
                                            >900</Text>
                                        </Col>
                                    </ScrollView>
                                </Body>
                            </Row>
                        </Grid>
                    </CardItem>
                </Card>
            </Content>
        )
    }
}

const comparacaoStyle = StyleSheet.create({

})

const mapStateToProps = state => {
    return {
        compras: state.comprasReducer.repos.compras,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MercadosCompras);