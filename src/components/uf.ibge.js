import React, { useState, useEffect } from "react";
import { Button, List, ListItem, Body, Text, Right, Icon } from "native-base";
import { styles } from "../styles/layouts/layouts.styles";
import { appsettings } from "../appsettings";
import { ModalView } from "./modal";

//  Redux
import { connect } from "react-redux";
import { localidadeEstadosRepos, localidadeEstadosSelecionado } from "../redux/reducers/localidade/estados.localidadeReducer";
// import { ufIbgeRepos, ufIbgeSelecionado } from "../redux/reducers/ibge/uf.ibge";

const loadProps = (props) => {

    if (props.lista == null) props.localidadeEstadosRepos();

    return {
        selectedValue: props.hasOwnProperty("selectedValue") ? props.selectedValue : null,
        placeholder: props.hasOwnProperty("placeholder") ? props.placeholder : "Selecione o estado",
        disabled: props.hasOwnProperty("disabled") ? props.disabled : false,
        show: props.hasOwnProperty("show") ? props.show : false,
        onSelected: props.hasOwnProperty("onSelected") ? props.onSelected : () => console.log("Selecionado!"),
        bordered: props.hasOwnProperty("bordered") ? props.bordered : false,
        buttonIcon: props.hasOwnProperty("buttonIcon") ? props.buttonIcon : <Icon name="arrow-dropdown" />
    }
}

const selecionarUF = (props) => {
    const [state, setState] = useState(loadProps(props));

    useEffect(() => {
        setState(loadProps(props));
    }, [props.selectedValue, props.lista])

    const close = () => {
        setState({ ...state, show: false });
        // state.onCancel();
    }

    const selected = (item) => {
        props.localidadeEstadosSelecionado(item)
        state.onSelected(item);
        close();
    }

    var buttonStyle = [styles.center]

    if (state.bordered) {
        buttonStyle.push({ borderColor: "gray", borderLeftWidth: 0.5, borderRightWidth: 0.5 })
    }

    return (
        <>
            <Button
                dark
                transparent
                style={buttonStyle}
                disabled={state.disabled}
                onPress={() => setState({ ...state, show: true })}
            >
                <Text>{state.selectedValue ?? state.placeholder}</Text>
                {state.buttonIcon}
            </Button>
            <ModalView
                key="SELECIONAR_UF"
                title={"Ufs"}
                show={state.show}
                showConfirm={false}
                center
                // centerContent
                width={"80%"}
                height={"40%"}
                onCancel={() => close()}
            >
                {props.lista != null ?
                    <List>
                        {
                            props.lista.map((x, i) => {
                                return (
                                    <ListItem key={x.id} onPress={() => selected(x)}>
                                        <Body>
                                            <Text>{x.sigla}</Text>
                                            <Text note>{x.nome}</Text>
                                        </Body>
                                        {state.selectedValue == x.sigla ?
                                            <Right>
                                                <Icon name="checkmark" />
                                            </Right>
                                            : null
                                        }
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    : null}
            </ModalView>
        </>
    )
}

const mapStateToProps = state => {
    return {
        lista: state.localidadeEstadosReducer.repos.lista
    };
};

const mapDispatchToProps = {
    localidadeEstadosRepos,
    localidadeEstadosSelecionado
};

export const SelecionarUF = connect(mapStateToProps, mapDispatchToProps)(selecionarUF);