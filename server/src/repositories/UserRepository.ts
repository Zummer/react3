import User, {IUser} from '../models/User';

class UserRepository {
    public async get(id: string): Promise<User> {
        return await this.getBy({id});
    }

    public async insert(user: IUser): Promise<User> {
        return await User.query<User>().insert(user);
    }

    public async patch(user: User): Promise<User> {
        if (user.id) {
            return await User.query<User>().patchAndFetchById(user.id, user);
        }

        throw new Error('The user.id is undefined.');
    }

    public async remove(user: IUser): Promise<number> {
        if (user.id) {
            return await User.query<User>().deleteById(user.id) as number;
        }

        throw new Error('The user.id is undefined.');
    }

    private async getBy(condition): Promise<User> {
        const user = await User.query<User>().where(condition).first();

        if (!user) {
            throw new Error('User not found.');
        }

        return user;
    }
}

export {UserRepository};
