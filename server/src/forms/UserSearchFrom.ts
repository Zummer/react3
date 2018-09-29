import {QueryBuilder} from 'objection';
import {ActiveDataProvider} from '../data/ActiveDataProvider';
import {IQueryParams} from '../data/BaseDataProvider';
import {IFormModel} from '../models/FormModel';
import {FormModel} from '../models/FormModel';
import User from '../models/User';

export interface IAttributes {
    id?: string;
    date_from?: Date;
    date_to?: Date;
    username?: string;
    email?: string;
    status?: number;
}

interface IUserSearchFrom extends IAttributes, IFormModel<IAttributes> {
    search: (query: IQueryParams) => ActiveDataProvider<User>;
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

    public search = (queryParams: IAttributes & IQueryParams): ActiveDataProvider<User> => {
        const {id, username, email, status} = queryParams;

        const filter: IAttributes = {
            id,
            username: username ? `%${username}%` : undefined,
            email: email ? `%${email}%` : undefined,
            status,
        };

        const filterResults = (queryBuilder: QueryBuilder<User>) => {
            queryBuilder
                .andWhere('id', filter.id)
                .andWhere('status', filter.status)
                .andWhere('username', 'like', filter.username)
                .andWhere('email', 'like', filter.email);
        };

        const query: QueryBuilder<User> = User.query<User>().skipUndefined().modify(filterResults);
        const dataProvider = new ActiveDataProvider<User>(queryParams, query);

        this.load(queryParams);

        // if (!this.validate()) {
            // query.where('0=1');
            // return dataProvider;
        // }

        return dataProvider;
    }
}

export {UserSearchFrom};
