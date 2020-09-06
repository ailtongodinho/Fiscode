import React, { useState, useEffect } from "react";
import { Button, List, ListItem, Body, Text, Right, Icon, Item, Input } from "native-base";
import { styles } from "../styles/layouts/layouts.styles";
import { appsettings } from "../appsettings";
import { ModalView } from "./modal";
import { listaVazia } from "./listaVazia";

//  Redux
import { connect } from "react-redux";
// import { municipioIbgeRepos } from "../redux/reducers/ibge/municipio.ibge";
// import { localidadeDistritosRepos } from "../redux/reducers/localidade/distritos.localidadeReducer";

const loadProps = (props) => {

    // props.localidadeDistritosRepos();

    return {
        selectedValue: props.hasOwnProperty("selectedValue") ? props.selectedValue : null,
        placeholder: props.hasOwnProperty("placeholder") ? props.placeholder : "Selecione o Distrito",
        disabled: props.hasOwnProperty("disabled") ? props.disabled : false,
        uf: props.hasOwnProperty("uf") ? props.uf : null,
        show: props.hasOwnProperty("show") ? props.show : false,
        onSelected: props.hasOwnProperty("onSelected") ? props.onSelected : () => console.log("Selecionado!"),
        bordered: props.hasOwnProperty("bordered") ? props.bordered : false,
        buttonIcon: props.hasOwnProperty("buttonIcon") ? props.buttonIcon : <Icon name="arrow-dropdown" />,
        pesquisa: "",
    }
}

const selecionarDistrito = (props) => {
    const [state, setState] = useState(loadProps(props));

    useEffect(() => {
        setState(loadProps(props));
    }, [props.selectedValue, props.lista, props.disabled, props.uf])

    const close = () => {
        setState({ ...state, show: false });
        // state.onCancel();
    }

    const selected = (item) => {
        state.onSelected(item);
        close();
    }

    // console.log("selecionarMunicipio", props.lista.find(x => x.id > 0));
    //  Carrega a lista
    // if (props.lista == null && !state.disabled) props.municipioIbgeRepos();

    var buttonStyle = [styles.center]

    if (state.bordered) {
        buttonStyle.push({ borderColor: "gray", borderLeftWidth: 0.5, borderRightWidth: 0.5 })
    }
    //  Nulo caso não exista Distrito
    // if (props.lista != null && props.lista.find(x => x.id > 0) == undefined) {
    //     return null;
    // }

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
                key="SELECIONAR_DISTRITO"
                title={"DISTRITOS"}
                show={state.show}
                showConfirm={false}
                center
                // centerContent
                width={"80%"}
                height={"80%"}
                onCancel={() => close()}
            >
                {props.lista != null ?
                    <List>
                        <ListItem>
                            <Item>
                                <Input placeholder={"Digite o distrito"} autoFocus value={state.pesquisa} onChangeText={(text) => setState({ ...state, pesquisa: text })} />
                                <Icon name="search" />
                            </Item>
                        </ListItem>
                        {
                            // props.lista.map((x, i) => {
                            props.procurar(state.pesquisa).map((x, i) => {
                                return (
                                    <ListItem key={x.id} onPress={() => selected(x)}>
                                        <Body>
                                            {/* <Text note>{x.id}</Text> */}
                                            <Text>{x.nome}</Text>
                                        </Body>
                                        {state.selectedValue == x.nome ?
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
                    : listaVazia("Carregando", null, <Icon name="list" />)}
            </ModalView>
        </>
    )
}

const mapStateToProps = state => {
    return {
        lista: state.localidadeDistritosReducer.repos.lista,
        municipio: state.localidadeMunicipiosReducer.repos.selecionado,
        procurar: (nome) => {
            if (nome.length > appsettings.ibge.municipios.pesquisa.tamanhoTexto)
                return state.localidadeDistritosReducer.repos.lista.filter(x => x.nomeSemAcento.toLowerCase().startsWith(nome.toLowerCase()));
            else
                return state.localidadeDistritosReducer.repos.lista.slice(0, 10);
        }
    };
};

const mapDispatchToProps = {

};

export const SelecionarDistrito = connect(mapStateToProps, mapDispatchToProps)(selecionarDistrito);