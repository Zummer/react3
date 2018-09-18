import {IPaginationQuery} from '../data/BaseDataProvider';
import {UserActiveDataProvider} from '../data/UserActiveDataProvider';
import {IFormModel} from '../models/FormModel';
import {FormModel} from '../models/FormModel';

interface IAttributes extends IPaginationQuery {
    id?: string;
    date_from?: Date;
    date_to?: Date;
    username?: string;
    email?: string;
    status?: number;
}

interface IUserSearchFrom extends IAttributes, IFormModel<IAttributes> {
    search: (query: IAttributes) => UserActiveDataProvider;
}

class UserSearchFrom extends FormModel<IAttributes> implements IUserSearchFrom {
    public id?: string;
    public date_from?: Date;
    public date_to?: Date;
    public username?: string;
    public email?: string;
    public status?: number;

    protected schema = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
            date_from: {
                type: 'string',
                format: 'date-time',
            },
            date_to: {
                type: 'string',
                format: 'date-time',
            },
            username: {
                type: 'string',
            },
            email: {
                type: 'string',
            },
            status: {
                type: 'number',
            },
        },
    };

    public search = (query: IAttributes): UserActiveDataProvider => {
        const dataProvider = new UserActiveDataProvider(query);

        this.load(query);

        if (!this.validate()) {
            // query.where('0=1');
            return dataProvider;
        }

        return dataProvider;
    }
}

export {UserSearchFrom};
