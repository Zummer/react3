import {IFormModel} from '../models/FormModel';
import {FormModel} from '../models/FormModel';
import User from '../models/User';

interface IUserEditForm extends IAttributes, IFormModel<IAttributes> {}

interface IAttributes {
    username: string;
    email: string;
}

class UserEditForm extends FormModel<IAttributes> implements IUserEditForm {
    public username: string;
    public email: string;

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
        },
    };

    constructor(private _user: User) {
        super();
        this.username = _user.username;
        this.email = _user.email;
    }
}

export {UserEditForm};
