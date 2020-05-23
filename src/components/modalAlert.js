import React, { Component } from 'react';
import { Modal, Dimensions, Text, Button, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

export class ModalAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get("window").width / 1,
            height: Dimensions.get("window").height / 5,
            show: this.props.hasOwnProperty("show") ? this.props.show : false,
            icon: this.props.hasOwnProperty("icon") ? this.props.icon : "alert",
            message: this.props.hasOwnProperty("message") ? this.props.message : null,
            forcar: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show && !state.forcar) {
            // console.log("Entrei Aqui", props, state);

            return {
                show: props.hasOwnProperty("show") ? props.show : true,
                icon: props.hasOwnProperty("icon") ? props.icon : "alert",
                message: props.hasOwnProperty("message") ? props.message : null,
                forcar: true
            }
        }else{
            return {
                forcar: false
            }
        }
    }

    render() {

        return (
            <View style={[{ width: this.state.width, maxHeight: 100 }]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.show}
                >
                    <TouchableOpacity onPress={() => this.setState({ show: false })} style={[styles.modal]}>
                        <View style={[{ width: this.state.width, height: this.state.height }, styles.modalContainer]}>
                            <Grid>
                                <Col size={10} style={[styles.center, styles.leftContainer]}>
                                    <Icon name={this.state.icon}></Icon>
                                </Col>
                                <Col size={80} style={[styles.center, styles.rightContainer]}>
                                    <Text style={[styles.center]}>{this.state.message}</Text>
                                    {/* <Button title="Teste" onPress={() => this.setState({ show: false })}></Button> */}
                                </Col>
                                <Col size={5} style={[{ justifyContent: "flex-start" }, styles.leftContainer]}>
                                    <Icon name="close" onPress={() => this.setState({ show: false })}></Icon>
                                </Col>
                            </Grid>
                            {/* <View style={[styles.center, styles.leftContainer]}>

                            </View> */}
                            {/* <View style={[styles.center, styles.rightContainer]}></View> */}
                            {/* <View style={styles.modalHeader}>
                                <Text style={styles.title}>Delete Your Account</Text>
                            </View> */}
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        // flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center"
    },
    modal: {
        // backgroundColor: "#00000099",
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