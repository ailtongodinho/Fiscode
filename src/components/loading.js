import React, { Component } from "react";
import { Spinner, Content, View } from "native-base";
import { StyleSheet, Modal, Dimensions } from "react-native";

export class Loading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: Dimensions.get("window").width / 1,
            height: Dimensions.get("window").height / 1,
            show: this.props.hasOwnProperty("show") ? this.props.show : true,
            icon: this.props.hasOwnProperty("icon") ? this.props.icon : "alert",
            message: this.props.hasOwnProperty("message") ? this.props.message : null
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show) {
            return {
                show: props.hasOwnProperty("show") ? props.show : true,
                icon: props.hasOwnProperty("icon") ? props.icon : "alert",
                message: props.hasOwnProperty("message") ? props.message : null
            }
        }
        else{
            return null;
        }
    }

    render() {
        // console.log("Loading", this.state);

        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.show}
                >
                    <View style={[styles.modal]}>
                        <View style={[styles.modalContainer]}>
                            <Spinner color="red"></Spinner>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#00000099",
        width: "100%",
        height: "100%"
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
        // backgroundColor: "#f9fafb",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%"
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