export default class Email {
    validate(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    getMessage() {
        return 'E-mail inválido.';
    }
}