import React, { useState, useEffect } from "react";
import { Button, List, ListItem, Body, Text, Right, Icon } from "native-base";
import { styles } from "../../../styles/layouts/layouts.styles";
import { appsettings } from "../../../appsettings";
import { ModalView } from "../../../components/modal";

const loadProps = (props) => {
    return {
        disabled: props.hasOwnProperty("disabled") ? props.disabled : false,
        onSelected: props.hasOwnProperty("onSelected") ? props.onSelected : () => console.log("Selecionado!"),
        selectedValue: props.hasOwnProperty("selectedValue") ? props.selectedValue : "",
        show: props.hasOwnProperty("show") ? props.show : false,
        bordered: props.hasOwnProperty("bordered") ? props.bordered : false,
    }
}

export const SelecionarUnidade = (props) => {
    const [state, setState] = useState(loadProps(props));

    useEffect(() => {
        setState(loadProps(props));
    }, [props.selectedValue])

    const close = () => {
        setState({ ...state, show: false });
        // state.onCancel();
    }

    const selected = (value) => {
        state.onSelected(value);
        close();
    }

    var buttonStyle = [styles.center, { height: "100%" }]

    if(state.bordered){
        buttonStyle.push({ borderColor: "gray", borderLeftWidth: 0.5, borderRightWidth: 0.5 })
    }

    return (
        <>
            <Button
                transparent
                style={buttonStyle}
                disabled={state.disabled}
                onPress={() => setState({ ...state, show: true })}
            >
                <Text>{state.selectedValue}</Text>
                <Icon name="arrow-dropup" />
            </Button>
            <ModalView
                key="SELECIONAR_UNIDADE"
                title={"Unidades"}
                show={state.show}
                showConfirm={false}
                center
                // centerContent
                width={"80%"}
                height={"40%"}
                onCancel={() => close()}
            >
                <List>
                    {appsettings.produto.unidades.map((x, i) => {
                        return (
                            <ListItem onPress={() => selected(x.value)}>
                                <Body>
                                    <Text>{x.label}</Text>
                                    <Text note>{x.descricao}</Text>
                                </Body>
                                {state.selectedValue == x.value ?
                                    <Right>
                                        <Icon name="checkmark" />
                                    </Right>
                                    : null
                                }
                            </ListItem>
                        )
                    })}
                </List>
            </ModalView>
        </>
    )

}