import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
//  Redux
import { connect } from "react-redux";
import { deletarNotaRepos } from "../../../redux/reducers/nota/notaDeletarReducer";
import { copiarClipboard } from "../../../redux/reducers/globalReducer";
import { ModalView } from "../../../components/modal";
import { Itens } from "./itens.notas";
import { Pagamento } from "./pagamento.notas";
import { Emissor } from "./emissor.notas";
import Background from "../../../components/backgroud";
import moment from "moment/min/moment-with-locales";

const lerProps = (props) => {
    // var id = props.route.params.hasOwnProperty("chaveAcesso") ? props.route.params.chaveAcesso : null;
    return {
        // data: id != null ? props.getByChaveAcesso(id) : null,
        data: props.notaSelecionada,
        chaveAcesso: props.notaSelecionada.chaveAcesso,
        sair: false,
        confirmarDeletar: false
    }
}

class Detalhes extends Component {
    constructor(props) {
        super(props)
        this.state = lerProps(this.props);
    }
    // componentDidUpdate() {
    //     // console.log("componentDidUpdate", new Date(), this.state.sair);

    //     if (this.props.notaSelecionada.data?.chaveAcesso !== this.props.route.params.chaveAcesso) {
    //         // console.log("Carregando...");

    //         this.setState(lerProps(this.props))
    //     }
    // }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.data !== state.data) {
    //         return lerProps(props)
    //     } else {
    //         return {
    //             forcar: false
    //         }
    //     }
    // }
    _deletarNota = () => {
        // this.props.deletarNotaRepos(this.state.data.id)
        this.props.deletarNotaRepos(this.props.notaSelecionada?.id)
            .then(() => {
                this._exit();
            });
    }
    _exit = () => {
        // this.setState({ data: null, id: null, sair: true },
        this.props.navigation.goBack()
        // )
    }
    _mostrarMais = () => {
        ActionSheet.show({
            options: [
                { text: "Deletar", icon: "trash", iconColor: "red" },
                { text: "Cancelar", icon: "close", iconColor: "green" }
            ],
            cancelButtonIndex: 1,
            destructiveButtonIndex: 0,
            title: "Opções"
        }, index => {
            console.log("ActionSheet", index);
            switch (index) {
                case 0:
                    this.setState({ confirmarDeletar: true })
                    break;
                default:
                    break;
            }
        })
    }
    render() {

        console.log("DATA = ", this.props.notaSelecionada?.id);


        // console.log("RENDER", this.state);

        return (
            <Background
                backgroundColor={"#FFF"}
            >
                <Header
                    noShadow
                    hasTabs
                    // noLeft={true}
                    // transparent
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
                        <Title style={{ color: "#000" }}>Detalhes</Title>
                    </Body>
                    {/* <Button
                        primary
                        transparent
                        onPress={() => this.props.copiarClipboard(this.props.notaSelecionada.chaveAcesso)}
                    >
                        <Icon name="link" />
                    </Button> */}
                    <Button transparent
                        onPress={this._mostrarMais}
                    >
                        <Icon name="more" style={{ color: "#000" }} />
                    </Button>
                </Header>
                <Tabs
                    initialPage={0}
                    tabBarUnderlineStyle={{ backgroundColor: pallet[0] }}
                // renderTabBar={() => <ScrollableTab />}
                >
                    <Tab
                        heading={
                            <TabHeading style={[styles.center, { backgroundColor: "#FFF" }]}>
                                <Text style={{ color: "#000" }}>Itens</Text>
                            </TabHeading>
                        }
                    >
                        <Itens data={this.props.notaSelecionada?.items} />
                    </Tab>
                    <Tab
                        heading={<TabHeading style={{ backgroundColor: "#FFF" }} ><Text style={{ color: "#000" }}>Pagamento</Text></TabHeading>}
                    >
                        <Pagamento data={this.props.notaSelecionada?.pagamento} />
                    </Tab>
                    <Tab
                        heading={<TabHeading style={{ backgroundColor: "#FFF" }} ><Text style={{ color: "#000" }}>Emissor</Text></TabHeading>}
                    >
                        <Emissor data={this.props.notaSelecionada?.emissor} />
                    </Tab>
                    {/* <Tab
                        heading={<TabHeading style={{ backgroundColor: "#FFF" }} ><Text style={{ color: "#000" }}>Info</Text></TabHeading>}
                    >
                        <Text>{moment(this.props.notaSelecionada.emissao).format("LLL")}</Text>
                    </Tab> */}
                </Tabs>
                <ModalView
                    key="1"
                    show={this.state.confirmarDeletar}
                    title={"Deletar Nota"}
                    center
                    centerContent
                    showCancel
                    // icon={<Icon name='document' />}
                    width={"80%"}
                    height={"30%"}
                    onConfirm={() => this._deletarNota()}
                    onCancel={() => this.setState({ confirmarDeletar: false })}
                >
                    <View style={styles.center}>
                        <Text>Realmente deseja deletar a nota?</Text>
                    </View>
                </ModalView>
                {/* </Content> */}
            </Background>
        )
    }
}

const mapStateToProps = state => {
    return {
        getByChaveAcesso: (chaveAcesso) => {
            // console.log("getByChaveAcesso", chaveAcesso);

            return state.ListarNotasReducer.repos?.objeto.dados.filter(x => x.chaveAcesso == chaveAcesso)[0]
        },
        notaSelecionada: state.ListarNotasReducer.repos.selecionado
    };
};

const mapDispatchToProps = {
    deletarNotaRepos,
    copiarClipboard
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);