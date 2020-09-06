import React, { Component, useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import { Icon, Header, Body, Content, Footer, FooterTab, Button, Container, Title, Right, Left } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { styles } from "../styles/layouts/layouts.styles";

const loadProps = (props) => {
    return {
        desfocar: props.hasOwnProperty("desfocar") ? props.desfocar : true,
        width: props.hasOwnProperty("width") ? props.width : "100%",
        height: props.hasOwnProperty("height") ? props.height : "90%",
        center: props.hasOwnProperty("center") ? props.center : false,
        centerContent: props.hasOwnProperty("centerContent") ? props.centerContent : false,
        icon: props.hasOwnProperty("icon") ? props.icon : null,
        forcar: false,
        onConfirm: props.hasOwnProperty("onConfirm") ? props.onConfirm : () => { console.info("Confirmado") },
        onCancel: props.hasOwnProperty("onCancel") ? props.onCancel : () => { console.info("Cancelado") },
        padder: props.hasOwnProperty("padder") ? props.padder : true,
        radius: props.hasOwnProperty("radius") ? props.radius : true,
        show: props.hasOwnProperty("show") ? props.show : false,
        showHeader: props.hasOwnProperty("showHeader") ? props.showHeader : true,
        showCancel: props.hasOwnProperty("showCancel") ? props.showCancel : false,
        showConfirm: props.hasOwnProperty("showConfirm") ? props.showConfirm : true,
        title: props.hasOwnProperty("title") ? props.title : "Titulo do Modal",
    };
}

export const ModalView = (props) => {
    const [state, setState] = useState(loadProps(props));

    useEffect(() => {
        // console.log("useEffect_UPDATE", state.show, props.show);

        // setState({ ...state, show: props.show });
        setState(loadProps(props));
    }, [props.show])

    // console.log("ModalViewConst_STATE", state);

    const close = () => {
        setState({ ...state, show: false });
        state.onCancel();
    }

    var viewStyle = [modalStyles.modal];
    if (state.center) viewStyle.push(modalStyles.center);
    if (state.desfocar) viewStyle.push(modalStyles.desfoque)
    var containerStyle = [];
    if (state.radius) containerStyle.push({ borderRadius: 10 })
    if (state.padder) containerStyle.push({ padding: 5 })
    return (
        <Modal
            key={"MODAL_" + state.title}
            animationType="slide"
            transparent={true}
            visible={state.show}
        >
            <TouchableOpacity style={viewStyle} onPress={close}>
                <View style={[{ width: state.width, height: state.height }, modalStyles.modalContainer]}>
                    <Container
                        style={containerStyle}
                    >
                        {state.showHeader ?
                            <Header
                                noShadow
                                // noLeft
                                rounded
                                // transparent
                                style={[{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5, backgroundColor: 'white' }]}
                            >
                                <Left
                                    style={{ flex: 0 }}
                                >
                                    <Button transparent onPress={close}>
                                        <Icon name='close' style={{ color: 'black' }}></Icon>
                                    </Button>
                                </Left>
                                <Body
                                    style={{ flex: 1 }}
                                >
                                    <Title style={{ color: 'black', alignSelf: "center" }}>{state.title}</Title>
                                </Body>
                                <Right
                                    style={{ flex: 0, padding: 10 }}
                                >
                                    {state.icon}
                                </Right>
                            </Header>
                            : null
                        }
                        <Content
                            // centerContent
                            contentContainerStyle={[state.centerContent ? modalStyles.center : {}]}
                        >
                            {props.children}
                            {/* {React.cloneElement(, { closeModal: this.close })} */}
                        </Content>
                        {state.showConfirm ?
                            <Footer
                                style={[
                                    { backgroundColor: 'transparent' },
                                    { borderTopColor: 'lightgray', borderTopWidth: 0.5, elevation: 0 }
                                ]}
                            >
                                {/* <FooterTab
                                    style={{ backgroundColor: 'transparent' }}
                                    // style={[{ borderRadius: 10, shadowColor: 'black', borderTopColor: 'lightgray', borderTopWidth: 0.1, backgroundColor: 'white' }]}
                                > */}
                                <Body
                                    style={[styles.row]}
                                >
                                    <Button
                                        danger
                                        style={[{ width: "50%", display: state.showCancel ? "flex" : "none" }, styles.startRadius, styles.center]}
                                        onPress={() => {
                                            //  Fechar
                                            close();
                                        }}
                                    >
                                        <Text style={[styles.textBoxStyle, styles.center]}>Cancelar</Text>
                                    </Button>
                                    <Button success style={[{ width: state.showCancel ? "50%" : "100%" }, state.showCancel ? styles.endRadius : {}, styles.center]}
                                        onPress={() => {
                                            state.onConfirm()
                                            //  Fechar
                                            close();
                                        }}
                                    >
                                        <Text style={{ color: 'white' }}>Confirmar</Text>
                                    </Button>
                                </Body>
                                {/* </FooterTab> */}
                            </Footer>
                            : null}
                    </Container>
                </View>
            </TouchableOpacity>
        </Modal >
    );

}

const modalStyles = StyleSheet.create({
    center: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center"
    },

    modal: {
        flex: 1,
        // flexDirection: "column",
        // alignItems: 'center',
        justifyContent: 'flex-end',
        // alignSelf: "flex-end"
    },
    leftContainer: {
        // backgroundColor: "#CCC",
        padding: 10
    },
    rightContainer: {
        // backgroundColor: "#000"
        borderLeftWidth: 1,
        borderLeftColor: "lightgray",
        padding: 10
    },
    desfoque: {
        backgroundColor: "#00000099"
    },
    modalContainer: {
        backgroundColor: "#f9fafb",
        borderRadius: 5,
        minHeight: "20%",
        // width: "100%",
        // height: "100%"
    },
    modalHeader: {

    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 15,
        color: "#000"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray"
    },
    modalBody: {
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    modalFooter: {
    },
    actions: {
        borderRadius: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    actionText: {
        color: "#fff"
    }
});  