import React, { Component, useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import { Icon, Header, Body, Content, Footer, FooterTab, Button, Container, Title, Right, Left } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import { styles } from "../styles/layouts/layouts.styles";

const loadProps = (props) => {
    return {
        width: props.hasOwnProperty("width") ? props.width : "100%",
        height: props.hasOwnProperty("height") ? props.height : "90%",
        center: props.hasOwnProperty("center") ? props.center : false,
        centerContent: props.hasOwnProperty("centerContent") ? props.centerContent : false,
        show: props.hasOwnProperty("show") ? props.show : false,
        icon: props.hasOwnProperty("icon") ? props.icon : null,
        title: props.hasOwnProperty("title") ? props.title : "Titulo do Modal",
        forcar: false,
        showCancel: props.hasOwnProperty("showCancel") ? props.showCancel : false,
        onConfirm: props.hasOwnProperty("onConfirm") ? props.onConfirm : () => { console.info("Confirmado") },
        onCancel: props.hasOwnProperty("onCancel") ? props.onCancel : () => { console.info("Cancelado") }
    };
}

// export class ModalView extends Component {
//     constructor(props) {
//         super(props);
//         this.state = loadProps(this.props)
//     }

//     close = () => {
//         this.setState({ show: false, forcar: true }, this.state.onCancel());
//     }

//     static getDerivedStateFromProps(props, state) {
//         // console.log("getDerivedStateFromProps", props.title, props.show, state.show);

//         if (props.show !== state.show && !state.forcar) {
//             return loadProps(props)
//         } else {
//             return {
//                 forcar: false
//             }
//         }
//     }

//     render() {
//         var viewStyle = [modalStyles.modal];
//         if (this.state.center) viewStyle.push(modalStyles.center);

//         return (
//             <Modal
//                 key={"MODAL_" + this.state.title}
//                 animationType="slide"
//                 transparent={true}
//                 visible={this.state.show}
//             >
//                 <View style={viewStyle}>
//                     <View style={[{ width: this.state.width, height: this.state.height }, modalStyles.modalContainer]}>
//                         <Container
//                             style={[{ borderRadius: 10, padding: 5 }]}
//                         >
//                             <Header
//                                 noShadow
//                                 // noLeft
//                                 rounded
//                                 // transparent
//                                 style={[{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5, backgroundColor: 'white' }]}
//                             >
//                                 <Left
//                                     style={{ flex: 0 }}
//                                 >
//                                     <Button transparent onPress={this.close}>
//                                         <Icon name='close' style={{ color: 'black' }}></Icon>
//                                     </Button>
//                                 </Left>
//                                 <Body
//                                     style={{ flex: 1 }}
//                                 >
//                                     <Title style={{ color: 'black', alignSelf: "center" }}>{this.state.title}</Title>
//                                 </Body>
//                                 <Right
//                                     style={{ flex: 0, padding: 10 }}
//                                 >
//                                     {this.state.icon}
//                                 </Right>
//                             </Header>
//                             <Content
//                                 // centerContent
//                                 contentContainerStyle={[this.state.centerContent ? modalStyles.center : {}]}
//                             >
//                                 {this.props.children}
//                                 {/* {React.cloneElement(, { closeModal: this.close })} */}
//                             </Content>
//                             <Footer
//                                 style={{ backgroundColor: 'transparent', borderTopColor: 'lightgray', borderTopWidth: 0.5, elevation: 0 }}
//                             >
//                                 {/* <FooterTab
//                                     style={{ backgroundColor: 'transparent' }}
//                                     // style={[{ borderRadius: 10, shadowColor: 'black', borderTopColor: 'lightgray', borderTopWidth: 0.1, backgroundColor: 'white' }]}
//                                 > */}
//                                 <Body
//                                     style={[styles.row]}
//                                 >
//                                     <Button
//                                         danger
//                                         style={[{ width: "50%", display: this.state.showCancel ? "flex" : "none" }, styles.startRadius, styles.center]}
//                                         onPress={() => {
//                                             //  Fechar
//                                             this.close();
//                                         }}
//                                     >
//                                         <Text style={[styles.textBoxStyle, styles.center]}>Cancelar</Text>
//                                     </Button>
//                                     <Button success style={[{ width: this.state.showCancel ? "50%" : "100%" }, this.state.showCancel ? styles.endRadius : {}, styles.center]}
//                                         onPress={() => {
//                                             this.state.onConfirm()
//                                             //  Fechar
//                                             this.close();
//                                         }}
//                                     >
//                                         <Text style={{ color: 'white' }}>Confirmar</Text>
//                                     </Button>
//                                 </Body>
//                                 {/* </FooterTab> */}
//                             </Footer>
//                         </Container>
//                     </View>
//                 </View>
//             </Modal>
//         );
//     }
// }

export const ModalView = (props) => {
    const [state, setState] = useState(loadProps(props));

    useEffect(() => {
        // console.log("useEffect_UPDATE", state.show, props.show);
        
        setState({ ...state, show: props.show });
    }, [props.show])

    // console.log("ModalViewConst_STATE", props.show);

    const close = () => {
        setState({ ...state, show: false });
        state.onCancel();
    }

    var viewStyle = [modalStyles.modal];
    if (state.center) viewStyle.push(modalStyles.center);
''
    return (
        <Modal
            key={"MODAL_" + state.title}
            animationType="slide"
            transparent={true}
            visible={state.show}
        >
            <View style={viewStyle}>
                <View style={[{ width: state.width, height: state.height }, modalStyles.modalContainer]}>
                    <Container
                        style={[{ borderRadius: 10, padding: 5 }]}
                    >
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
                        <Content
                            // centerContent
                            contentContainerStyle={[state.centerContent ? modalStyles.center : {}]}
                        >
                            {props.children}
                            {/* {React.cloneElement(, { closeModal: this.close })} */}
                        </Content>
                        <Footer
                            style={{ backgroundColor: 'transparent', borderTopColor: 'lightgray', borderTopWidth: 0.5, elevation: 0 }}
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
                    </Container>
                </View>
            </View>
        </Modal>
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
        backgroundColor: "#00000099",
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