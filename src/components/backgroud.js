import React, { Component } from "react";
import { KeyboardAvoidingView, StatusBar } from "react-native";
import { styles, pallet } from "../styles/layouts/layouts.styles";
import { Container } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

//  Redux
import { connect } from "react-redux";
import { updateStatusBar } from "../redux/reducers/globalReducer";

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
            <SafeAreaView
                style={[{ flex: 1 }]}
            >
                <KeyboardAvoidingView
                style={[{ flex: 1 }]}
                // behavior="height"
                >
                    <Container
                        style={[styles.container, { backgroundColor: bgColor }]}
                    >
                        {this.props.children}
                    </Container>
                </KeyboardAvoidingView>
            </SafeAreaView>
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