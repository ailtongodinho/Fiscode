import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, SwipeRow, H1, H2, H3 } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import { maskCpfCnpj } from "../../../components/mask";
import { StyleSheet, Linking } from "react-native"
import { listaVazia } from "../../../components/listaVazia";

export class Emissor extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        const emissor = this.props.data;
        // console.log("Emissor", emissor);

        if (emissor == null) {
            return listaVazia('Sem Dados')
        }

        const link = "https://maps.google.com/?q="
            + "%20" + emissor.logradouro.replace(" ", "%20")
            + "%20," + emissor.numero.toString()
            + "%20," + emissor.municipio.replace(" ", "%20")
            + "%20," + emissor.uf.replace(" ", "%20")

        console.log("LINK", link);


        var key = "EMISSOR_" + emissor.id;
        return (
            <Content
                padder
            >
                {/* <Card transparent style={{}}>
                    <CardItem bordered style={[styles.center, { backgroundColor: "transparent" }]}>
                        <Text>{emissor.razaoSocial}</Text>
                    </CardItem>
                </Card> */}
                <List>
                    <ListItem>
                        <Left>
                            <Button transparent icon>
                                <Icon name="briefcase" style={[emissorStyle.icon]} />
                            </Button>
                            <Body>
                                <Text note>Nome Fantasia</Text>
                                <Text>{emissor.nomeFantasia}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Button transparent icon>
                                <Icon name="briefcase" style={[emissorStyle.icon]} />
                            </Button>
                            <Body>
                                <Text note>Razão Social</Text>
                                <Text>{emissor.razaoSocial}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Button transparent icon>
                                <Icon name="document" style={[emissorStyle.icon]} />
                            </Button>
                            <Body>
                                <Text note>CNPJ</Text>
                                <Text>{maskCpfCnpj(emissor.cnpj).masked}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                    <ListItem itemHeader>
                        <Left>
                            <Text>Endereço</Text>
                            <Right>
                                <Button transparent bordered small
                                    onPress={() => Linking.openURL(link)}
                                >
                                    {/* <Icon name="link" style={[emissorStyle.icon]} /> */}
                                    <Text note>Maps</Text>
                                </Button>
                            </Right>
                        </Left>
                        {/* <Right style={{ backgroundColor: "#CCC" }}>
                        </Right> */}
                    </ListItem>
                    <ListItem>
                        <Left>
                            {/* <Button transparent icon>
                                <Icon name="document" style={[emissorStyle.icon]} />
                            </Button> */}
                            <Body>
                                <Text note>Logradouro</Text>
                                <Text>{emissor.logradouro}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                    <ListItem>
                        <Left>
                            {/* <Button transparent icon>
                                <Icon name="document" style={[emissorStyle.icon]} />
                            </Button> */}
                            <Body>
                                <Text note>Numero</Text>
                                <Text>{emissor.numero}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Body>
                                <Text note>Distrito</Text>
                                <Text>{emissor.distrito}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                    <ListItem>
                        <Left>
                            {/* <Button transparent icon>
                                <Icon name="document" style={[emissorStyle.icon]} />
                            </Button> */}
                            <Body>
                                <Text note>Municipio</Text>
                                <Text>{emissor.municipio}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Body>
                                <Text note>UF</Text>
                                <Text>{emissor.uf}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Body>
                                <Text note>CEP</Text>
                                <Text>{emissor.cep}</Text>
                            </Body>
                        </Left>
                    </ListItem>
                </List>
            </Content>
        )
    }
}

const emissorStyle = StyleSheet.create({
    icon: {
        color: "black"
    }
})