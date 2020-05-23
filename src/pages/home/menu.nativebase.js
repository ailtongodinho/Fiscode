import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Title, ListItem, Text, Left, Right, Body, Icon, Content, Header, Button, Card, CardItem } from "native-base";
import Background from "../../components/backgroud";
import { styles } from "../../styles/layouts/layouts.styles";

export class Menu extends Component {
    render() {
        return (
            <Background
                backgroundColor={"#FFF"}
            >
                <Header
                    noShadow
                    style={[styles.center, styles.headerContainer]}
                >
                    <Title style={styles.headerTitle}>Menu</Title>
                </Header>
                <Content
                    padder
                >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Listar')}>
                        <Card>
                            <CardItem>
                                <Icon active name="list-box" />
                                <Body style={[{ backgroundColor: 'transparent', padding: 10 }]}>
                                    <Text>Minhas notas</Text>
                                    <Text note>Suas notas estão aqui!</Text>
                                </Body>
                                <Right style={{ flex: 0 }}>
                                    <Icon name="arrow-forward" style={{ color: "#000" }} />
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ListarCompras')}>
                        <Card>
                            <CardItem>
                                <Icon active name="basket" />
                                <Body style={[{ backgroundColor: 'transparent', padding: 10 }]}>
                                    <Text>Lista de Compras</Text>
                                    <Text note>Monte sua lista de compras e confira preços!</Text>
                                </Body>
                                <Right style={{ flex: 0 }}>
                                    <Icon name="arrow-forward" style={{ color: "#000" }} />
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ListarEmissores')}>
                        <Card>
                            <CardItem>
                                <Icon active name="business" />
                                <Body style={[{ backgroundColor: 'transparent', padding: 10 }]}>
                                    <Text>Estabelecimentos</Text>
                                    <Text note>As lojas que você realizou compras!</Text>
                                </Body>
                                <Right style={{ flex: 0 }}>
                                    <Icon name="arrow-forward" style={{ color: "#000" }} />
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                </Content>
            </Background>
        )
    }
}