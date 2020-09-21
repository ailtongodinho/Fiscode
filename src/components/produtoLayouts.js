import React from "react";
import { ListItem, View, Body, Button, Text, Icon, Card, CardItem, Left } from "native-base";

import { money } from "./mask";
import { DateTime } from "../helpers/datetime";
import { appsettings } from "../appsettings";
import { styles } from "../styles/layouts/layouts.styles";
import { GetThumbnailProduto } from "./imagemProduto";
import { TouchableOpacity } from "react-native";

export const criarProdutoPesquisa = (item, selecionado, funcaoSelecionar) => {

    // console.log("ITEMMMMMMMM", item);

    const key = item.id.toString();
    const produto = {
        id: item.id,
        customizado: appsettings.produto.customizado.id == item.id,
        nome: item.apelido ?? item.nome,
        valorUnitario: money(item.saldo?.valorUnitario).masked,
        dataSaldos: item.dataSaldos != null ? DateTime.formatDate(new Date(item.dataSaldos), 'dd/MM/yyyy') + " | " : "",
        unidade: item.unidade,
        selecionar: funcaoSelecionar != null ? () => funcaoSelecionar(item) : () => console.log("Selecionado"),
        ean: item.ean
    }
    return (
        // <ListItem key={key + "_LISTITEM"}
        //     style={{ backgroundColor: "transparent" }}
        //     onPress={produto.selecionar}
        // >
        //     <View style={{ padding: 0, margin: 0, backgroundColor: "transparent" }}>
        //         <Icon name={selecionado ? "radio-button-on" : "radio-button-off"} style={{ color: "gray", fontSize: 15 }} />
        //     </View>
        //     <Body style={[{ backgroundColor: "transparent" }]}>
        //         <Text note>{produto.dataSaldos}{produto.valorUnitario}</Text>
        //         <Text uppercase={true} >{produto.nome}</Text>
        //     </Body>
        //     <View style={[styles.center]}>
        //         <Button small vertical style={[styles.startRadius, styles.endRadius]}>
        //             <Text>{produto.unidade}</Text>
        //         </Button>
        //     </View>
        // </ListItem>
        <Card key={key + "_CARD"}>
            <TouchableOpacity key={key + "_Touchable"} onPress={produto.selecionar}>
                <CardItem key={key + "_CardItem"} onPress>
                    <Left key={key + "_Left"} style={[styles.center]}>
                        <GetThumbnailProduto key={key + "_Thumbnail"} ean={produto.ean} large />
                        <Body key={key + "_Body"}>
                            <Text note>{produto.dataSaldos}{produto.valorUnitario}</Text>
                            <Text uppercase={true} >{produto.nome}</Text>
                        </Body>
                        <Icon key={key + "_Icon"} name={selecionado ? "radio-button-on" : "radio-button-off"} style={{ color: "gray", fontSize: 15 }} />
                    </Left>
                </CardItem>
            </TouchableOpacity>
        </Card>
    )
}