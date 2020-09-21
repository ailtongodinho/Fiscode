import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, SwipeRow, Radio, Fab, Picker } from "native-base";
// import { TextInputMask } from 'react-native-masked-text'
// import ListarOrdenar from "./listar.ordenar.notas";
import { ListarFiltro } from "./listar.filtro.notas";
import { listaVazia } from "../../../components/listaVazia";
import { money } from "../../../components/mask";
import { ExtracaoPayload } from "../../../models/payloads/ExtracaoPayload";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import { DateTime } from "../../../helpers/datetime";
import { TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import Background from "../../../components/backgroud";
import moment from "moment/min/moment-with-locales";
//  Redux
import { connect } from "react-redux";
import { listarNotasReset, listarNotasRepos, ordernarNotasRepos, listarNotasSelecionar, itensNotasRepos, carregarNotasRepos } from "../../../redux/reducers/nota/notaListarReducer";
import { notaFavoritarRepos } from "../../../redux/reducers/nota/notaFavoritarReducer";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { appsettings } from "../../../appsettings";

class Listar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notas: null,
            payload: new ExtracaoPayload(new Date(2020, 1, 1), new Date(), appsettings.listar.top),
            showFilter: false,
            showOrdenar: false,
            selected: null,
            idMinimo: 0,
            refreshing: false
        }
    }
    componentDidMount() {
        if (this.props.notas == null) {
            this.pesquisar()
        }
    }
    componentWillUnmount() {
        // this.props.listarNotasReset();
    }
    onRefresh = () => {
        this.setState(
            { refreshing: !this.state.refreshing },
            this.pesquisar()
        );
        setTimeout(() => this.setState({ refreshing: !this.state.refreshing }), 2000);
    }
    pesquisar() {
        // console.log("pesquisar", extracaoPayload);
        var extracaoPayload = new ExtracaoPayload();
        extracaoPayload.dataInicio = this.state.payload.dataInicio != null ? new Date(DateTime.formatDate(this.state.payload.dataInicio, "yyyy-MM-dd")) : null;
        extracaoPayload.dataFim = this.state.payload.dataFim != null ? new Date(DateTime.formatDate(this.state.payload.dataFim, "yyyy-MM-dd") + "T23:59:59") : null;
        extracaoPayload.favorito = !this.state.payload.favorito ? null : true;
        extracaoPayload.ordenarId = this.state.payload.ordenarId;
        extracaoPayload.idEmissor = this.state.payload.idEmissor;
        extracaoPayload.top = null;

        this.props.listarNotasRepos(extracaoPayload);
    }
    carregar() {

        var data = moment(this.props.dataFim).subtract(1, 'd').toDate();

        this.setState({ payload: { ...this.state.payload, dataInicio: data } });

        var extracaoPayload = new ExtracaoPayload();
        extracaoPayload.dataInicio = null;
        extracaoPayload.dataFim = data;
        extracaoPayload.favorito = !this.state.payload.favorito ? null : true;
        extracaoPayload.ordenarId = this.state.payload.ordenarId;
        extracaoPayload.idEmissor = this.state.payload.idEmissor;
        extracaoPayload.top = this.state.payload.top;

        this.props.carregarNotasRepos(extracaoPayload);
    }
    showHeader = (show) => {
        this.setState({ showHeader: show })
    }

    showFilter = () => {
        this.setState({ showFilter: true })
    }
    favoritar = (itemId) => {
        console.log("favoritarItem", itemId);
        this.props.notaFavoritarRepos(itemId).then(() => {
            this.pesquisar();
        });
    }
    changeDates = (payload) => {
        console.log("changeDates", payload, this.state);
        this.setState(
            {
                payload: { ...this.state.payload, ...payload }
                // , showFilter: this.state.showFilter ? false : true 
            }, this.pesquisar)
    }
    changeOrder = (radio) => {
        console.log("changeOrder", radio);
        this.setState({ payload: { ...this.state.payload, ordenarId: radio }, showOrdenar: !this.state.showOrdenar }, () => this.props.ordernarNotasRepos(this.state.payload.ordenarId))
    }
    selectItem = (item) => {
        this.props.listarNotasSelecionar(item)
            .then(() => {
                this.props.navigation.navigate('Detalhes', { chaveAcesso: item.chaveAcesso })
            })
    }
    showItems = () => {
        var obj = []

        if (this.props.notas != null && this.props.notas.length != 0) {
            this.props.notas.map(gp => {
                var date = moment(gp.data);
                var key = date.format("YYYYMMDD")
                // console.log("EMISSOR", item.emissor.id);
                obj.push(
                    <Card transparent
                        // style={[{ borderLeftWidth: 1, borderLeftColor: '#000' }]}
                        key={key + "_CARD_HEADER"}
                    >
                        <CardItem
                            key={key + "_CARD_HEADER_ITEM"}
                        >
                            <Left>
                                <Body>
                                    <Text uppercase style={[listaStyle.diaHeader]}>{date.format("D")}</Text>
                                    <Text uppercase note>{date.format("MMMM")}</Text>
                                </Body>
                            </Left>
                            <Body>
                                {/* <Text uppercase>{date.format("d")}</Text>
                                <Text uppercase>{date.format("MMMM")}</Text> */}
                            </Body>
                            <Right>
                                <Text note>{date.format("YYYY")}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                )

                gp.dados.map(item => {
                    obj.push(
                        // <TouchableOpacity
                        //     key={item.chaveAcesso}
                        // // onPress={() => this.selectItem(item.chaveAcesso)}
                        // >
                        <Card
                            style={[{
                                borderRadius: 10,
                            }]}
                            key={item.chaveAcesso + item.id + "_CARD"}
                            noShadow
                        // transparent
                        >
                            <CardItem
                                style={{ borderRadius: 10 }}
                                key={item.chaveAcesso + item.id + "_ITEM"}
                            >
                                <Grid
                                    key={item.chaveAcesso + item.id + "_GRID"}
                                >
                                    <Col key={item.chaveAcesso + item.id + "_COL_1"}
                                        size={95}
                                        style={[{ borderRightWidth: 1, borderRightColor: '#CCC' }]}
                                    >
                                        <Row
                                            style={[{ padding: 10 }]}
                                        >
                                            <Body>
                                                <ScrollView horizontal>
                                                    {/* <Text
                                                        style={[listaStyle.razaoSocial]}
                                                        allowFontScaling
                                                    >
                                                        {item.emissor?.razaoSocial}
                                                    </Text> */}
                                                    <TextInput editable={false} value={item.emissor?.nomeFantasia ?? item.emissor?.razaoSocial} />
                                                </ScrollView>
                                            </Body>
                                            {/* <Grid>
                                                    <Row>
                                                    </Row>
                                                </Grid> */}
                                        </Row>
                                        <Row style={[{ padding: 0 }]}>
                                            {/* <Col
                                                key={item.chaveAcesso + item.id + "_COL_1_1"}
                                                style={styles.center}
                                            > */}
                                            <ScrollView horizontal>
                                                <Button dark transparent small vertical>
                                                    <Text note uppercase={false}>R$</Text>
                                                    <Text
                                                        style={[{ padding: 0, fontWeight: "bold", color: 'black' }]}
                                                    >{money(item.valorTotal).masked}</Text>
                                                </Button>
                                                {/* </Col>
                                            <Col
                                                key={item.chaveAcesso + item.id + "_COL_1_2"}
                                                size={2}
                                                style={styles.center}
                                            > */}
                                                <Button dark transparent small vertical>
                                                    <Text note uppercase={false}>Hora</Text>
                                                    {/* <Text>{DateTime.formatDate(new Date(item.emissao), "dd/MM/yyyy HH:m:s")}</Text> */}
                                                    <Text>{moment(item.emissao).format("LT")}</Text>
                                                    {/* <TextInputMask
                                                        style={[{ padding: 0, color: 'black' }]}
                                                        type={"datetime"}
                                                        options={{
                                                            format: "DD.MM.YYYY HH:mm:ss"
                                                        }}
                                                        value={DateTime.formatDate(new Date(item.emissao), "dd-MM-yyyy HH:m:s")}
                                                        editable={false}
                                                    /> */}
                                                    {/* </Col>
                                            <Col
                                            key={item.chaveAcesso + item.id + "_COL_1_3"}
                                            style={styles.center}
                                        > */}
                                                </Button>
                                                <Button dark transparent small vertical>
                                                    <Text note uppercase={false}>Itens</Text>
                                                    <Text>{item.quantidadeItens}</Text>
                                                    {/* </Col> */}
                                                </Button>
                                            </ScrollView>
                                        </Row>
                                    </Col>

                                    <Col size={15}
                                        style={[styles.center]}
                                        key={item.chaveAcesso + item.id + "_COL_2"}
                                    >
                                        <Button
                                            onPress={() => this.selectItem(item)}
                                            iconLeft transparent vertical
                                        >
                                            <Icon name={"open"} />
                                        </Button>
                                        {/* <Button onPress={() => this.favoritar(item.id)} iconLeft success={item.status == 0} error={item.status == 1} transparent>
                                                <Icon
                                                    name={item.favorito ? 'md-star' : 'md-star-outline'} style={[{ color: 'green' }]}
                                                />
                                            </Button> */}
                                        {/* <Button iconLeft success={item.status == 1} error={item.status == 0} transparent>
                                                <Icon name={item.status == 1 ? 'ios-checkmark-circle-outline' : 'md-hourglass'} />
                                            </Button> */}
                                    </Col>

                                </Grid>
                            </CardItem>
                        </Card>

                        // </TouchableOpacity>
                    )
                })
            })

            if (!this.props.ultimo) {
                obj.push(
                    <Card
                        noShadow
                        key="CARD_FINAL"
                    >
                        <CardItem
                            key="CARDITEM_FINAL"
                        >
                            <Left
                                key="LEFT_FINAL"
                            >
                                <Body
                                    key="BODY_FINAL"
                                    style={[styles.center]}
                                >
                                    <Button key="BUTTON_FINAL" transparent full
                                        onPress={() => this.carregar()}
                                    >
                                        <Text>Carregar Mais</Text>
                                    </Button>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                )
            }

        }
        else {
            obj.push(listaVazia('Não há dados para esse período'))
        }


        return obj;
    }
    _exit = () => {
        this.setState({ payload: { ...this.state.payload, idEmissor: null } }, () => this.props.navigation.goBack())
    }
    render() {
        // console.log("Listar", this.props.ordenar);

        return (
            <Background
                backgroundColor="#FFF"
            >
                <Header
                    noShadow
                    // noLeft={true}
                    // transparent
                    style={[styles.center, styles.headerContainer]}
                >
                    <Left>
                        <Button icon transparent
                            onPress={() => this._exit()}
                        >
                            <Icon name="arrow-back" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={[{ color: 'black', fontWeight: "bold" }]}>Minhas notas</Title>
                    </Body>
                    <Button primary transparent small vertical
                        onPress={this.showFilter}
                    >
                        <Text uppercase={false}>Filtrar</Text>
                    </Button>
                </Header>
                <Content
                    padder
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                >
                    {this.showItems()}
                </Content>
                {/* <Footer
                    style={[
                        styles.center,
                        { backgroundColor: "transparent" },
                        { borderTopWidth: 0.5, borderTopColor: "lightgray", elevation: 0.3 },
                        // { borderBottomWidth: 0.5, borderBottomColor: "lightgray" }
                    ]}
                >
                    {/* <Button transparent style={styles.center} small
                        onPress={() => this.setState({ showOrdenar: true })}
                    >
                        <Icon name="qr-scanner" style={{ color: "#000" }} />
                        <Text>Leitor</Text>
                    </Button>
                </Footer> */}
                <ListarFiltro
                    key="LISTAR_FILTRO"
                    show={this.state.showFilter}
                    setShow={() => this.setState({ showFilter: !this.state.showFilter })}
                    payload={this.state.payload}
                    getPayload={() => { return this.state.payload }}
                    setPayload={(payloadChanged) => this.changeDates(payloadChanged)}
                />
                {/* <ListarOrdenar
                    key="LISTAR_ORDENAR"
                    show={this.state.showOrdenar}
                    setShow={() => this.setState({ showOrdenar: !this.state.showOrdenar })}
                    payload={this.state.payload}
                    setPayload={(radio) => this.changeOrder(radio)}
                >
                </ListarOrdenar>
                <Fab
                    key="LISTAR_FAB"
                    active
                    onPress={this.showFilter}
                >
                    <Icon name="funnel" />
                </Fab> */}
            </Background>
        );
    }
}

const listaStyle = StyleSheet.create({
    diaHeader: {
        fontSize: 20
    },
    razaoSocial: {
        fontSize: 15
    }
})

const mapStateToProps = state => {
    return {
        last: state.ListarNotasReducer.repos?.lastPayload,
        notas: state.ListarNotasReducer.repos?.lista?.lista,
        leitor: state.leitorReducer.repos,
        dataFim: state.ListarNotasReducer.repos?.lista?.dataMinima,
        ultimo: state.ListarNotasReducer.repos?.lista?.ultimo
    };
};

const mapDispatchToProps = {
    listarNotasRepos,
    notaFavoritarRepos,
    ordernarNotasRepos,
    listarNotasReset,
    listarNotasSelecionar,
    itensNotasRepos,
    carregarNotasRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Listar);