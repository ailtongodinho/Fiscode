export class FormItemModel {
    label: string;
    icon: formItemIcon;
    textInputMask: textInputMaskOptions;
    validate: Function;
}

class textInputMaskOptions {
    type: string
}

class formItemIcon {
    position: IconPosition;
    name: string;
}

type IconPosition = 
    | 'Esquerda'
    | 'Direita'