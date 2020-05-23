import React, { Component } from "react";
import Background from "./backgroud";
import { Content, Footer, Button, Text, Form, Item, Input, Icon, Label, Header, Left, Body, Title, View, Card, CardItem } from "native-base";
import { styles } from "../styles/layouts/layouts.styles";
import Logo from "./logo";

//  Redux
import { connect } from "react-redux";
import { autorizarRepos } from "../redux/reducers/loginReducer";

class autorizar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senha: "",
            esconder: true
        }
    }
    _enviar = () => {
        this.props.autorizarRepos(this.state.senha)
            .then(() => {
                if (this.props.login.autorizar) {
                    this._sair();
                    this.props.navigation.navigate(this.props.route.params.to)
                }
            })

    }
    _sair = () => {
        this.setState({ senha: "" }, () => this.props.navigation.goBack());
    }
    render() {
        return (
            <Background>
                <Header
                    noShadow
                    // transparent
                    style={[styles.center, styles.headerContainer]}
                >
                    <Left>
                        <Button icon transparent
                            onPress={this._sair}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Autorizar</Title>
                    </Body>
                </Header>
                <Content
                    padder
                    contentContainerStyle={{ marginTop: "20%" }}
                >
                    <View style={[styles.center]}>
                        <Logo
                            width={100}
                            height={100}
                            hasText={true}
                        />
                    </View>
                    <View style={[styles.center, { marginTop: "10%" }]}>
                        <Title>Digite sua senha</Title>
                    </View>
                    <Form>
                        <Item
                            floatingLabel
                            style={styles.textBoxPadding}
                        >
                            <Label style={styles.textBoxStyle}>Senha</Label>
                            <Input
                                style={styles.textBoxStyle}
                                textContentType='password'
                                secureTextEntry={this.state.esconder}
                                onChangeText={(text) => this.setState({ senha: text })}
                                value={this.state.senha}
                                autoFocus
                            ></Input>
                            <Icon
                                onPress={() => this.setState({
                                    esconder: !this.state.esconder
                                })}
                                name={(!this.state.esconder ? "eye" : "eye-off")}
                                style={{ color: 'white' }}
                            />
                        </Item>
                    </Form>
                </Content>
                <Footer style={{ backgroundColor: 'transparent' }}>
                    <Button style={[styles.full, styles.center]}
                        onPress={this._enviar}
                    >
                        <Text>Autorizar</Text>
                    </Button>
                </Footer>
            </Background>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.loginReducer.repos
    };
};

const mapDispatchToProps = {
    autorizarRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(autorizar);