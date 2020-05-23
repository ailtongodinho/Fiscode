import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet, Item, Form, Label } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import Background from "../../../components/backgroud";
import { money } from "../../../components/mask";
//  Redux

const opcoes_qdt = [2, 5, 10, 15]

export class Produto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qtd: 0,
            fixed: 0,
            produto: {
                nome: "Sabonete Dove Man Care 2.0",
                unidade: "UN",
                precoUnitario: 2.49,
            }
        }
    }
    componentDidMount() {
        this.addQtd(1)
    }
    _exit = () => {
        this.props.navigation.goBack()
    }
    addQtd = (qtd) => {
        if (this.state.qtd + qtd > 0) {
            var fixed = 0;
            if (this.state.produto.unidade.toUpperCase() != "UN") {
                qtd = qtd / 10
                fixed = 3;
            }
            this.setState({ fixed: fixed, qtd: (this.state.qtd + qtd) })
        }
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
                            <Icon name="close" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#000" }}>Informações do Produto</Title>
                    </Body>
                </Header>
                <Content
                    padder
                >
                    <Card noShadow>
                        {/* <CardItem header style={[styles.center]} bordered>
                            <Text>Informações do Produto</Text>
                        </CardItem> */}
                        <List>
                            <ListItem>
                                <Left>
                                    <Body>
                                        <Text note>Nome do Produto</Text>
                                        <Text>{this.state.produto.nome}</Text>
                                    </Body>
                                </Left>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Body>
                                        <Text note>Unidade</Text>
                                        <Text>{this.state.produto.unidade}</Text>
                                    </Body>
                                </Left>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Body>
                                        <Text note>Valor Unitário</Text>
                                        <Text>{money(this.state.produto.precoUnitario).masked}</Text>
                                    </Body>
                                </Left>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Body>
                                        <Text note>Quantidade</Text>
                                        <Text style={[produtoStyle.buttonText]}>{this.state.qtd.toFixed(this.state.fixed)}</Text>
                                    </Body>
                                    <Button bordered onPress={() => this.addQtd(-1)} style={[produtoStyle.buttonPadding]}>
                                        <Icon name="remove" />
                                    </Button>
                                    <Button bordered onPress={() => this.addQtd(1)}>
                                        <Icon name="add" />
                                    </Button>
                                </Left>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Body>
                                        <Text note>Subtotal</Text>
                                        <Text>{money((this.state.produto.precoUnitario * this.state.qtd)).masked}</Text>
                                    </Body>
                                </Left>
                            </ListItem>
                        </List>
                    </Card>
                </Content>
                <Footer>
                    <Button transparent>
                        <Text style={produtoStyle.footerButtonText}>Adicionar Produto</Text>
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