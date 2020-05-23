import React, { Component } from "react";
import { StyleSheet, Clipboard, AsyncStorage } from "react-native";
import { Button, Icon, Text, Content, View, Card, CardItem, Body, Fab, Right, List, ListItem, Input, Left } from "native-base";
import Background from "../../components/backgroud";
import { styles, pallet } from "../../styles/layouts/layouts.styles";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

//  Redux
import { connect } from "react-redux";
import { extrairNotaRepos } from "../../redux/reducers/leitorReducer";
import { adicionarNota } from "../../redux/reducers/nota/notaListarReducer";
import { copiarClipboard } from "../../redux/reducers/globalReducer";
import { extrairModel } from "../../models/api/ExtrairModel";
import { ScrollView } from "react-native-gesture-handler";
import { DateTime } from "../../helpers/datetime";

const storage_historico = "@store_leitor_historico";

class Leitor extends Component {
    state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
        escaneando: false,
        torch: false,
        addURL: false,
        focusedScreen: true,
        historico: [
            // { nota: "aaaaa", mensagem: "Nota já Cadastrada", sucesso: false, data: Date.now() }
        ]
    };
    async componentDidMount() {
        await this._requestCameraPermission();
        await this._lerHistorico();
        this.focus = this.props.navigation.addListener('focus', () => {
            // console.log("willFocus");
            this.setState({ focusedScreen: true })
        });
        this.blur = this.props.navigation.addListener('blur', () => {
            // console.log("willBlur");
            this.setState({ focusedScreen: false })
        });
    }
    async componentWillUnmount() {
        await this._salvarHistorico()
        this.focus();
        this.blur();
    }
    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };
    _salvarHistorico = async () => {
        // console.log("_salvarHistorico", this.state.historico);
        await AsyncStorage.setItem(storage_historico, JSON.stringify(this.state.historico));
    }
    _lerHistorico = async () => {
        var historico = JSON.parse(await AsyncStorage.getItem(storage_historico)) ?? [];
        // console.log("_lerHistorico", historico);
        if (historico.length > 0)
            historico = historico.filter(x => x.data > DateTime.subtract(null, 30))
        this.setState({ historico: historico })
    }
    escanearHandler = ({ type, data }) => {
        if (!this.state.escaneando) {
            // console.log("escanearHandler", type, data);
            if (type == 256) {
                this.setState({ escaneando: true });
                this.props.extrairNotaRepos(new extrairModel(data))
                    .then(() => {
                        var historico = this.state.historico;
                        historico.unshift({ nota: data, sucesso: this.props.leitor.sucesso, data: Date.now(), mensagem: this.props.leitor.mensagem });
                        // if (this.props.leitor.sucesso) {
                        //     this.props.adicionarNota(this.props.leitor.idNota);
                        // }
                        setTimeout(() => this.setState({ escaneando: false, historico: historico }), 3000)
                    });
            }
        }
    }
    _permissaoCamera = () => {
        var mensagem = "Câmera permitida";
        if (this.state.hasCameraPermission === null)
            mensagem = "Sem permissão para a câmera";
        if (this.state.hasCameraPermission === false)
            mensagem = "Permissão para a câmera não garantida";
        // if (this.state.hasCameraPermission === )
        return (
            <Card style={[styles.center]} transparent noShadow>
                <CardItem style={[styles.center, { backgroundColor: 'transparent' }]}>
                    <Icon name="camera-off" type="MaterialCommunityIcons" style={{ color: "white" }} />
                    <Text style={[styles.textBoxStyle, { margin: 10 }]}>{mensagem}</Text>
                </CardItem>
                <CardItem footer style={{ backgroundColor: 'transparent' }}>
                    <Body style={[styles.center]}>
                        <Button full block
                            style={[{ borderTopStartRadius: 10, borderBottomStartRadius: 10 }]}
                            onPress={this._requestCameraPermission}
                        >
                            <Text>Permitir</Text>
                        </Button>
                    </Body>
                    <Button danger
                        style={[styles.center, { borderTopEndRadius: 10, borderBottomEndRadius: 10 }]}
                        onPress={() => Linking.openSettings()}>
                        <Icon name="settings" />
                    </Button>
                </CardItem>
            </Card>
        )
    }
    _camera = () => {

        return (
            <View
                style={[styles.fullAbsolute]}
            >
                <Camera
                    onBarCodeScanned={this.escanearHandler}
                    // barCodeTypes={["qr"]}]
                    style={[styles.camera]}
                    flashMode={this.state.torch ? "torch" : "off"}
                >
                    <View
                        style={[{ flex: 1, backgroundColor: "transparent", flexDirection: 'row', justifyContent: "flex-end" }]}
                    >
                        <Right style={{ backgroundColor: "transparent", alignSelf: 'flex-end', padding: 10, flex: 0 }}>
                            <Button transparent
                                onPress={() => this.setState({ torch: !this.state.torch })}
                            >
                                <Icon name={"flashlight"} style={{ color: this.state.torch ? "yellow" : "white" }} />
                            </Button>
                        </Right>
                    </View>
                </Camera>
                <ScrollView>
                    <List>
                        <ListItem header style={[styles.center]}>
                            <Body>
                                <Text>Histórico</Text>
                            </Body>
                            <Right>
                                <Button transparent bordered
                                    onPress={() => this.setState({ addURL: !this.state.addURL })}
                                >
                                    <Icon name={this.state.addURL ? "remove" : "add"} />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem style={{ display: this.state.addURL ? "flex" : "none" }}>
                            <Body>
                                <Input
                                    style={{ borderBottomWidth: 0.5 }}
                                    placeholder="Cole aqui a URL de sua nota"
                                    onChangeText={(text) => this.setState({ lastScannedUrl: text })}
                                />
                            </Body>
                            <Right>
                                <Button success
                                    onPress={() => this.escanearHandler({ type: 256, data: this.state.lastScannedUrl })}
                                >
                                    <Icon name="checkmark" />
                                </Button>
                            </Right>
                        </ListItem>

                        {this.state.historico.map((item) => {
                            return (
                                <ListItem>
                                    <Left style={styles.center}>
                                        <Button success={item.sucesso} danger={!item.sucesso} transparent>
                                            <Icon name={item.sucesso ? "checkmark-circle" : "close-circle"} />
                                        </Button>
                                        <Body style={{ padding: 5 }}>
                                            <Text note>{new Date(item.data).toISOString()}</Text>
                                            <Text>{item.mensagem}</Text>
                                        </Body>
                                        <Button bordered
                                            onPress={() => this.props.copiarClipboard(item.nota)}
                                        >
                                            <Icon name="link" />
                                        </Button>
                                    </Left>
                                </ListItem>
                            );
                        })}

                    </List>
                </ScrollView>

            </View >
        )
    }
    render() {

        return (
            <Background
                // backgroundColor={"#e8dcbc"}
                backgroundColor={"#FFF"}
            >
                <Content
                    contentContainerStyle={[{ flex: 1, backgroundColor: 'transparent' }, styles.center]}
                // padder
                >
                    {/* <View style={{
                        backgroundColor: "transparent", 
                        borderWidth: 1,
                        borderRadius: 5,
                        borderStyle: 'dashed',
                        padding: 10,
                        marginVertical: 10,
                    }}>
                        <Text style={{ fontSize: 12 }}>Documento Auxiliar da Nota Fiscal Eletrônica para Consumidor Final</Text>
                    </View> */}
                    {!this.state.hasCameraPermission
                        ? this._permissaoCamera()
                        : this.state.focusedScreen
                            ? this._camera()
                            : null
                    }
                </Content>
                {/* <Content
                    contentContainerStyle={[{ flex: 1, backgroundColor: 'blue' }, styles.center]}
                >
                </Content> */}
            </Background>
        )
    }
}

const mapStateToProps = state => {
    return {
        leitor: state.leitorReducer.repos
    };
};

const mapDispatchToProps = {
    extrairNotaRepos,
    adicionarNota,
    copiarClipboard
};

export default connect(mapStateToProps, mapDispatchToProps)(Leitor);