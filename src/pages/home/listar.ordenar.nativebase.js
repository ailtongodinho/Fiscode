import React, { Component } from "react";
import { Button, Icon, Text, List, ListItem, Left, Right, Body } from "native-base";
import { ModalView } from "../../components/modal";

//  Redux
import { connect } from "react-redux";

class ListarOrdenar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            // payload: this.props.payload,
            radio: null
        }
    }

    selectRadio = (radioKey) => {
        this.setState({ radio: radioKey });
    }
    submit = () => {
        this.props.setPayload(this.state.radio);
    }
    _montarLista = () => {
        var retorno = [];
        // console.log("_montarLista", this.props.ordenar);
        this.props.ordenar.forEach(item => {
            // console.log("_montarLista", item);

            // var value = listaEnum[item];
            retorno.push((
                <ListItem key={item.id + "_LISTITEM"}>
                    <Body key={item.id + "_BODY"}>
                        <Button key={item.id} iconRight transparent small onPress={() => this.selectRadio(item.id)}>
                            <Left>
                                <Text>{item.texto}</Text>
                            </Left>
                            <Right>
                                {item.id == this.state.radio ? <Icon name={"checkmark"} style={{ fontSize: 20 }} /> : null}
                                {/* <Radio key={item} selected={item == this.state.radio}/> */}
                            </Right>
                        </Button>
                    </Body>
                </ListItem>
            ))
        });

        return retorno;
    }
    close = () => {
        this.props.setShow();
    }
    render() {
        return (
            <ModalView
                key={"LISTAR_ORDENAR_NATIVEBASE"}
                show={this.props.show}
                title={"Listar Por"}
                center
                // icon={<Icon name='document' />}
                width={"90%"}
                height={"50%"}
                onConfirm={() => this.submit()}
                onCancel={this.close} 
            // showCancel
            >
                <List>
                    {this._montarLista()}
                </List>
            </ModalView>
        )
    }
}

const mapStateToProps = state => {
    return {
        ordenar: state.configuracoesReducer.repos?.picker?.ordernar ?? []
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ListarOrdenar);