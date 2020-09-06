import React from "react";
import { ListItem, View, Body, Button, Text, Icon } from "native-base";

import { money } from "./mask";
import { DateTime } from "../helpers/datetime";
import { appsettings } from "../appsettings";
import { styles } from "../styles/layouts/layouts.styles";

export const criarProdutoPesquisa = (item, selecionado, funcaoSelecionar) => {

    console.log("ITEMMMMMMMM", item);

    const key = item.id.toString();
    const produto = {
        id: item.id,
        customizado: appsettings.produto.customizado.id == item.id,
        nome: item.apelido ?? item.nome,
        valorUnitario: money(item.saldo?.valorUnitario).masked,
        dataSaldos: item.dataSaldos != null ? DateTime.formatDate(new Date(item.dataSaldos), 'dd/MM/yyyy') + " | " : "",
        unidade: item.unidade,
        selecionar: funcaoSelecionar != null ? () => funcaoSelecionar(item) : () => console.log("Selecionado")
    }
    return (
        <ListItem key={key + "_LISTITEM"}
            style={{ backgroundColor: "transparent" }}
            onPress={produto.selecionar}
        >
            <View style={{ padding: 0, margin: 0, backgroundColor: "transparent" }}>
                <Icon name={selecionado ? "radio-button-on" : "radio-button-off"} style={{ color: "gray", fontSize: 15 }} />
            </View>
            <Body style={[{ backgroundColor: "transparent" }]}>
                <Text note>{produto.dataSaldos}{produto.valorUnitario}</Text>
                <Text uppercase={true} >{produto.nome}</Text>
            </Body>
            <View style={[styles.center]}>
                <Button small vertical style={[styles.startRadius, styles.endRadius]}>
                    <Text>{produto.unidade}</Text>
                </Button>
            </View>
        </ListItem>
    )
}