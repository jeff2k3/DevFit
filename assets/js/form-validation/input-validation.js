export default class Validation {
    constructor(input) {
        this.input = input;
        this.className = 'help-block';
    }

    showInputError(message) {
        this.clearHelpBlock();

        this.input.classList.add('is-invalid');

        const errorDiv = document.createElement('div');
        errorDiv.className = this.className;
        errorDiv.textContent = message;

        this.input.insertAdjacentElement('afterend', errorDiv);

        this.input.setAttribute('aria-describedby', `${this.input.id}-error`);
        errorDiv.id = `${this.input.id}-error`;
        this.input.setAttribute('aria-invalid', 'true');
    }

    clearHelpBlock() {
        this.input.classList.remove('is-invalid');
            
        const errorDiv = this.input.nextElementSibling;

        if(errorDiv && errorDiv.classList.contains(this.className)) {
            errorDiv.remove();
        }
        this.input.removeAttribute('aria-describedby');
        this.input.removeAttribute('aria-invalid');
    }
}