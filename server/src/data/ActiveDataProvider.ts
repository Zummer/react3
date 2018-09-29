import {Model, Page, QueryBuilder} from 'objection';
import {BaseDataProvider, IQueryParams} from '../data/BaseDataProvider';
import {IActiveDataProvider} from '../data/DataProviderInterface';

class ActiveDataProvider<T extends Model> extends BaseDataProvider implements IActiveDataProvider<T> {
    private _queryBuilder: QueryBuilder<T>;

    constructor(queryParams: IQueryParams, queryBuilder: QueryBuilder<T>) {
        super(queryParams);

        this._queryBuilder = queryBuilder;
    }

    public getModels = async (): Promise<T[]> => {
        let items: T[];

        const pagination = this.getPagination();
        const sort = this.getSort();

        const sortResults = (queryBuilder: QueryBuilder<T>) => {
            if (sort) {
                queryBuilder.orderBy(sort.columnName, sort.direction);
            }
        };

        if (!pagination) {
            items = await this._queryBuilder
                .modify(sortResults) as T[];
            this.total = items.length;
        } else {
            const page: Page<T> = await this._queryBuilder
                .modify(sortResults)
                .page(pagination.page - 1, pagination.pageSize) as Page<T>;
            items = page.results;
            this.total = page.total;
        }

        return items;
    }
}

export {ActiveDataProvider};
