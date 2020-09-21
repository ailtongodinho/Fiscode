import React, { Component } from "react";
import { Icon, Thumbnail, View } from "native-base";
import { appsettings } from "../appsettings";
import { styles } from "../styles/layouts/layouts.styles";

const loadProps = (props) => {
    return {
        thumbnail: null,
        ean: props.hasOwnProperty("ean") ? props.ean : null,
        large: props.hasOwnProperty("large") ? true : false,
        small: props.hasOwnProperty("small") ? true : false
    }
}

export class GetThumbnailProduto extends Component {
    constructor(props) {
        super(props)
        this.state = loadProps(props)
    }
    getThumbnail = () => {
        if (this.state.ean == null) return null;
        var ean = parseInt(this.state.ean);
        var uri = appsettings.cosmos.thumbnail.replace("{ean}", ean);

        if (!isNaN(ean)) {
            this.setState({ thumbnail: { uri: uri } });
        }
    }
    componentDidMount() {
        this.getThumbnail();
    }
    render() {
        return (
            <View style={[styles.center, { height: this.state.large ? 80 : 36, width: this.state.large ? 80 : 36 }]}>
                {this.state.thumbnail == null ?
                    <Icon name="image" style={{ color: "#000" }} />
                    :
                    <Thumbnail
                        source={this.state.thumbnail}
                        large={this.state.large}
                        small={this.state.small}
                        onError={(e) => { this.setState({ thumbnail: null }) }}
                    />
                }
            </View>
        )
    }
}