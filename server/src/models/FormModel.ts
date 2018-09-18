import {Schema, ValidationError, Validator} from 'jsonschema';
import isEmpty from 'lodash/isEmpty';

interface IErrors {
    [key: string]: string | string[];
}

export interface IFormModel<T> {
    errors: IErrors;
    setAttributes: (values: T) => void;
    load: (data: T) => boolean;
}

export interface ISchema<T> extends Schema {
    properties: {[K in keyof T]: Schema};
    label?: string;
}

class FormModel<T> implements IFormModel<T> {
    public errors: IErrors = {} as IErrors;
    protected schema: ISchema<T> = {} as ISchema<T>;

    public setAttributes(data: T): void {
        const attributes = this.getAttrbutes();
        Object.keys(data).forEach((key: string) => {
            if (attributes.indexOf(key) !== -1) {
                this[key] = data[key];
            }
        });
    }

    public load(data: T): boolean {
        if (!isEmpty(data)) {
            this.setAttributes(data);
            return true;
        }

        this.errors = {
            ...this.errors,
            global: 'Не удалось загрузить форму. Нет данных.',
        };

        return false;
    }

    public validate(): boolean {
        const validator = new Validator();
        const errors = {};

        const result = validator.validate(this, this.schema);

        result.errors.forEach((validationError: ValidationError) => {
            const key = validationError.property.replace('instance.', '');
            errors[key] = validationError.schema[`${validationError.name}Label`] ||
                validationError.schema[`label`];
        });

        this.errors = errors;

        return isEmpty(errors);
    }

    private getAttrbutes(): string[] {
        return Object.keys(this.schema.properties).map((key: string) => key);
    }
}

export {FormModel};
