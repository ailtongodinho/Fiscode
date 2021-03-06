import React, { Component } from "react";

import { Formulario } from "../../../components/formulario";
import { comprasModel } from "../../../models/api/comprasModel";
import { Item, Input, Text, Title, Label, Icon, ListItem } from "native-base";
import { styles } from "../../../styles/layouts/layouts.styles";
import { SelecionarUF } from "../../../components/uf.ibge";
import { SelecionarMunicipio } from "../../../components/municipio.ibge";
import { SelecionarDistrito } from "../../../components/distrito.ibge";

//  Redux
import { connect } from "react-redux";
import { novoComprasRepos } from "../../../redux/reducers/compras/novo.comprasReducer";

class NovaCompra extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payload: new comprasModel()
        }
    }
    _reset = () => {
        this.setState({ payload: new comprasModel() });
    }
    _enviar = () => {
        this.props.novoComprasRepos(this.state.payload)
            .then(() => {
                if (this.props.sucesso) {
                    this._sair()
                }
            })
    }
    _sair = () => {
        this._reset();
        this.props.navigation.goBack();
    }
    render() {
        return (
            <Formulario
                tituloHeader={<></>}
                headerLeftIcon={<Icon name="close" style={{ color: "black" }} />}
                backgroundColor={"#FFF"}
                corpoBotao={<Text>Cadastrar!</Text>}
                botaoFooter={false}
                titulo={
                    <>
                        <Title style={{ color: "black" }}>Nova lista de Compras</Title>
                        <Text note>Complete os campos abaixo</Text>
                    </>
                }
                onCancel={() => this._sair()}
                onConfirm={() => this._enviar()}
            >
                <Item floatingLabel style={styles.textBoxPadding}>
                    <Label>Nome *</Label>
                    <Input
                        value={this.state.payload.nome}
                        onChangeText={(text) => this.setState({ payload: { ...this.state.payload, nome: text } })}
                    />
                </Item>
                <ListItem noBorder>
                    <SelecionarUF
                        selectedValue={this.state.payload.uf}
                        onSelected={(item) => this.setState({ payload: { ...this.state.payload, uf: item.sigla } })}
                    />
                </ListItem>
                <ListItem noBorder>
                    <SelecionarMunicipio
                        disabled={this.state.payload.uf == null}
                        // uf={this.state.payload.estado}
                        selectedValue={this.state.payload.municipio}
                        onSelected={(item) => this.setState({ payload: { ...this.state.payload, municipio: item.nome, idLocalidade: item.idLocalidade } })}
                    />
                </ListItem>
                <ListItem noBorder>
                    <SelecionarDistrito
                        disabled={this.state.payload.municipio == null}
                        // uf={this.state.payload.estado}
                        selectedValue={this.state.payload.distrito}
                        onSelected={(item) => this.setState({ payload: { ...this.state.payload, distrito: item.nome, idLocalidade: item.idLocalidade } })}
                    />
                </ListItem>
            </Formulario>
        )
    }
}

const mapStateToProps = state => {
    return {
        sucesso: state.novoComprasReducer.repos.sucesso
    };
};

const mapDispatchToProps = {
    novoComprasRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(NovaCompra);