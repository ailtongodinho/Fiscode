import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Body, Card, CardItem, Badge, Right, Footer, View, Content, Container, FooterTab, Title, Header, Left, DatePicker, Grid, Row, Col, Input, SwipeRow, Thumbnail } from "native-base";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import { money } from "../../../components/mask";
import { listaVazia } from "../../../components/listaVazia";
import { Image } from "react-native";
import { GetThumbnailProduto, getThumbnailProduto } from "../../../components/imagemProduto";

export class Itens extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        const itens = this.props.data;
        // console.log(itens);

        if (itens == null) {
            return listaVazia('Sem Items')
        }

        return (
            <Content
                padder
            >
                {itens.map(item => {
                    var key = item.id + "_" + item.nome + "_" + item.quantidade + "_" + item.unidade + "_" + item.codigo;
                    var ean = parseInt(item.ean);
                    return (
                        <Card
                            key={key + "_CARD"}
                            noShadow
                        >
                            <CardItem bordered
                                key={key + "_CARD_HEADER"}
                            >
                                <GetThumbnailProduto ean={item.ean} large />
                                <Left>
                                    <Body>
                                        <Text>{item.nome}</Text>
                                        <Text note>{!isNaN(ean) ? ean : "N/D"}</Text>
                                    </Body>
                                    <Button small rounded>
                                        <Text>{money(item.valorTotal.toString()).masked}</Text>
                                    </Button>
                                </Left>
                                {/* <Right>
                                </Right> */}
                            </CardItem>
                            <CardItem bordered
                                key={key + "_CARD_BODY"}
                            >
                                <Body>
                                    <Grid>
                                        <Col styles={[styles.center]}>
                                            <Text note>Unidade</Text>
                                            <Text>{item.unidade}</Text>
                                        </Col>
                                        <Col styles={[styles.center]}>
                                            <Text note>Quantidade</Text>
                                            <Text>{item.quantidade}</Text>
                                        </Col>
                                        <Col styles={[styles.center]}>
                                            <Text note>Valor Unitario</Text>
                                            <Text>{money(item.valorUnitario.toString()).masked}</Text>
                                        </Col>
                                    </Grid>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })}
            </Content>
        )
    }
}