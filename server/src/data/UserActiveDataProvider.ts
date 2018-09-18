import {Page} from 'objection';
import {BaseDataProvider, IPaginationQuery} from '../data/BaseDataProvider';
import {IActiveDataProvider} from '../data/DataProviderInterface';
import User from '../models/User';

class UserActiveDataProvider extends BaseDataProvider implements IActiveDataProvider<User> {
    constructor(query: IPaginationQuery) {
        super(query);
    }

    public getModels = async (): Promise<User[]> => {
        let items: User[];
        let page: Page<User>;

        const pagination = this.getPagination();

        if (!pagination) {
            const itemsPromise: Promise<User[]> = User.query<User>();
            items = await itemsPromise;
            this.total = items.length;
        } else {
            const pagePromise: Promise<Page<User>> = User.query<User>().page(pagination.page, pagination.pageSize);
            page = await pagePromise;
            items = page.results;
            this.total = page.total;
        }

        return items;
    }
}

export {UserActiveDataProvider};
