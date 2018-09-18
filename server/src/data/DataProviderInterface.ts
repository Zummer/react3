import {IBaseDataProviderInterface, IPagination} from '../data/BaseDataProvider';
import User from '../models/User';

export interface IActiveDataProvider<T> extends IBaseDataProviderInterface {
    getModels?: () => Promise<T[]>;
}

export interface IDataFromProvider {
    items: User[];
    pagination: IPagination | false;
    total?: number;
}
