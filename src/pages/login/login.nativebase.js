import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Col, Row, Grid, Icon, Content, Form, Item, Input, Label, Button, Text, Body, List, ListItem, CheckBox } from "native-base";
import { styles } from "../../styles/layouts/layouts.styles";

//  Redux
import { connect } from "react-redux";
import { LoginRepos } from "../../redux/reducers/loginReducer";

//  Components
import Background from "../../components/backgroud";
import Logo from "../../components/logo";
import { maskCpfCnpj } from "../../components/mask";
import { 
    getLogin, getSenha, getLembrarLogin, 
    removeLembrarLogin, removeLogin, removeSenha,
    setLembrarLogin, setLogin, setSenha 
} from "../../components/storage";

//  Variáveis
// const storage_login = "@store_login_login";
// export const storage_senha = "@store_login_senha";
// const storage_lembrar = "@store_login_lembrar";

//  Expo
import { expo } from '../../../app.json'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                login: {
                    value: '',
                    masked: '',
                    error: false
                },
                senha: {
                    value: '',
                    error: false
                },
            },
            lembrar: false,
            esconder: true
        }
    }
    async componentDidMount() {
        const login = await getLogin() ?? "";
        const senha = await getSenha() ?? "";
        const lembrar = JSON.parse(await getLembrarLogin()) ?? false;

        this.escreverLogin(login);
        this.escreverSenha(senha);
        this.setState({ lembrar: lembrar });
    }
    escreverLogin = (text) => {
        var mask = maskCpfCnpj(text);
        this.setState({
            payload: { ...this.state.payload, login: { ...this.state.payload.login, error: !mask.isValid, masked: mask.masked, value: mask.raw } }
        })
    }
    escreverSenha = (text) => {
        this.setState({
            payload: { ...this.state.payload, senha: { ...this.state.payload.senha, error: !text.length > 4, value: text } }
        })
    }
    validar = () => {
        const { login, senha } = this.state.payload;

        return !login.error && !senha.error
    }
    fazerLogin = async () => {
        if (this.validar()) {
            
            (this.state.lembrar ? this.lembrarDados() : this.esquecerDados())
            .then(() => {
                    console.log(this.state);
                    var obj = {
                        login: this.state.payload.login.value,
                        senha: this.state.payload.senha.value
                    }
                    this.props.LoginRepos(obj);
                }
                );

        }
    }
    esquecerDados = async () => {
        // await AsyncStorage.removeItem(storage_login);
        // await AsyncStorage.removeItem(storage_senha);
        // await AsyncStorage.removeItem(storage_lembrar);
        await removeLembrarLogin();
        await removeLogin();
        await removeSenha();
    }
    lembrarDados = async () => {
        // console.log("lembrarDados", JSON.stringify(this.state.lembrar));

        // await AsyncStorage.setItem(storage_login, this.state.payload.login.value);
        // await AsyncStorage.setItem(storage_senha, this.state.payload.senha.value);
        // await AsyncStorage.setItem(storage_lembrar, JSON.stringify(this.state.lembrar));
        await setLembrarLogin(JSON.stringify(this.state.lembrar));
        await setLogin(this.state.payload.login.value);
        await setSenha(this.state.payload.senha.value);
    }
    render() {

        return (
            <Background>
                <Grid>
                    <Row size={8} style={[styles.center, { backgroundColor: 'transparent' }]} >
                        <Logo
                            width={100}
                            height={100}
                            hasText={true}
                        />
                    </Row>
                    <Row size={10} style={[{ backgroundColor: 'transparent' }]} >
                        <Content
                            // padder
                            // contentContainerStyle={[styles.center]}
                            style={[styles.form]}
                        >
                            <Form
                                style={[
                                    styles.center,
                                ]}
                            >
                                <Item
                                    floatingLabel
                                    style={[styles.textBoxPadding]}
                                    error={this.state.payload.login.error}
                                >
                                    <Label style={styles.textBoxStyle}>CPF/CNPJ</Label>
                                    <Input
                                        style={styles.textBoxStyle}
                                        keyboardType={"numeric"}
                                        textContentType='username'
                                        onChangeText={(text) => this.escreverLogin(text)}
                                        value={this.state.payload.login.masked}
                                    ></Input>
                                </Item>
                                <Item
                                    floatingLabel
                                    style={styles.textBoxPadding}
                                    error={this.state.payload.senha.error}
                                >
                                    <Label style={styles.textBoxStyle}>Senha</Label>
                                    <Input
                                        style={styles.textBoxStyle}
                                        textContentType='password'
                                        secureTextEntry={this.state.esconder}
                                        onChangeText={(text) => this.escreverSenha(text)}
                                        value={this.state.payload.senha.value}
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
                            <View
                                style={[{ backgroundColor: 'transparent' }]}
                            >
                                <ListItem noBorder onPress={() => this.setState({ lembrar: !this.state.lembrar })}>
                                    <CheckBox
                                        style={[{ borderRadius: 5, borderColor: '#FFFC' }]}
                                        checked={this.state.lembrar}
                                    />
                                    <Body>
                                        <Text style={styles.textBoxStyle}>Lembrar</Text>
                                    </Body>
                                </ListItem>
                            </View>
                            <View
                                style={[styles.center, { paddingHorizontal: "10%", paddingTop: "10%", backgroundColor: 'transparent' }]}
                            >
                                <Button style={[styles.button]} full rounded
                                    onPress={this.fazerLogin}
                                >
                                    <Text>Entrar</Text>
                                </Button>
                                <Button style={[styles.button]} full rounded
                                    onPress={() => this.props.navigation.navigate('Registro')}
                                >
                                    <Text style={styles.text}>Novo por aqui?</Text>
                                </Button>
                                <Button info transparent>
                                    <Text>Versão {expo.version}</Text>
                                </Button>
                            </View>
                        </Content>
                    </Row>
                </Grid>
            </Background>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.loginReducer.repos,
        validar: state.validarReducer.repos,
    };
};

const mapDispatchToProps = {
    LoginRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);