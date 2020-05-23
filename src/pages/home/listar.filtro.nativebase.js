import React, { Component, useState } from "react";
import { Button, Icon, Text, DatePicker, Grid, Row, Col, Radio, List, ListItem, Switch, Left, Right, Body } from "native-base";
import { styles } from "../../styles/layouts/layouts.styles";
import { DateTime } from "../../helpers/datetime";
import { ModalView, ModalViewConst } from "../../components/modal";
import { ExtracaoPayload } from "../../models/payloads/ExtracaoPayload";

const radios = [15, 30, 90, 180]

export class ListarFiltro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            payload: this.props.payload,
            radio: radios[0],
            mudancaEstado: false
        }
    }

    // componentWillUpdate(prevProps){
    //     if(this.props.show !== prevProps.show){

    //     }
    // }

    // static getDerivedStateFromProps(props, state) {
    //     var retorno = null;

    //     if (!state.mudancaEstado) {
    //         retorno = { show: props.show, payload: props.payload }
    //     }
    //     else {
    //         retorno = { mudancaEstado: false }
    //     }

    //     return retorno;
    // }

    selectRadio = (radioKey) => {
        this.setState({ radio: radioKey }, () => this.subDate(radioKey));
    }
    subDate = (days) => {
        var subDate = DateTime.subtract(null, days);
        this.setState({ payload: { ...this.state.payload, dataInicio: subDate, dataFim: DateTime.GetDate() } })
    }
    submit = () => {
        this.props.setPayload(this.state.payload);
    }
    close = () => {
        this.props.setShow();
    }
    render() {
        return (
            <ModalView
                key={"LISTAR_FILTRO_NATIVEBASE"}
                show={this.props.show}
                title={'Filtro'}
                // icon={< Icon name='funnel' />}
                height={"60%"}
                onConfirm={() => this.submit()}
                // onCancel={() => { this.setState({ show: false, mudancaEstado: true }) }}
                onCancel={this.close}
            >
                <List>
                    <ListItem key="0">
                        <Grid>
                            <Row style={{ padding: 20 }}>
                                {radios.map(item => {
                                    return (
                                        <Col style={styles.center}>
                                            <Text>{item}</Text>
                                            <Radio key={item} selected={item == this.state.radio} onPress={() => this.selectRadio(item)} />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Grid>
                    </ListItem>
                    <ListItem key="1" itemDivider style={styles.center}>
                        <Text>OU</Text>
                    </ListItem>
                    <ListItem key="2" style={styles.center}>
                        <Grid>
                            <Row style={[styles.center, { padding: 10 }]}>
                                <Col style={styles.center}>
                                    <DatePicker
                                        key={"listar_filtro_DatePicker_1"}
                                        defaultDate={this.state.payload.dataInicio}
                                        // minimumDate={new Date(2018, 1, 1)}
                                        // maximumDate={new Date(2018, 12, 31)}
                                        locale={"pt-BR"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={true}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        formatChosenDate={() => DateTime.formatDate(this.state.payload.dataInicio, "dd/MM/yyyy")}
                                        placeHolderText={DateTime.formatDate(this.state.payload.dataInicio, "dd/MM/yyyy")}
                                        placeHolderTextStyle={{ borderWidth: 0.5, borderRadius: 5, borderColor: "#CCC" }}
                                        textStyle={{ borderWidth: 0.5, borderRadius: 5, borderColor: "#CCC" }}
                                        onDateChange={(date) => this.setState({ payload: { ...this.state.payload, dataInicio: date } })}
                                    />
                                </Col>
                                <Col style={styles.center}>
                                    <Text> Á </Text>
                                </Col>
                                <Col style={styles.center}>
                                    <DatePicker
                                        key={"listar_filtro_DatePicker_2"}
                                        defaultDate={this.state.payload.dataFim}
                                        minimumDate={this.state.payload.dataInicio}
                                        // maximumDate={new Date(2018, 12, 31)}
                                        locale={"pt-BR"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        formatChosenDate={() => DateTime.formatDate(this.state.payload.dataFim, "dd/MM/yyyy")}
                                        placeHolderText={DateTime.formatDate(this.state.payload.dataFim, "dd/MM/yyyy")}
                                        placeHolderTextStyle={{ borderWidth: 0.5, borderRadius: 5, borderColor: "#CCC" }}
                                        textStyle={{ borderWidth: 0.5, borderRadius: 5, borderColor: "#CCC" }}
                                        onDateChange={(date) => this.setState({ payload: { ...this.state.payload, dataFim: date } })}
                                        disabled={false}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Button success transparent small>
                                <Icon active name="star" />
                            </Button>
                            <Body style={styles.center}>
                                <Text>Somente Favoritos</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Switch value={this.state.payload.favorito} onValueChange={() => this.setState({ payload: { ...this.state.payload, favorito: !this.state.payload.favorito } })} />
                        </Right>
                    </ListItem>
                </List>
            </ModalView>
        )
    }
}