import React, { Component } from "react";
import { View } from "react-native";
import { Item, Input, Label, Title, Text, Icon, H1, H3, ListItem, Left, Right, Body, Col } from "native-base";
import { Row, Grid } from 'react-native-easy-grid';
import { styles } from "../../styles/layouts/layouts.styles";

//  Redux
import { connect } from "react-redux";
import { ConfirmarSenhaRepos, ConfirmarSenhaReset } from "../../redux/reducers/confirmarSenhaReducer";

//  Components
import { Formulario } from "../../components/formulario";

class ConfirmarSenha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: JSON.parse(JSON.stringify(this.props.route.params)),
            payload: [
                {
                    id: 0,
                    mostrar: true,
                    value: "",
                    error: true
                },
                {
                    id: 1,
                    mostrar: true,
                    value: "",
                    error: true
                },
            ]
        }
    }
    validate = (item) => {
        item.error = true;
        if (this.state.payload[0].value === item.value) {
            item.error = false;
        }
        return item;
    }
    showPass = (item) => {
        item.mostrar = !item.mostrar;
        return item;
    }
    changeValue = (item, obj) => {
        item.value = obj.value;
        return item;
    }
    onUpdateItem = (id, func, obj) => {
        this.setState(state => {
            const list = state.payload.map((item, j) => {
                if (item.id == id) {
                    return func(item, obj);
                } else {
                    return item;
                }
            });
            return {
                list,
            };
        });
    }
    enviar = () => {
        var newPayload = {
            // login: this.state.usuario.registroNacional,
            login: this.state.usuario.email,
            senha: this.state.payload[0].value
        }

        console.log("Enviar", newPayload);

        if (!this.state.payload[1].error) this.props.ConfirmarSenhaRepos(newPayload)
    }
    componentDidMount() {
        this.onUpdateItem(this.state.payload[1].id, this.validate)
    }
    render() {

        console.log("AQUI", this.props.senhaConfirmada);

        //  Volta
        if (this.props.senhaConfirmada) {
            this.props.ConfirmarSenhaReset();
            this.props.navigation.pop();
        }
        return (
            // <Background>
            //     <Grid>
            //         <Row
            //             size={25}
            //             style={[
            //                 styles.center,
            //                 // {backgroundColor: 'black'}
            //             ]}
            //         >
            //             <Logo
            //                 width={100}
            //                 height={100}
            //                 hasText={false}
            //             />
            //         </Row>
            //         <Row
            //             size={10}
            //         // style={{backgroundColor: 'blue'}}
            //         >
            //             <Content>
            //                 <View
            //                     style={[
            //                         styles.center,
            //                     ]}
            //                 >
            //                     <H1 style={styles.font1}>Olá {this.state.usuario.nome.value}!</H1>
            //                     <H3 style={styles.font1}>Digite sua nova senha</H3>
            //                 </View>
            //             </Content>
            //         </Row>
            //         <Row
            //             size={20}
            //         // style={{ backgroundColor: '#FFF' }}
            //         >
            //             <Content>
            //                 <Form
            //                     style={[
            //                         styles.form,
            //                         styles.center
            //                     ]}
            //                 >
            //                     <Item floatingLabel style={styles.textBoxPadding}>
            //                         <Label style={styles.textBoxStyle}>Nova Senha</Label>
            //                         <Input
            //                             style={styles.textBoxStyle}
            //                             textContentType='password'
            //                             secureTextEntry={this.state.payload[0].mostrar}
            //                             onChangeText={(text) => {
            //                                 this.onUpdateItem(this.state.payload[0].id, this.changeValue, { value: text })
            //                                 this.onUpdateItem(this.state.payload[1].id, this.validate)
            //                             }}
            //                             value={this.state.payload[0].value}
            //                         ></Input>
            //                         <Icon
            //                             onPress={() => this.onUpdateItem(this.state.payload[0].id, this.showPass)}
            //                             name={(this.state.payload[0].mostrar ? "eye" : "eye-off")}
            //                             style={{ color: 'white' }}
            //                         />
            //                     </Item>
            //                     <Item error={this.state.payload[1].error} floatingLabel style={styles.textBoxPadding}>
            //                         <Label style={styles.textBoxStyle}>Confirmar Senha</Label>
            //                         <Input
            //                             style={styles.textBoxStyle}
            //                             textContentType='password'
            //                             secureTextEntry={this.state.payload[1].mostrar}
            //                             onChangeText={(text) => {
            //                                 this.onUpdateItem(this.state.payload[1].id, this.changeValue, { value: text })
            //                                 this.onUpdateItem(this.state.payload[1].id, this.validate)
            //                             }}
            //                             value={this.state.payload[1].value}
            //                         ></Input>
            //                         <Icon
            //                             onPress={() => this.showPass(this.state.payload[1].id)}
            //                             name={(this.state.payload[1].error ? "ios-close" : "ios-checkmark")}
            //                             style={{ color: this.state.payload[1].error ? "red" : "green", padding: 2 }}
            //                         />
            //                         <Icon
            //                             onPress={() => this.onUpdateItem(this.state.payload[1].id, this.showPass)}
            //                             name={(this.state.payload[1].mostrar ? "eye" : "eye-off")}
            //                             style={{ color: 'white' }}
            //                         />
            //                     </Item>
            //                 </Form>
            //             </Content>
            //         </Row>
            //         <Row
            //             size={20}
            //             style={[
            //                 styles.form,
            //                 styles.center
            //             ]}
            //         >
            //             <View
            //                 style={[styles.center, styles.full]}
            //             >
            //                 <Button style={[styles.button]} block rounded
            //                     onPress={() => this.enviar()}
            //                 >
            //                     <Text>Confirmar</Text>
            //                 </Button>
            //             </View>
            //         </Row>
            //     </Grid>
            // </Background>
            <Formulario
                logoComTexto={false}
                corpoBotao={<Text>Confirmar</Text>}
                // botaoFooter={false}
                titulo={
                    <>
                        <H1 style={styles.font1}>Olá {this.state.usuario.nome.value}!</H1>
                        <H3 style={styles.font1}>Digite sua nova senha</H3>
                    </>}
                onConfirm={() => this.enviar()}
            >
                <Item floatingLabel style={styles.textBoxPadding}>
                    <Label style={styles.textBoxStyle}>Nova Senha</Label>
                    <Input
                        style={styles.textBoxStyle}
                        textContentType='password'
                        secureTextEntry={this.state.payload[0].mostrar}
                        onChangeText={(text) => {
                            this.onUpdateItem(this.state.payload[0].id, this.changeValue, { value: text })
                            this.onUpdateItem(this.state.payload[1].id, this.validate)
                        }}
                        value={this.state.payload[0].value}
                    ></Input>
                    <Icon
                        onPress={() => this.onUpdateItem(this.state.payload[0].id, this.showPass)}
                        name={(this.state.payload[0].mostrar ? "eye" : "eye-off")}
                        style={{ color: 'white' }}
                    />
                </Item>
                <Item error={this.state.payload[1].error} floatingLabel style={styles.textBoxPadding}>
                    <Label style={styles.textBoxStyle}>Confirmar Senha</Label>
                    <Input
                        style={styles.textBoxStyle}
                        textContentType='password'
                        secureTextEntry={this.state.payload[1].mostrar}
                        onChangeText={(text) => {
                            this.onUpdateItem(this.state.payload[1].id, this.changeValue, { value: text })
                            this.onUpdateItem(this.state.payload[1].id, this.validate)
                        }}
                        value={this.state.payload[1].value}
                    ></Input>
                    <Icon
                        onPress={() => this.showPass(this.state.payload[1].id)}
                        name={(this.state.payload[1].error ? "ios-close" : "ios-checkmark")}
                        style={{ color: this.state.payload[1].error ? "red" : "green", padding: 2 }}
                    />
                    <Icon
                        onPress={() => this.onUpdateItem(this.state.payload[1].id, this.showPass)}
                        name={(this.state.payload[1].mostrar ? "eye" : "eye-off")}
                        style={{ color: 'white' }}
                    />
                </Item>
            </Formulario>
        )
    }
}

const mapStateToProps = state => {
    return {
        senhaConfirmada: state.ConfirmarSenhaReducer.repos.sucesso,
    };
};

const mapDispatchToProps = {
    ConfirmarSenhaRepos,
    ConfirmarSenhaReset
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmarSenha);