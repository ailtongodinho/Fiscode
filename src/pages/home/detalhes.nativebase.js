import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, Tabs, ScrollableTab, Tab, TabHeading, ActionSheet } from "native-base";
import { styles, pallet } from "../../styles/layouts/layouts.styles";
//  Redux
import { connect } from "react-redux";
import { deletarNotaRepos } from "../../redux/reducers/nota/notaDeletarReducer";
import { ModalView } from "../../components/modal";
import { Itens } from "./itens.nativebase";
import { Pagamento } from "./pagamento.nativebase";
import { Emissor } from "./emissor.nativebase";
import Background from "../../components/backgroud";

const lerProps = (props) => {
    var id = props.route.params.hasOwnProperty("chaveAcesso") ? props.route.params.chaveAcesso : null;
    return {
        data: id != null ? props.getByChaveAcesso(id) : null,
        chaveAcesso: id,
        sair: false,
        confirmarDeletar: false
    }
}

class Detalhes extends Component {
    constructor(props) {
        super(props)
        this.state = lerProps(this.props);
    }
    componentDidUpdate() {
        console.log("componentDidUpdate", new Date(), this.state.sair);

        if (this.state.data?.chaveAcesso !== this.props.route.params.chaveAcesso) {
            console.log("Carregando...");
            
            this.setState(lerProps(this.props))
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.data !== state.data) {
    //         return lerProps(props)
    //     } else {
    //         return {
    //             forcar: false
    //         }
    //     }
    // }
    _deletarNota = (idNota) => {
        this.props.deletarNotaRepos(idNota)
            .then(() => {
                this.props?.closeModal();
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
                                {/* <Button badge transparent> */}
                                    <Text style={{ color: "#000" }}>Itens</Text>
                                    {/* <Right>
                                        <Badge primary><Text>{this.state.data?.items.length}</Text></Badge>
                                    </Right> */}
                                {/* </Button> */}
                            </TabHeading>
                        }
                    >
                        <Itens data={this.state.data?.items} />
                    </Tab>
                    <Tab
                        heading={<TabHeading style={{ backgroundColor: "#FFF" }} ><Text style={{ color: "#000" }}>Pagamento</Text></TabHeading>}
                    >
                        <Pagamento data={this.state.data?.pagamento} />
                    </Tab>
                    <Tab
                        heading={<TabHeading style={{ backgroundColor: "#FFF" }} ><Text style={{ color: "#000" }}>Emissor</Text></TabHeading>}
                    >
                        <Emissor data={this.state.data?.emissor} />
                    </Tab>
                    {/* <Tab
                        heading={<TabHeading style={{ backgroundColor: "#FFF" }} ><Text style={{ color: "#000" }}>Detalhes</Text></TabHeading>}
                    >
                        <Button danger onPress={() => this.setState({ confirmarDeletar: true })}>
                            <Text>Deletar</Text>
                        </Button>
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
                    onConfirm={() => this._deletarNota(this.state.id)}
                    onCancel={() => this.setState({ confirmarDeletar: false })}
                >
                    <View style={styles.center}>
                        <Text>Realmente deseja deletar a nota {this.state.id}?</Text>
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
            console.log("getByChaveAcesso", chaveAcesso);

            return state.ListarNotasReducer.repos?.objeto.dados.filter(x => x.chaveAcesso == chaveAcesso)[0]
        }
    };
};

const mapDispatchToProps = {
    deletarNotaRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes);