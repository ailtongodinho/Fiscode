import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, SwipeRow, Radio, Fab, Picker, H1, H2, Segment } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import { DateTime } from "../../../helpers/datetime";
import { money } from "../../../components/mask";
import { ExtracaoPayload } from "../../../models/payloads/ExtracaoPayload";
import Background from "../../../components/backgroud";
import { listaVazia } from "../../../components/listaVazia";
//  Redux
import { connect } from "react-redux";
import { listarNotasRepos } from "../../../redux/reducers/nota/notaListarReducer";
import { emissorAgregadoRepos } from "../../../redux/reducers/emissor/agregado.emissorReducer";
import { emissorAgregadoPayload } from "../../../models/api/emissorAgregadoModel";

const diasPesquisa = [
    { label: "15", value: 15, first: true },
    { label: "30", value: 30 },
    { label: "60", value: 60 },
    { label: "90", value: 90 },
    { label: "Todos", value: 365 * 5, last: true }
]

class ListarEmissores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notas: null,
            payload: new emissorAgregadoPayload(new Date(2020, 1, 1), new Date()),
            segmentActive: diasPesquisa[diasPesquisa.length - 1].value,
            showOrdenar: false,
            selected: null
        }
    }
    componentDidMount() {
        if (this.props.emissores == null) {
            this.changeDates(this.state.segmentActive)
        }
    }
    componentWillUnmount() {

    }
    pesquisar() {
        console.log("pesquisar", this.state.payload);

        var payload = new emissorAgregadoPayload();
        payload.dataInicial = new Date(DateTime.formatDate(this.state.payload.dataInicial, "yyyy-MM-dd"))
        payload.dataFinal = new Date(DateTime.formatDate(this.state.payload.dataFinal, "yyyy-MM-dd") + "T23:59:59")

        this.props.emissorAgregadoRepos(payload);
    }
    showHeader = (show) => {
        this.setState({ showHeader: show })
    }

    showFilter = () => {
        this.setState({ showFilter: true })
    }
    changeDates = (item) => {
        this.setState({
            segmentActive: item,
            payload: { ...this.state.payload, dataInicial: DateTime.subtract(new Date(Date.now()), Number(item)) }
        }, this.pesquisar)
    }
    changeOrder = (radio) => {

    }
    selectItem = (idEmissor) => {
        console.log("selectItem", idEmissor);

        var payload = new ExtracaoPayload();
        payload.idEmissor = idEmissor;
        this.props.listarNotasRepos(payload)
            .then(() => {
                this.props.navigation.navigate('Listar', { idEmissor })
            })
        // )
    }
    showItems = () => {
        var obj = []

        if (this.props.emissores != null && this.props.emissores != undefined && this.props.emissores.length != 0) {
            this.props.emissores.map(item => {
                const key = item.cnpj + "_" + item.numero
                obj.push(
                    // <TouchableOpacity
                    //     key={key + "_TouchableOpacity"}
                    //     onPress={() => this.selectItem(item.id)}
                    // >
                    <Card
                        // noShadow
                        key={key + "_CARD"}
                    >
                        <CardItem bordered
                            key={key + "_HEADER"}
                        >
                            <Left>
                                <Body>
                                    <Text>{item.razaoSocial}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem
                            key={key + "_TROCO"}
                        >
                            <Grid>
                                <Col>
                                    <Left>
                                        <Body style={[styles.center]}>
                                            <Button small transparent>
                                                <Text>Troco</Text>
                                            </Button>
                                            <Button small warning style={[styles.startRadius, styles.endRadius]}>
                                                <Text>{money(item.somatoriaTroco).masked}</Text>
                                            </Button>
                                        </Body>
                                    </Left>
                                </Col>
                                <Col>
                                    <Left>
                                        <Body style={[styles.center]}>
                                            <Button small transparent>
                                                <Text>Tributos</Text>
                                            </Button>
                                            <Button small transparent bordered style={[styles.startRadius, styles.endRadius]}>
                                                <Text>{money(item.somatoriaTributos).masked}</Text>
                                            </Button>
                                            {/* <Button small danger style={[styles.endRadius]}>
                                                    <Text>{((item.somatoriaTributos * 100) / item.somatoriaTotal).toFixed(2)} %</Text>
                                                </Button> */}
                                        </Body>
                                    </Left>
                                </Col>
                                <Col>
                                    <Left>
                                        <Body style={[styles.center]}>
                                            <Button small transparent>
                                                <Text>Itens</Text>
                                            </Button>
                                            <Button small style={[styles.startRadius, styles.endRadius]}>
                                                <Text>{item.quantidade}</Text>
                                            </Button>
                                        </Body>
                                    </Left>
                                </Col>
                            </Grid>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Button style={[styles.startRadius, styles.center]}>
                                        <Text style={{ borderRightWidth: 1, borderColor: "white" }}>Total</Text>
                                        <Text>{money(item.somatoriaTotal).masked}</Text>
                                    </Button>
                                </Body>
                                <Button style={[styles.endRadius]} info onPress={() => this.selectItem(item.id)}>
                                    <Icon name="list-box" />
                                    <Text>Notas</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                    // </TouchableOpacity>
                )
            })
        }
        else {
            obj.push(listaVazia('Não há dados para esse período'))
        }

        return obj;
    }
    render() {
        // console.log("ListarEmissores", this.props.emissores);

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
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-back" style={{ color: "#000" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={[{ color: 'black', fontWeight: "bold" }]}>Estabelecimentos</Title>
                    </Body>
                </Header>
                <Content
                    padder
                >
                    {this.showItems()}
                </Content>
                {/* <Footer
                    style={[
                        styles.center,
                        // { backgroundColor: "transparent" },
                        { borderTopWidth: 0.5, borderTopColor: "lightgray", elevation: 0.3 },
                        // { borderBottomWidth: 0.5, borderBottomColor: "lightgray" }
                    ]}
                >
                    <Segment
                    // style={[{ padding: 10 }]}
                    >
                        {diasPesquisa.map(item => <Button first={item.first ?? false} last={item.last ?? false} key={"SEGMENT_" + item.label} active={this.state.segmentActive == item.value} onPress={() => this.changeDates(item.value)}><Text>{item.label}</Text></Button>)}
                    </Segment>
                </Footer> */}
            </Background>
        );
    }
}


const mapStateToProps = state => {
    return {
        emissores: state.emissorAgregadoReducer.repos
    };
};

const mapDispatchToProps = {
    emissorAgregadoRepos,
    listarNotasRepos
};

const listarEmissresStyle = StyleSheet.create({
    button: {

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListarEmissores);