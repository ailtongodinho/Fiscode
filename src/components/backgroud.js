import React, { Component } from "react";
import { KeyboardAvoidingView, StatusBar, Keyboard } from "react-native";
import { styles, pallet } from "../styles/layouts/layouts.styles";
import { Container } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

//  Redux
import { connect } from "react-redux";
import { updateStatusBar } from "../redux/reducers/globalReducer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

class Background extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var bgColor = this.props?.backgroundColor ?? pallet[0];

        // this.props.updateStatusBar({
        //     backgroundColor: bgColor,
        //     barStyle: this.props?.barStyle ?? "dark-content"
        // });

        // console.log("Background", bgColor)
        return (
            <KeyboardAvoidingView
                style={[{ flex: 1 }]}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                <SafeAreaView
                    style={[{ flex: 1 }]}
                >
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                        <Container
                            style={[styles.container, { backgroundColor: bgColor }]}
                        >
                            {this.props.children}
                        </Container>
                    {/* </TouchableWithoutFeedback> */}
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {
    updateStatusBar
};

export default Background;