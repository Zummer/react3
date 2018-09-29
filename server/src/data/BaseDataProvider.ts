import {isEmpty} from 'lodash';

export interface IBaseDataProviderInterface {
    // prepare: (forcePrepare: boolean = false) => void;
    // getCount: () => number;
    // getKeys: () => any[];
    // getTotalCount: () => number;
    getSort: () => ISort | false;
    getPagination: () => IPagination | false;
}

export interface ISort {
    columnName: string;
    direction: string;
}

export interface ISortQuery {
    sort?: string;
}

export interface IPagination {
    page: number;
    pageSize: number;
}

export interface IPaginationQuery {
    pageSize?: string;
    page?: string;
}

export type IQueryParams = IPaginationQuery & ISortQuery;

class BaseDataProvider implements IBaseDataProviderInterface {
    protected readonly _pagination: IPagination | false;
    protected readonly _sort: ISort | false;
    private _total: number = -1;

    constructor(queryParams: IQueryParams) {
        const sortSplit: string[] | null = queryParams.sort ? queryParams.sort.split('.') : null;

        this._pagination = Number(queryParams.pageSize) ? {
            pageSize: Number(queryParams.pageSize),
            page: Number(queryParams.page) || 1, // page index is zero based
        } : false;

        this._sort = (sortSplit && !isEmpty(sortSplit)) ? {
            columnName: sortSplit[0],
            direction: sortSplit[1],
        } : false;
    }

    public getPagination = (): IPagination | false => {
        return this._pagination;
    }

    public getSort = (): ISort | false  => {
        return this._sort;
    }

    public get total(): number {
        return this._total;
    }

    public set total(count: number) {
        this._total = count;
    }
}

export {BaseDataProvider};
