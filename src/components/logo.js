import React from "react";
import { StyleSheet, Image } from "react-native";

const logos = {
    logoComTexto: require('./../www/logos/FiscodeBranco.png'),
    logoSemTexto: require('./../www/logos/LogoBranco.png')
}

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasText: props.hasOwnProperty('hasText') ? props.hasText : false,
            width: props.hasOwnProperty('width') ? props.width : 100,
            height: props.hasOwnProperty('height') ? props.height : 100,
        }
    }

    render() {
        
        return (
            <Image
                style={{
                    width: this.state.width,
                    height: this.state.height
                }}
                resizeMode='center'
                source={this.state.hasText ? logos.logoComTexto : logos.logoSemTexto}
            />
        )
    }
}