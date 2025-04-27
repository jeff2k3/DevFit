export default class Required {
    validate(value) {
        return value !== '';
    }

    getMessage() {
        return 'Campo {field} é obrigatório.';
    }
}