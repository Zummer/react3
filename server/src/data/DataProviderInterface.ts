import {IBaseDataProviderInterface, IPagination} from '../data/BaseDataProvider';

export interface IActiveDataProvider<T> extends IBaseDataProviderInterface {
    getModels?: () => Promise<T[]>;
}

export interface IDataFromProvider<T> {
    items: T[];
    pagination: IPagination | false;
    total?: number;
}
