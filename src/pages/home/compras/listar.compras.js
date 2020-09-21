import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import Background from "../../../components/backgroud";
import { money } from "../../../components/mask";
import { DateTime } from "../../../helpers/datetime";
import { listaVazia } from "../../../components/listaVazia";
//  Redux
import { connect } from "react-redux";
import { listarComprasRepos, selecionarLista } from "../../../redux/reducers/compras/listar.comprasReducer";

class ListarCompras extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        if (this.props.compras == null) {
            this.props.listarComprasRepos();
        }
    }
    _exit = () => {
        this.props.navigation.goBack()
    }
    _navegarCompras = (idCompra) => {
        this.props.selecionarLista(this.props.compras.filter(x => x.id == idCompra)[0]);
        this.props.navigation.navigate("Compras")
    }
    _navegarNovaCompra = () => {
        this.props.navigation.navigate("NovaCompra");
    }
    _itens = () => {
        var obj = []
        if (this.props.compras !== null && this.props.compras !== undefined && this.props.compras.length > 0) {
            this.props.compras.forEach((item) => {

                const key = item.id;
                obj.push(
                    <ListItem key={key + "_LISTITEM"} onPress={() => this._navegarCompras(item.id)}>
                        <Left key={key + "_LEFT"}>
                            {/* <Text style={listarStyle.numeracao}>{item.id}</Text> */}
                            <Body key={key + "_BODY"}>
                                <Text>{item.nome}</Text>
                                <Text note>{DateTime.formatDate(new Date(item.dataCriacao), 'dd/MM/yyyy HH:mm:ss')}</Text>
                            </Body>
                            {/* <Text>{money(item.total).masked}</Text> */}
                            {item.uf != null ?
                                <Text note>{item.municipio}, {item.uf}</Text>
                            : null}
                        </Left>
                    </ListItem>
                )
            })
        }
        else {
            obj.push(listaVazia('Sem listas por aqui ...', <Button transparent bordered rounded onPress={() => this.props.listarComprasRepos()}><Icon name={"refresh"} /></Button>))
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
                        <Title style={{ color: "#000" }}>Lista de Compras</Title>
                    </Body>
                    <Button transparent
                        onPress={this._navegarNovaCompra}
                    >
                        <Icon name="add" style={{ color: "#000" }} />
                    </Button>
                </Header>
                <Content
                    padder
                >
                    <List>
                        {this._itens()}
                    </List>
                </Content>
            </Background>
        );
    }
}

const listarStyle = StyleSheet.create({
    footerButtonText: {
        color: "white"
    },
    numeracao: {
        paddingHorizontal: 10
    }
})

const mapStateToProps = state => {
    return {
        compras: state.listarComprasReducer.repos.lista
    };
};

const mapDispatchToProps = {
    listarComprasRepos,
    selecionarLista
};

export default connect(mapStateToProps, mapDispatchToProps)(ListarCompras);