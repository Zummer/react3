import {UserCreateForm} from '../forms/UserCreateForm';
import {UserEditForm} from '../forms/UserEditForm';
import User from '../models/User';
import {UserRepository} from '../repositories/UserRepository';

class UserManageService {
    constructor(private repository: UserRepository) {}

    public async create(form: UserCreateForm) {
        const {username, email, password} = form;
        const user = new User(username, email, password);

        return await this.repository.insert(user);
    }

    public async edit(id: string, form: UserEditForm): Promise<User> {
        if (id) {
            const user = await this.repository.get(id);
            user.edit(form.username, form.email);
            return await this.repository.patch(user);
        }

        throw new Error('The id is undefined.');
    }

    public async remove(id: string): Promise<number> {
        const user = await this.repository.get(id);
        return await this.repository.remove(user);
    }
}

export {UserManageService};
