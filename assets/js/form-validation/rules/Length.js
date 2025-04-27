export default class Length {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    validate(value) {
        return value.length >= this.min && value.length <= this.max;
    }

    getMessage() {
        return `O campo {field} deve ter entre ${this.min} e ${this.max} caracteres.`;
    }
}