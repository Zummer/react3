import {NextFunction, Request, Response} from 'express';
import {IDataFromProvider} from '../data/DataProviderInterface';
import {UserActiveDataProvider} from '../data/UserActiveDataProvider';
import {UserCreateForm} from '../forms/UserCreateForm';
import {UserEditForm} from '../forms/UserEditForm';
import {UserSearchFrom} from '../forms/UserSearchFrom';
import User from '../models/User';
import {UserManageService} from '../services/UserManageService';

class UserController {
    constructor(private userManageService: UserManageService) {
    }

    public actionIndex = async (req: Request, res: Response, next: NextFunction) => {
        const searchModel = new UserSearchFrom();

        try {
            const dataProvider: UserActiveDataProvider = searchModel.search(req.query);
            const data: IDataFromProvider = {
                items: await dataProvider.getModels(),
                pagination: dataProvider.getPagination(),
                total: dataProvider.total,
            };

            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    public actionCreate = async (req: Request, res: Response, next) => {
        const form = new UserCreateForm();
        if (form.load(req.body) && form.validate()) {
            try {
                const user = await this.userManageService.create(form);
                res.json(user);
            } catch (e) {
                if (e.code === 'ER_DUP_ENTRY') {
                    res.status(401).json({error: 'This username is already taken'});
                } else {
                    next(e);
                }
            }
        } else {
            res.status(500).json(form.errors);
        }
    }

    public actionView = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: User = await this.findModel(req.params.id);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public actionUpdate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: User = await this.findModel(req.params.id);
            const form = new UserEditForm(user);
            if (form.load(req.body) && form.validate()) {
                try {
                    const result = user.id && await this.userManageService.edit(user.id, form);
                    res.json(result);
                } catch (e) {
                    if (e.code === 'ER_DUP_ENTRY') {
                        res.status(401).json({error: 'This username is already taken'});
                    } else {
                        next(e);
                    }
                }
            } else {
                res.status(500).json(form.errors);
            }
        } catch (e) {
            next(e);
        }
    }

    public actionDelete = async (req: Request, res: Response, next) => {
        try {
            const count = await this.userManageService.remove(req.params.id);
            res.json({
                dropped: count === 1,
            });
        } catch (e) {
            return next(e);
        }
    }

    protected findModel = async (id: string): Promise<User> => {
        const model: User | undefined = await User.query<User>().findById(id);

        if (model !== null && model !== undefined) {
            return model;
        }

        throw new Error('The requested user does not exist.');
    }
}

export {UserController};
