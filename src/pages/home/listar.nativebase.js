import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, SwipeRow, Radio, Fab, Picker } from "native-base";
import { TextInputMask } from 'react-native-masked-text'
import ListarOrdenar from "./listar.ordenar.nativebase";
import { ListarFiltro } from "./listar.filtro.nativebase";
import { listaVazia } from "../../components/listaVazia";
import { money } from "../../components/mask";
import { ExtracaoPayload } from "../../models/payloads/ExtracaoPayload";
import { styles, pallet } from "../../styles/layouts/layouts.styles";
import { DateTime } from "../../helpers/datetime";
import { TouchableOpacity } from "react-native";
import Background from "../../components/backgroud";
//  Redux
import { connect } from "react-redux";
import { listarNotasReset, listarNotasRepos, ordernarNotasRepos } from "../../redux/reducers/nota/notaListarReducer";
import { notaFavoritarRepos } from "../../redux/reducers/nota/notaFavoritarReducer";


class Listar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notas: null,
            payload: new ExtracaoPayload(new Date(2020, 1, 1), new Date()),
            showFilter: false,
            showOrdenar: false,
            selected: null
        }
    }
    componentDidMount() {
        if (this.props.notas.dados == null) {
            this.pesquisar()
        }
    }
    componentWillUnmount() {
        this.props.listarNotasReset();
    }
    pesquisar() {
        console.log("pesquisar", extracaoPayload);
        var extracaoPayload = new ExtracaoPayload();
        extracaoPayload.dataInicio = this.state.payload.dataInicio != null ? new Date(DateTime.formatDate(this.state.payload.dataInicio, "yyyy-MM-dd")) : null;
        extracaoPayload.dataFim = this.state.payload.dataFim != null ? new Date(DateTime.formatDate(this.state.payload.dataFim, "yyyy-MM-dd") + "T23:59:59") : null;
        extracaoPayload.favorito = !this.state.payload.favorito ? null : true;
        extracaoPayload.ordenarId = this.state.payload.ordenarId;
        extracaoPayload.idEmissor = this.state.payload.idEmissor;

        this.props.listarNotasRepos(extracaoPayload);
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
        console.log("changeDates", payload, this.state.payload);
        this.setState({ payload: { ...this.state.payload, ...payload }, showFilter: !this.state.showFilter }, this.pesquisar)
    }
    changeOrder = (radio) => {
        console.log("changeOrder", radio);
        this.setState({ payload: { ...this.state.payload, ordenarId: radio }, showOrdenar: !this.state.showOrdenar }, () => this.props.ordernarNotasRepos(this.state.payload.ordenarId))
    }
    selectItem = (chaveAcesso) => {
        this.props.navigation.navigate('Detalhes', { chaveAcesso })
    }
    showItems = () => {
        var obj = []

        if (this.props.notas.dados != null && this.props.notas.dados.length != 0) {
            this.props.notas.dados.map(item => {
                // console.log("EMISSOR", item.emissor.id);

                obj.push(
                    <TouchableOpacity
                        key={item.chaveAcesso}
                        onPress={() => this.selectItem(item.chaveAcesso)}
                    >
                        <Card
                            style={[{
                                borderRadius: 10,
                            }]}
                            key={item.chaveAcesso + item.id + "_CARD"}
                        >
                            <CardItem
                                style={{ borderRadius: 10 }}
                                key={item.chaveAcesso + item.id + "_ITEM"}
                            >
                                <Grid
                                    key={item.chaveAcesso + item.id + "_GRID"}
                                >
                                    <Col key={item.chaveAcesso + item.id + "_COL_1"} size={95} style={[{ borderRightWidth: 1, borderRightColor: '#CCC' }]} >
                                        <Row style={[styles.center, { padding: 5 }]}>
                                            <Grid>
                                                <Row>
                                                    <Text>{item.emissor?.razaoSocial}</Text>
                                                </Row>
                                            </Grid>
                                        </Row>
                                        <Row style={[{ padding: 0 }]}>
                                            <Col
                                                key={item.chaveAcesso + item.id + "_COL_1_1"}
                                            // style={styles.center} 
                                            >
                                                <Text note>Total</Text>
                                                <Text
                                                    style={[{ padding: 0, fontWeight: "bold", color: 'black' }]}
                                                >{money(item.valorTotal).masked}</Text>
                                            </Col>
                                            <Col
                                                key={item.chaveAcesso + item.id + "_COL_1_2"}
                                                size={2}
                                            // style={styles.center}
                                            >
                                                <Text note>Data</Text>
                                                {/* <Text>{DateTime.formatDate(new Date(item.emissao), "dd/MM/yyyy HH:m:s")}</Text> */}
                                                <TextInputMask
                                                    style={[{ padding: 0, color: 'black' }]}
                                                    type={"datetime"}
                                                    options={{
                                                        format: "DD.MM.YYYY HH:mm:ss"
                                                    }}
                                                    value={DateTime.formatDate(new Date(item.emissao), "dd-MM-yyyy HH:m:s")}
                                                    editable={false}
                                                />
                                            </Col>
                                            <Col
                                                key={item.chaveAcesso + item.id + "_COL_1_3"}
                                            // style={styles.center}
                                            >
                                                <Text note>Itens:</Text>
                                                <Text>{item.items.length}</Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col size={15} style={[styles.center]}
                                        key={item.chaveAcesso + item.id + "_COL_2"}
                                    >
                                        <Button onPress={() => this.favoritar(item.id)} iconLeft success={item.status == 0} error={item.status == 1} transparent>
                                            <Icon
                                                name={item.favorito ? 'md-star' : 'md-star-outline'} style={[{ color: 'green' }]}
                                            />
                                        </Button>
                                        <Button iconLeft success={item.status == 1} error={item.status == 0} transparent>
                                            <Icon name={item.status == 1 ? 'ios-checkmark-circle-outline' : 'md-hourglass'} />
                                        </Button>
                                    </Col>
                                </Grid>
                            </CardItem>
                        </Card>

                    </TouchableOpacity>
                )
            })
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
                </Header>
                <Content
                    padder
                >
                    {this.showItems()}
                </Content>
                <Footer
                    style={[
                        styles.center,
                        { backgroundColor: "transparent" },
                        { borderTopWidth: 0.5, borderTopColor: "lightgray", elevation: 0.3 },
                        // { borderBottomWidth: 0.5, borderBottomColor: "lightgray" }
                    ]}
                >
                    <Button transparent style={styles.center} small
                        onPress={() => this.setState({ showOrdenar: true })}
                    >
                        <Icon name="reorder" style={{ color: "#000" }} />
                        <Text>Ordernar</Text>
                    </Button>
                </Footer>
                <ListarFiltro
                    key="LISTAR_FILTRO"
                    show={this.state.showFilter}
                    setShow={() => this.setState({ showFilter: !this.state.showFilter })}
                    payload={this.state.payload}
                    setPayload={(payloadChanged) => this.changeDates(payloadChanged)}
                />
                <ListarOrdenar
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
                </Fab>
            </Background>
        );
    }
}


const mapStateToProps = state => {
    return {
        last: state.ListarNotasReducer.repos?.lastPayload,
        notas: state.ListarNotasReducer.repos?.objeto,
        leitor: state.leitorReducer.repos,
    };
};

const mapDispatchToProps = {
    listarNotasRepos,
    notaFavoritarRepos,
    ordernarNotasRepos,
    listarNotasReset
};

export default connect(mapStateToProps, mapDispatchToProps)(Listar);