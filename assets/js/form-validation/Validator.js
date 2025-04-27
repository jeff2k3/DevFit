import Required from "./rules/Required.js";
import Email from "./rules/Email.js";
import Length from "./rules/Length.js";
import Validation from "./input-validation.js";

export default class Validator {
    constructor() {
        this.fields = [];
    }

    addRules(element, config) {
        const rules = [];

        for(const [name, value] of Object.entries(config)) {
            if(value) {
                let rule;
                switch(name) {
                    case 'required':
                        rule = new Required();
                        break;

                    case 'length':
                        rule = new Length(value[0], value[1]);
                        break;

                    case 'email':
                        rule = new Email();
                        break;
                }

                if(rule) {
                    rules.push(rule);
                }
            }
        }

        this.fields.push({
            target: element,
            rules: rules
        });
    }

    validate() {
        let valid = true;

        for(const field of this.fields) {
            const element = field.target;
            const validation = new Validation(element);
            const value = element.value.trim();

            for(const rule of field.rules) {
                if(!rule.validate(value)) {
                    valid = false;
                    const message = rule.getMessage().replace('{field}', element.getAttribute('id'));
                    validation.showInputError(message);
                    break;
                }
            }
        }
        return valid;
    }

    clearAll() {
        this.fields.forEach(field => field.target.value = '');
    }
}