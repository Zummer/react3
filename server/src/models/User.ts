import {pick} from 'lodash';
import md5 from 'md5';
import {Model, Pojo} from 'objection';
import shortid from 'shortid';
import v4 from 'uuid/v4';

export interface IUser {
    id?: string;
    username: string;
    email: string;
}

class User extends Model implements IUser {
    static get tableName() {
        return 'users';
    }

    public static create(username: string, email: string, password?: string): User {
        const user = new User(username, email, password);
        user.setPassword(password ? password : v4());

        return user;
    }

    private static STATUS_WAIT = 0;
    private static STATUS_ACTIVE = 10;

    public id?: string;

    private status: number;
    private created_at: Date;
    private updated_at?: Date;
    private password_hash: string;
    private auth_key: string;

    constructor(public username: string, public email: string, password?: string) {
        super();
        this.status = User.STATUS_ACTIVE;
        this.auth_key = shortid.generate();
        this.password_hash = password ? md5(password) : v4();
        this.created_at = new Date();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'email'],

            properties: {
                id: {type: 'integer'},
                username: {type: 'string', minLength: 1, maxLength: 255},
                email: {type: 'string', format: 'email', minLength: 1, maxLength: 255},
                status: {type: 'integer'},
            },
        };
    }

    public isActive(): boolean {
        return this.status === User.STATUS_ACTIVE;
    }

    public edit(username: string, email: string): void {
        this.username = username;
        this.email = email;
        this.updated_at = new Date();
    }

    public $beforeInsert = () => {
        this.$validate({
            username: this.username,
            email: this.email,
        }, {});
    }

    public $beforeUpdate = () => {
        this.$validate({
            username: this.username,
            email: this.email,
        }, {});
    }

    public $formatJson(json) {
        json = super.$formatJson(json);
        return pick(json, ['email', 'username', 'created_at']);
    }

    private setPassword(password: string): void {
        this.password_hash = md5(password);
    }
}

export default User;
