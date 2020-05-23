import React, { Component } from "react";
import { View, Button, Icon, Text, Header, Body, Right, Content, List, ListItem, Left, CardItem, Card, Title, Input } from "native-base";
import Background from "../../../components/backgroud";
import { styles, pallet } from "../../../styles/layouts/layouts.styles";
import { StyleSheet } from "react-native";
//  Redux
import { connect } from "react-redux";
import { setAuthenticated } from "../../../redux/reducers/loginReducer";
// import { getUsuarioRepos } from "../../../redux/reducers/usuarioReducer";
import { ModalView } from "../../../components/modal";
import { maskCpfCnpj } from "../../../components/mask";

class Usuario extends Component {
    // componentWillMount() {
    //     console.log("componentDidMount", this.props.usuario);

    //     if (this.props.usuario == undefined)
    //         this.props.getUsuarioRepos()
    // }
    state = {
        confirmarLogout: false
    }
    logout = () => {
        this.props.setAuthenticated(false)
    }
    render() {

        // console.log("RENDER", this.props.sexoPicker);

        if(this.props.usuario === undefined) return null;

        const sexo = this.props.sexoPicker.filter(x => x.valor == this.props.usuario.sexo)[0];

        return (
            <Background
                backgroundColor={"#FFF"}
            >
                <ModalView
                    key="1"
                    show={this.state.confirmarLogout}
                    title={"Logout"}
                    center
                    centerContent
                    showCancel
                    // icon={<Icon name='document' />}
                    width={"80%"}
                    height={"30%"}
                    onConfirm={() => this.logout()}
                    onCancel={() => this.setState({ showData: false })}
                >
                    <View style={[styles.center]}>
                        <Text>Realmente deseja fazer Logout?</Text>
                    </View>
                </ModalView>
                <Header
                    noShadow
                    noLeft
                    style={[styles.center, styles.headerContainer]}
                >
                    <Body>
                        <Title style={[styles.headerTitle]}>Perfil</Title>
                    </Body>
                </Header>
                <Content
                    padder
                >
                    <List>
                        <ListItem itemHeader>
                            <Body>
                                <Text>Dados Pessoais</Text>
                            </Body>
                            <Right>
                                <Button block full icon
                                    style={[styles.startRadius, styles.endRadius]}
                                // onPress={() => this.setState({ confirmarLogout: true })}
                                >
                                    <Icon name="create" style={styles.textBoxStyle} />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={[usuarioStyle.textoCor]} note>Nome Completo</Text>
                                <Text style={[usuarioStyle.textoCor, usuarioStyle.textoValor]}>{this.props.usuario.nome} {this.props.usuario.sobrenome}</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={[usuarioStyle.textoCor]} note>CPF/CNPJ</Text>
                                <Text style={[usuarioStyle.textoCor, usuarioStyle.textoValor]}>{maskCpfCnpj(this.props.usuario.registroNacional).masked}</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={[usuarioStyle.textoCor]} note>E-Mail</Text>
                                <Text style={[usuarioStyle.textoCor, usuarioStyle.textoValor]}>{this.props.usuario.email}</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Text style={[usuarioStyle.textoCor]} note>Sexo</Text>
                                {/* <Input value={this.props.usuario.sexo} /> */}
                                <Text style={[usuarioStyle.textoCor, usuarioStyle.textoValor]}>{sexo.texto}</Text>
                            </Body>
                        </ListItem>
                        <ListItem itemHeader>
                            {/* <Text style>Ações</Text> */}
                        </ListItem>
                        <ListItem noBorder>
                            <Body>
                                <Button block full
                                    style={[styles.startRadius, styles.endRadius]}
                                    onPress={() => this.props.navigation.navigate('Autorizar', { to: 'AlterarSenha' })}
                                >
                                    <Text style={[styles.textBoxStyle, styles.center]}>Alterar Senha</Text>
                                </Button>
                            </Body>
                        </ListItem>
                        <ListItem noBorder>
                            <Body>
                                <Button block full danger
                                    style={[styles.startRadius, styles.endRadius]}
                                    onPress={() => this.setState({ confirmarLogout: true })}
                                >
                                    <Text style={[styles.textBoxStyle, styles.center]}>Sair</Text>
                                </Button>
                            </Body>
                        </ListItem>
                    </List>
                    {/* <Right>
                                            <Button active transparent onPress={() => this.setState({ confirmarLogout: true })}>
                                                <Text style={[usuarioStyle.textoCor]}>Sair</Text>
                                            </Button>
                                        </Right> */}
                </Content>
            </Background>
        )
    }
}

const mapStateToProps = state => {
    return {
        usuario: state.usuarioReducer.repos.objeto,
        sexoPicker: state.configuracoesReducer?.repos?.picker.sexo ?? []
    };
};

const mapDispatchToProps = {
    setAuthenticated
    // getUsuarioRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuario);

const usuarioStyle = StyleSheet.create({
    textoCor: { color: "#000" },
    textoValor: {
        padding: 5
    }
})