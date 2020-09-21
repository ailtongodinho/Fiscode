import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, SwipeRow, Radio, Fab, Picker, H1, H2, Segment, Accordion } from "native-base";
import { TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { ModalView } from "../../../components/modal";

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
            selected: null,
            refreshing: false,
            showModal: false
        }
    }
    componentDidMount() {
        if (this.props.emissores == null) {
            this.changeDates(this.state.segmentActive)
        }
    }
    componentWillUnmount() {

    }
    onRefresh = () => {
        this.setState(
            { refreshing: !this.state.refreshing },
            this.changeDates(this.state.segmentActive)
        );
        setTimeout(() => this.setState({ refreshing: !this.state.refreshing }), 2000);
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
            // this.props.emissores.map(_uf => {
            // obj.push(
            //     <Card transparent
            //         // style={[{ borderLeftWidth: 1, borderLeftColor: '#000' }]}
            //         key={key + "_CARD_HEADER"}
            //     >
            //         <CardItem
            //             key={key + "_CARD_HEADER_ITEM"}
            //         >
            //             <Left>
            //                 <Body>
            //                     <Text uppercase>{_uf.uf}</Text>
            //                 </Body>
            //             </Left>
            //         </CardItem>
            //     </Card>
            // )
            obj.push(
                <Accordion
                    dataArray={this.props.emissores}
                    style={[{ border: 0 }]}
                    expanded={0}
                    renderHeader={(item, expanded) => {
                        return (
                            <Card
                                style={[styles.center]}
                                noShadow
                            >
                                <CardItem>
                                    <Left>
                                        <Text>{item.uf}</Text>
                                    </Left>
                                    {expanded
                                        ? <Icon name="remove" />
                                        : <Icon name="add" />
                                    }
                                </CardItem>
                            </Card>
                        )
                    }}
                    renderContent={(_uf) => {
                        var key = _uf.uf
                        var content = []
                        _uf.dados.map(_m => {
                            key = _m.municipio
                            content.push(
                                <Card transparent
                                    // style={[{ borderLeftWidth: 1, borderLeftColor: '#000' }]}
                                    key={key + "_CARD_HEADER"}
                                    style={{ paddingHorizontal: 15 }}
                                >
                                    <CardItem
                                        key={key + "_CARD_HEADER_ITEM"}
                                    >
                                        <Left>
                                            <Body>
                                                <Text>{_m.municipio}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </Card>
                            )
                            _m.dados.map(item => {
                                key = _uf.uf + _m.municipio + item.cnpj + item.id
                                content.push(
                                    // <TouchableOpacity
                                    //     key={key + "_TouchableOpacity"}
                                    //     onPress={() => this.selectItem(item.id)}
                                    // >
                                    <Card
                                        noShadow
                                        key={key + "_CARD"}
                                    >
                                        <CardItem
                                            style={{ borderRadius: 10 }}
                                            // bordered
                                            key={key + "_HEADER"}
                                        >
                                            <Grid
                                                key={key + "_GRID"}
                                            >
                                                <Col
                                                    key={key + "_COL_1"}
                                                    size={95}
                                                    style={[{ borderRightWidth: 1, borderRightColor: '#CCC' }]}
                                                >
                                                    <Row key={key + "_ROW_1"}>
                                                        <Left>
                                                            <Body>
                                                                <ScrollView horizontal>
                                                                    <TextInput editable={false} value={(item.nomeFantasia ?? item.razaoSocial)} />
                                                                </ScrollView>
                                                            </Body>
                                                        </Left>
                                                    </Row>
                                                    <Row key={key + "_ROW_2"}>
                                                        <Left>
                                                            <ScrollView horizontal>
                                                                <Button dark transparent small vertical>
                                                                    <Text note uppercase={false}>R$</Text>
                                                                    <Text>{money(item.somatoriaTotal, { unit: "" }).masked}</Text>
                                                                </Button>
                                                                <Button dark transparent small vertical>
                                                                    <Text note uppercase={false}>Notas</Text>
                                                                    <Text>{item.quantidadeNotas}</Text>
                                                                </Button>
                                                                <Button dark transparent small vertical>
                                                                    <Text note uppercase={false}>Tributos</Text>
                                                                    <Text>{money(item.somatoriaTributos).masked}</Text>
                                                                </Button>
                                                            </ScrollView>
                                                        </Left>
                                                        {/* <Text note>{item.cnpj}</Text> */}
                                                    </Row>
                                                </Col>
                                                <Col
                                                    key={key + "_COL_2"}
                                                    size={12}
                                                    style={[styles.center]}
                                                >
                                                    <Button info onPress={() => this.selectItem(item.id)} small vertical iconLeft transparent>
                                                        <Icon name="list-box" />
                                                    </Button>
                                                </Col>
                                            </Grid>
                                        </CardItem>
                                    </Card>
                                )
                            })
                        })
                        return content;
                    }}
                />
            )
            // _uf.dados.map(_m => {
            //     key = _m.municipio
            //     obj.push(
            //         <Card transparent
            //             // style={[{ borderLeftWidth: 1, borderLeftColor: '#000' }]}
            //             key={key + "_CARD_HEADER"}
            //         // style={{ padding: 5 }}
            //         >
            //             <CardItem
            //                 key={key + "_CARD_HEADER_ITEM"}
            //             >
            //                 <Left>
            //                     <Body>
            //                         <Text>{_m.municipio}, {_uf.uf}</Text>
            //                     </Body>
            //                 </Left>
            //             </CardItem>
            //         </Card>
            //     )
            //     _m.dados.map(item => {
            //         key = _uf.uf + _m.municipio + item.cnpj + item.id
            //         obj.push(
            //             // <TouchableOpacity
            //             //     key={key + "_TouchableOpacity"}
            //             //     onPress={() => this.selectItem(item.id)}
            //             // >
            //             <Card
            //                 noShadow
            //                 key={key + "_CARD"}
            //             >
            //                 <CardItem
            //                     style={{ borderRadius: 10 }}
            //                     // bordered
            //                     key={key + "_HEADER"}
            //                 >
            //                     <Grid
            //                         key={key + "_GRID"}
            //                     >
            //                         <Col
            //                             key={key + "_COL_1"}
            //                             size={95}
            //                             style={[{ borderRightWidth: 1, borderRightColor: '#CCC' }]}
            //                         >
            //                             <Row key={key + "_ROW_1"}>
            //                                 <Left>
            //                                     <Body>
            //                                         <ScrollView horizontal>
            //                                             <TextInput editable={false} value={(item.nomeFantasia ?? item.razaoSocial)} />
            //                                         </ScrollView>
            //                                     </Body>
            //                                 </Left>
            //                             </Row>
            //                             <Row key={key + "_ROW_2"}>
            //                                 <Left>
            //                                     <Button dark transparent small vertical>
            //                                         <Text note uppercase={false}>R$</Text>
            //                                         <Text>{money(item.somatoriaTotal, { unit: "" }).masked}</Text>
            //                                     </Button>
            //                                     <Button dark transparent small vertical>
            //                                         <Text note uppercase={false}>Notas</Text>
            //                                         <Text>{item.quantidadeNotas}</Text>
            //                                     </Button>
            //                                     <Button dark transparent small vertical>
            //                                         <Text note uppercase={false}>Tributos</Text>
            //                                         <Text>{money(item.somatoriaTributos).masked}</Text>
            //                                     </Button>
            //                                 </Left>
            //                                 {/* <Text note>{item.cnpj}</Text> */}
            //                             </Row>
            //                         </Col>
            //                         <Col
            //                             key={key + "_COL_2"}
            //                             size={12}
            //                             style={[styles.center]}
            //                         >
            //                             <Button info onPress={() => this.selectItem(item.id)} small vertical iconLeft transparent>
            //                                 <Icon name="eye" />
            //                             </Button>
            //                         </Col>
            //                     </Grid>
            //                 </CardItem>
            //             </Card>
            //         )
            //     })
            // })
            // })
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
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                >

                    {this.showItems()}
                </Content>
                {/* <ModalView
                    key={"LISTAR_FILTRO_NATIVEBASE"}
                    show={this.state.showModal}
                    title={'Filtro'}
                    // icon={< Icon name='funnel' />}
                    height={"60%"}
                // onConfirm={() => this.submit()}
                // onCancel={() => { this.setState({ show: false, mudancaEstado: true }) }}
                // onCancel={this.closeModal}
                >
                    
                </ModalView> */}

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