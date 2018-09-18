import {FormModel, IFormModel} from '../models/FormModel';

interface IAttributes {
    username: string;
    email: string;
    password: string;
}

interface IUserCreateForm extends IAttributes, IFormModel<IAttributes> {}

class UserCreateForm extends FormModel<IAttributes> implements IUserCreateForm {
    public username: string;
    public email: string;
    public password: string;

    protected schema = {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                minLengthLabel: 'Oбязательное поле.',
                minLength: 1,
            },
            email: {
                type: 'string',
                format: 'email',
                formatLabel: 'Невалидный email.',
                minLengthLabel: 'Oбязательное поле.',
                minLength: 1,
            },
            password: {
                type: 'string',
            },
        },
    };

    constructor() {
        super();
        this.username = '';
        this.email = '';
        this.password = '';
    }
}

export {UserCreateForm};
