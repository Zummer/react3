export interface IBaseDataProviderInterface {
    // prepare: (forcePrepare: boolean = false) => void;
    // getCount: () => number;
    // getKeys: () => any[];
    // getTotalCount: () => number;
    // getSort: () => ISort | false;
    getPagination: () => IPagination | false;
}

export interface IPagination {
    page: number;
    pageSize: number;
}

export interface IPaginationQuery {
    pageSize?: number;
    page?: number;
}

class BaseDataProvider implements IBaseDataProviderInterface {
    protected readonly _pagination: IPagination | false;
    private _total: number = -1;

    constructor(query: IPaginationQuery) {
        const page = Number(query.page) || 1;
        const pageSize = Number(query.pageSize);

        this._pagination = !!pageSize ? {
            pageSize,
            page,
        } : false;
    }

    public getPagination = (): IPagination | false => {
        return this._pagination;
    }

    public get total(): number {
        return this._total;
    }

    public set total(count: number) {
        this._total = count;
    }
}

export {BaseDataProvider};
