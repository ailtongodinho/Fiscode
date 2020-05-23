import React from "react";
import { Icon, Text, Card, CardItem } from "native-base";
import { styles } from "../styles/layouts/layouts.styles";

export const listaVazia = (texto, botaoRecarregar = null, icone = null) => {
    return (
        <Card style={[styles.center]} transparent noShadow>
            <CardItem style={[styles.center, { backgroundColor: 'transparent' }]}>
                {icone ?? <Icon name="sad" />}
                <Text style={[{ margin: 10 }]}>{texto}</Text>
            </CardItem>
            <CardItem style={[styles.center, { backgroundColor: 'transparent' }]}>
                {botaoRecarregar}
            </CardItem>
        </Card>
    )
}