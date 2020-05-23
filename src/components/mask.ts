import { MaskService, TextInputMaskOptionProp } from 'react-native-masked-text'

export function maskCpfCnpj(text: string, options: TextInputMaskOptionProp) {
    var type = 'cnpj'
    var raw = MaskService.toRawValue(type, text, options)
    type = raw.length > 11 ? 'cnpj' : 'cpf'
    var masked = MaskService.toMask(type, text, options);
    return {
        masked,
        raw,
        isValid: MaskService.isValid(type, masked, options)
    }
}

export function money(text: string, options: TextInputMaskOptionProp) {
    var type = 'money'
    text = Number(text).toFixed(2).toString();
    var raw = MaskService.toRawValue(type, text, options)
    var masked = MaskService.toMask(type, text, options);
    return {
        masked,
        raw,
        isValid: MaskService.isValid(type, masked, options)
    }
}
export function date(text: string, options: TextInputMaskOptionProp) {
    var type = 'datetime'
    var raw = MaskService.toRawValue(type, text, options)
    var masked = MaskService.toMask(type, text, options);
    return {
        masked,
        raw,
        isValid: MaskService.isValid(type, masked, options)
    }
}