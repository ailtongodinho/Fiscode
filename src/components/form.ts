import React, { Component } from "react";
import { FormItemModel } from "../models/FormModel";

export class Form extends Component {
    constructor(form: [FormItemModel], props){
        super(props);
        this.state = {
            formulario: form
        }
    }

    createForm(){
        var list = [];
        this.state.formulario.map(item => {
            var html = item.
            list.push()
        })
    }
}