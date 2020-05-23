import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, SwipeRow, H1, H2, H3 } from "native-base";
import { styles, pallet } from "../../styles/layouts/layouts.styles";
import { StyleSheet } from "react-native";
import { money } from "../../components/mask";
import { listaVazia } from "../../components/listaVazia";

export class Pagamento extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        const pag = this.props.data;
        console.log(pag);

        if (pag == null) {
            return listaVazia('Sem Dados')
        }

        var key = 0
        return (
            <Content
                padder
            >
                <Card transparent style={{}}>
                    <CardItem style={[styles.center, { backgroundColor: "transparent" }]}>
                        {/* <Left>
                        </Left>
                        <Body style={[styles.center, { backgroundColor: "transparent" }]}>
                            <Icon name="basket" style={{ backgroundColor: "transparent" }} />
                        </Body> */}
                        <Text note>Valor Pago</Text>
                    </CardItem>
                    <CardItem bordered style={[styles.center, { backgroundColor: "transparent" }]}>
                        <H1>{money(pag.valorPago.toString()).masked}</H1>
                    </CardItem>
                </Card>
                <Card transparent>
                    <CardItem bordered>
                        <Left style={{ flex: 0, marginRight: 30 }}>
                            <Icon name="card" style={{ backgroundColor: "transparent" }} />
                        </Left>
                        <Body style={[{ backgroundColor: "transparent" }]}>
                            <Text note>Forma de Pagamento</Text>
                            <Text>{pag.formaPagamento}</Text>
                        </Body>
                        <Right>

                        </Right>
                    </CardItem>
                </Card>
                <Grid>
                    <Col>
                        <Card>
                            <CardItem bordered>
                                <Body style={styles.center}>
                                    <Icon name="cash" />
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body style={styles.center}>
                                    <Text style={{ padding: 10 }}>Troco</Text>
                                    <H1>{money(pag.troco.toString()).masked}</H1>
                                </Body>
                            </CardItem>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardItem bordered>
                                <Body style={styles.center}>
                                    <Icon name="information-circle" />
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body style={styles.center}>
                                    <Text style={{ padding: 10 }}>Tributos</Text>
                                    <H1>{money(pag.tributosTotaisIncidentes.toString()).masked}</H1>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Body style={styles.center}>
                                    <H1>{((pag.tributosTotaisIncidentes * 100) / pag.valorPago).toFixed(2)}%</H1>
                                    <Text note>do Valor Pago</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Col>
                </Grid>
            </Content>
        )
    }
}
